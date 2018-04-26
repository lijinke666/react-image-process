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
  static PropTypes = {
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
  //base64
  base64Handler = src => {
    return this.createImageNode(src).then(({ cover, ext }) => {
      this.ctx.drawImage(cover, 0, 0, cover.width, cover.height);
      return this.canvas.toDataURL(`image/${ext}`);
    });
  };
  /**
   * 裁剪图片
   * @param {object} Options
   * @param {String} cover 图片 必选
   * @param {Number} scale 缩放比例  非必选 默认 1.0 不缩放
   * @param {Array} coordinate 裁剪坐标  必选  [[x1,y1],[x2,y2]]
   * @return 裁剪后的图片节点
   */
  clipHandler = src => {
    console.log(1);
    const { scale, coordinate } = this.props;

    const [x1, y1] = coordinate[0];
    const [x2, y2] = coordinate[1];

    const clipWidth = Math.abs(x2 - x1);
    const clipHeight = Math.abs(y2 - y1);

    this.createImageNode(src, clipWidth, clipHeight).then(({ cover, ext }) => {
      this.ctx.drawImage(
        cover,
        x1 / scale,
        y1 / scale,
        clipWidth / scale,
        clipHeight / scale,
        0,
        0,
        clipWidth,
        clipHeight
      );
      return this.canvas.toDataURL(`image/${ext}`);
    });
  };
  baseHandler = mode => {
    try {
      const { src } = this.props.children.props;
      this[`${mode}Handler`](src).then(url => {
        this.currentImgNode.src = url;
      });
    } catch (error) {
      console.error(`[${mode}Handler]:`, error.message);
    }
  };
  //图片处理
  imageHandle = mode => {
    this.baseHandler(this._MODE_[mode]);
  };
  getCoverExt = cover => {
    if (!Object.is(typeof cover, "string"))
      throw new Error('cover it must be "string"');
    return cover.replace(/.*\.(jpg|jpeg|png|gif)/, "$1");
  };
  setCanvasWidth = (width, height) => {
    this.canvas.width = width;
    this.canvas.height = height;
  };

  createImageNode = (cover, canvasWidth, canvasHeight) => {
    const coverType = typeof cover;
    const ext = this.getCoverExt(cover);
    return new Promise((res, rej) => {
      if (Object.is(coverType, "object")) {
        this.setCanvasWidth(canvasWidth, canvasHeight);
        res({ cover, ext });
      } else if (Object.is(coverType, "string")) {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = cover;
        img.onload = () => {
          this.setCanvasWidth(
            canvasWidth || img.width,
            canvasHeight || img.height
          );
          res({ cover: img, ext });
        };
        img.onerror = e => {
          rej(e.message);
        };
      } else {
        throw new Error("The cover options is not a String or Object\n");
      }
    });
  };
  componentWillMount() {}
  componentWillUnmount() {
    this.canvas = this.ctx = this.currentImgNode = this.node = undefined;
  }
  componentWillReceiveProps(prevProps, nextProps) {
    console.log(prevProps);
  }
  componentDidMount() {
    const { mode, children } = this.props;
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.currentImgNode = this.node.querySelector("img");
    this.imageHandle(mode);
  }
  componentDidCatch(error, info) {
    console.error("error", error, info);
  }
}
