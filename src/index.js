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
  base64Handler = async (...options) => {
    return await this.photoMagician.toBase64Url({ ...options });
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
  clipHandler = async (...options) => {
    return await this.photoMagician.clipImage({ ...options });
  };
  baseHandler = async mode => {
    try {
      const { src } = this.props.children.props;
      const url = await this[`${mode}Handler`](src);
      this.currentImgNode.src = url;
    } catch (error) {
      console.error(`[${mode}Handler-error]:`, error.message);
    }
  };
  //图片处理
  imageHandle = async mode => {
    await this.baseHandler(this._MODE_[mode]);
  };
  componentWillMount() {}
  componentWillUnmount() {
    this.photoMagician = undefined;
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    return null;
  }
  componentDidMount() {
    const { mode, children } = this.props;
    this.currentImgNode = this.node.querySelector("img");
    this.photoMagician = new photoMagician();
    this.imageHandle(mode);
  }
  componentDidCatch(error, info) {
    console.error("error", error, info);
  }
}
