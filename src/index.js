/**
 * @name react-image-process
 * @version 0.2.0
 */

import React, { PureComponent } from 'react';
import PhotoMagician from 'photo-magician';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export const MODE_TYPE = {
  base64: 'base64',
  clip: 'clip',
  compress: 'compress',
  rotate: 'rotate',
  waterMark: 'waterMark',
  filter: 'filter',
  primaryColor: 'primaryColor'
};

export const WATER_MARK_TYPE = {
  image: 'image',
  text: 'text'
};

export const FILTER_TYPE = {
  vintage: 'vintage',
  blackWhite: 'blackWhite',
  relief: 'relief',
  blur: 'blur'
};

export const OUTPUT_TYPE = {
  blob: 'blob',
  dataUrl: 'dataUrl'
};

const MODE = Object.values(MODE_TYPE);
const WATER_MARK = Object.values(WATER_MARK_TYPE);
const FILTER = Object.values(FILTER_TYPE);
const OUTPUT = Object.values(OUTPUT_TYPE);

const mainPrefix = 'react-image-process';

export default class ReactImageProcess extends PureComponent {
  constructor(props) {
    super(props);
  }
  static defaultProps = {
    mode: MODE_TYPE['base64'],
    waterMarkType: WATER_MARK_TYPE['text'],
    filterType: FILTER_TYPE['vintage'],
    outputType: OUTPUT_TYPE['dataUrl'],
    waterMark: mainPrefix,
    rotate: 0,
    quality: 1.0,
    coordinate: [0, 0],
    width: 50,
    height: 50,
    opacity: 0.5,
    fontColor: 'rgba(255,255,255,.5)',
    fontSize: 20,
    fontBold: true,
    onComplete: () => {}
  };
  static propTypes = {
    mode: PropTypes.oneOf(MODE),
    waterMarkType: PropTypes.oneOf(WATER_MARK),
    filterType: PropTypes.oneOf(FILTER),
    outputType: PropTypes.oneOf(OUTPUT),
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
  base64Handler = async (cover, params) => {
    return await this.photoMagician.toBase64Url({ cover, ...params });
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
  compressHandler = async (cover, params) => {
    return await this.photoMagician.compressImage({ cover, ...params });
  };
  /**
   * @description Rotate the image
   * @param {String | Object} cover 图片地址或节点
   * @param {Number} rotate 旋转比例 (0 -360 ) °
   */
  rotateHandler = async (cover, params) => {
    return await this.photoMagician.rotateImage({ cover, ...params });
  };
  /**
   * @param {Object} options
   * @param {String | Object} options.cover
   * @param {String} options.mode  filter name  "vintage" | "blackWhite" | "relief" | "blur"
   */
  filterHandler = async (cover, { filterType, ...params }) => {
    return await this.photoMagician.addImageFilter({
      cover,
      ...params,
      mode: filterType
    });
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
        if (mode !== MODE_TYPE['primaryColor']) {
          if (params.outputType === OUTPUT_TYPE.dataUrl) {
            return (this.currentImgNodes[i].src = data);
          }
          this.currentImgNodes[i].src = URL.createObjectURL(data);
          this.currentImgNodes[i].onload = () => {
            URL.revokeObjectURL(data);
          };
        }
        if (onComplete && onComplete instanceof Function) {
          onComplete(data);
        }
      }
    } catch (err) {
      /*eslint-disable no-console */
      console.error(`[${mode}Handler-error]:`, err);
    }
  };
  //图片处理
  imageHandle = async ({ mode, ...options }) => {
    await this.baseHandler(MODE_TYPE[mode], options);
  };
  componentWillUnmount() {
    this.photoMagician = undefined;
    this.currentImgNodes = undefined;
    this.node = undefined;
  }
  componentDidMount() {
    this.currentImgNodes = this.node.querySelectorAll('img');
    this.photoMagician = new PhotoMagician();
    this.imageHandle(this.props);
  }
}
