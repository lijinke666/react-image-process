/**
 * @name react-image-magician
 * @version 0.1.0
 */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import photoMagician from "photo-magician";
import { createModeName } from "./decorator";

export const MODE = ["base64", "clip"];

const mainPrefix = "react-image-magician";

@createModeName(MODE)
export default class ReactImageMagician extends PureComponent {
  state = {
    compressImageSrc: "" //处理后的图片
  };
  constructor(props) {
    super(props);
  }
  static defaultProps = {
    mode: MODE[0]
  };
  static propTypes = {
    mode: PropTypes.oneOf(MODE)
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
   * @name toBase64Url
   * @description get base64 data of the image
   * @param {Object} options
   * @param {String | Object} options.cover cover url | image element node   The next cover parameter is the same as this.
   * @return base64 data
   */
  base64Handler = async (cover) => {
    return await this.photoMagician.toBase64Url({ cover });
  };

  /**
   * @name clipImage()
   * @description cut clip of the image
   * @param {object} Options
   * @param {String | Object} options.cover
   * @param {Number} options.scale Image zooming   default '1.0'
   * @param {Array} options.coordinate [[x1,y1],[x2,y2]]
   * @return image node
   */
  clipHandler = async (cover,params) => {
    console.log(cover,params);
    return await this.photoMagician.clipImage({cover,...params });
  };
  baseHandler = async (mode,options) => {
    try {
      const {children,...params} = options
      const images = Array.isArray(children)
        ? [...options.children]
        : [options.children];

      for (let [
        i,
        {
          props: { src }
        }
      ] of images.entries()) {
        const url = await this[`${mode}Handler`](src,params);
        this.currentImgNodes[i].src = url;
      }
    } catch (err) {
      console.error(`[${mode}Handler-error]:`, err);
    }
  };
  //图片处理
  imageHandle = async ({mode,...options}) => {
    await this.baseHandler(this._MODE_[mode],options);
  };
  componentWillMount() {}
  componentWillUnmount() {
    this.photoMagician = undefined;
  }
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   return null;
  // }
  componentDidMount() {
    this.currentImgNodes = this.node.querySelectorAll("img");
    this.photoMagician = new photoMagician();
    this.imageHandle(this.props);
  }
  componentDidCatch(error, info) {
    console.error("error", error, info);
  }
}
