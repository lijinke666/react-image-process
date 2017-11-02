
/**
 * @version 0.1.0
 */

import React, { PureComponent } from "react"
import PropTypes from "prop-types"

export const MODE = {
  base64: {
    key: "base64",
    desc: "base64"
  },
  clip: {
    key: "clip",
    desc: "裁剪"
  }
}
const mainPrefix = 'react-image-magician'
export default class ReactImageMagician extends PureComponent {
  state = {
    compressImageSrc: ""                    //处理后的图片
  }
  static defaultProps = {
    mode: MODE['base64']['key']
  }
  static PropTypes = {
    mode: PropTypes.oneOf(Object.values(MODE).map(({ key }) => key))
  }
  render() {
    const {
      mode,
      children
    } = this.props

    const _className = `${mainPrefix}-${mode}`

    return (
      <div className={_className} key={_className}>{children}</div>
    )
  }
  //base64
  base64Handle = async () => {
    console.log(1);
    const { src } = this.props.children.props
    const { cover, ext } = await this.createImageNode(src)
    this.ctx.drawImage(img, 0, 0, img.width, img.height)
    const base64URL = this.canvas.toDataURL(`image/${ext}`)
    console.log(base64URL)

  }
  //图片处理
  imageHandle = async (mode) => {
    switch (mode) {
      case MODE['base64']['key']: await this.base64Handle()
        break
      case MODE['clip']['key']: await this.clipHandle()
        break
      default: await this.base64Handle()
        break
    }
  }
  getCoverExt = (cover) => {
    if (!Object.is(typeof (cover), 'string')) throw new Error('cover it must be "string"')
    return cover.replace(/.*\.(jpg|jpeg|png|gif)/, "$1")
  }
  setCanvasWidth = (width, height) => {
    this.canvas.width = width
    this.canvas.height = height
  }

  createImageNode = (cover, canvasWidth, canvasHeight) => {
    return new Promise((res, rej) => {
      const coverType = typeof (cover)
      const ext = this.getCoverExt(cover)
      if (Object.is(coverType, 'object')) {
        this.setCanvasWidth(canvasWidth, canvasHeight)
        res({ cover, ext })
      } else if (Object.is(coverType, 'string')) {
        const img = new Image()
        img.src = cover
        img.onload = () => {
          this.setCanvasWidth(canvasWidth || img.width, canvasHeight || img.height)
          res({ cover: img, ext })
        }
        img.onerror = (e) => rej(e)
      } else {
        rej('The cover options is not a String of Object\n')
      }
    })
  }
  componentWillMount() {

  }
  componentWillReceiveProps(prevProps, nextProps) {
    console.log(prevProps)
  }
  componentDidMount() {
    const { mode } = this.props
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')
    this.imageHandle(mode)
  }
  componentDidCatch(error, info) {
    console.error('error', error, info)
  }
}
