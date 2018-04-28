/**
 * @name react-image-magician
 * @version 0.1.0
 */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { hot } from "react-hot-loader";
import photoMagician from "photo-magician";
import { name } from "../package.json";

const MODE_NAME = {
  base64: "base64",
  clip: "clip",
  compress: "compress",
  rotate: "rotate",
  waterMark: "waterMark",
  filter: "filter",
  primaryColor: "primaryColor"
};
const WATER_MARK_TYPE_NAME = {
  image: "image",
  text: "text"
};
const FILTER_TYPE_NAME = {
  vintage: "vintage",
  blackWhite: "blackWhite",
  relief: "relief",
  blur: "blur"
};

const MODE = Object.values(MODE_NAME);
const WATER_MARK_TYPE = Object.values(WATER_MARK_TYPE_NAME);
const FILTER_TYPE = Object.values(FILTER_TYPE_NAME);

const mainPrefix = "react-image-process";

class ReactImageProcess extends PureComponent {
  constructor(props) {
    super(props);
  }
  static defaultProps = {
    mode: MODE_NAME["base64"],
    waterMarkType: WATER_MARK_TYPE_NAME["text"],
    FILTER_TYPE: FILTER_TYPE_NAME["vintage"],
    waterMark: name,
    rotate: 0,
    quality: 0.92,
    coordinate: [0, 0],
    width: 50,
    height: 50,
    opacity: 0.5,
    fontColor: "rgba(255,255,255,.5)",
    fontSize: 20,
    fontBold: true,
    onComplete: () => {}
  };
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
    mode: PropTypes.oneOf(MODE),
    waterMarkType: PropTypes.oneOf(WATER_MARK_TYPE),
    filterType: PropTypes.oneOf(FILTER_TYPE),
    waterMark: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.node
    ]),
    scale: PropTypes.number,
    rotate: PropTypes.number,
    quality: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    fontColor: PropTypes.string,
    fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    fontBold: PropTypes.bool,
    coordinate: PropTypes.array,
    onComplete: PropTypes.func
  };
  render() {
    const { mode, children, style, className } = this.props;

    const _className = `${mainPrefix}-${mode}`;

    return (
      <span
        className={classnames(className, _className)}
        key={_className}
        ref={node => (this.node = node)}
        {...style}
      >
        {children}
      </span>
    );
  }
  /**
   * @description get base64 data of the image
   * @param {Object} options
   * @param {String | Object} options.cover cover url | image element node   The next cover parameter is the same as this.
   * @return base64 data
   */
  base64Handler = async cover => {
    return await this.photoMagician.toBase64Url({ cover });
  };

  /**
   * @description cut clip of the image
   * @param {object} Options
   * @param {String | Object} options.cover
   * @param {Number} options.scale Image zooming   default '1.0'
   * @param {Array} options.coordinate [[x1,y1],[x2,y2]]
   * @return image node
   */
  clipHandler = async (cover, params) => {
    return await this.photoMagician.clipImage({ cover, ...params });
  };
  /**
   * @description compress of the image
   * @param {Object} options
   * @param {String | Object} options.cover
   * @param {Number}  options.quality range(0-1) default '0.92'
   * @return base64 data
   */
  compressHandler = async (cover, { quality }) => {
    return await this.photoMagician.compressImage({ cover, quality });
  };
  /**
   * @description Rotate the image
   * @param {String | Object} cover 图片地址或节点
   * @param {Number} rotate 旋转比例 (0 -360 ) °
   */
  rotateHandler = async (cover, { rotate }) => {
    return await this.photoMagician.rotateImage({ cover, rotate });
  };
  /**
   * @param {Object} options
   * @param {String | Object} options.cover
   * @param {String} options.mode  filter name  "vintage" | "blackWhite" | "relief" | "blur"
   */
  filterHandler = async (cover, { filterType }) => {
    return await this.photoMagician.addImageFilter({ cover, mode: filterType });
  };
  waterMarkHandler = async (cover, { waterMarkType, ...params }) => {
    return await this.photoMagician.addWaterMark({
      cover,
      ...params,
      mode: waterMarkType
    });
  };
  /**
   * @description get primary color of the image
   * @param {Object} options
   * @param {String | Object} options.cover
   * @return primaryColor
   */
  primaryColorHandler = async cover => {
    return await this.photoMagician.getPrimaryColor({ cover });
  };
  baseHandler = async (mode, options) => {
    try {
      const { onComplete } = this.props;
      const { children, ...params } = options;
      const images = Array.isArray(children)
        ? [...options.children]
        : [options.children];

      for (let [
        i,
        {
          props: { src }
        }
      ] of images.entries()) {
        if (!src) continue;
        const data = await this[`${mode}Handler`](src, params);
        if (mode !== MODE_NAME["primaryColor"]) {
          this.currentImgNodes[i].src = data;
        }
        onComplete && onComplete instanceof Function && onComplete(data);
      }
    } catch (err) {
      console.error(`[${mode}Handler-error]:`, err);
    }
  };
  //图片处理
  imageHandle = async ({ mode, ...options }) => {
    await this.baseHandler(MODE_NAME[mode], options);
  };
  componentWillUnmount() {
    this.photoMagician = undefined;
    this.currentImgNodes = undefined;
  }
  componentDidMount() {
    this.currentImgNodes = this.node.querySelectorAll("img");
    this.photoMagician = new photoMagician();
    this.imageHandle(this.props);
  }
}

export default hot(module)(ReactImageProcess);
