# react-image-process

[![npm](https://img.shields.io/npm/dm/react-image-process.svg?style=flat-square)](https://www.npmjs.com/package/react-image-process)
[![npm version](https://img.shields.io/npm/v/react-image-process.svg?style=flat-square)](https://badge.fury.io/js/react-image-process)
[![jest](https://facebook.github.io/jest/img/jest-badge.svg)](https://github.com/facebook/jest)

> :art: A image process component for react, like compressed image,clip image, add watermarking of image

[normal version](https://github.com/lijinke666/photo-magician)

## Installation

using `yarn` :

```
yarn add react-image-process
```

using `npm` :

```
npm install react-image-process --save
```

## Screenshots

![lightTheme](https://github.com/lijinke666/react-image-process/blob/master/assetsImg/screenshot.png)

## Example

online example : [https://lijinke666.github.io/react-image-process/](https://lijinke666.github.io/react-image-process/)

[Source Code](https://github.com/lijinke666/react-image-process/blob/master/example/example.js)

## Usage

```jsx
import React from "react";
import ReactDOM from "react-dom";
import ReactImageProcess from "react-image-process";

const onComplete = data => {
  console.log("data:", data);
};

ReactDOM.render(
  <ReactImageProcess mode="base64" onComplete={onComplete}>
    <img src="YOUR_IMG_URL" />
  </ReactImageProcess>,
  document.getElementById("root")
);
```

Support multiple Images

```jsx
<ReactImageProcess mode="compress" quality={0.2} onComplete={onComplete}>
  <img src="YOUR_IMG_URL" alt="compress" className="example-img" />
  <img src="YOUR_IMG_URL" alt="compress" className="example-img" />
</ReactImageProcess>
```

## API

| Property      | Description                                                                                                                      | Type                   | Default                |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ---------------------- |
| mode          | can be set to `base64` `clip` `compress` `rotate` `waterMark` `filter` `primaryColor`                                            | `string`               | `base64`               |
| onComplete    | The callback after trans complete conversion                                                                                     | function(base64Data){} | `-`                    |
| scale         | When the mode is equal to 'clip', the zoom scale of the image.                                                                   | `number`               | `1.0`                  |
| coordinate    | When the mode is equal to 'clip', coordinate of the image. like `[[x1,y1],[x2,y2]]`, if mode equal to `waterMark` like `[x1,y1]` | `number[]`             | `-`                    |
| quality       | When the mode is equal to 'compress', quality of the image.                                                                      | `number`               | `0.92`                 |
| rotate        | When the mode is equal to 'rotate', rotate deg of the image.                                                                     | `number`               | `-`                    |
| waterMark     | When the mode is equal to 'waterMark', can be set to `image` or `text`                                                           | `string|ReactNode`     | `-`                    |
| waterMarkType | When the mode is equal to 'waterMark', can be set to `image` or `text`                                                           | `string`               | `text`                 |
| fontBold      | When the mode is equal to 'waterMark' and waterMark equal to `text` ,the font is bold.                                           | `boolean`              | `false`                |
| fontSize      | When the mode is equal to 'waterMark' and waterMark equal to `text` ,the font size                                               | `number`               | `20`                   |
| fontColor     | When the mode is equal to 'waterMark' and waterMark equal to `text` ,the font color                                              | `string`               | `rgba(255,255,255,.5)` |
| width         | When the mode is equal to 'waterMark' and waterMark equal to `image` ,the water width                                            | `number`               | `50`                   |
| height        | When the mode is equal to 'waterMark' and waterMark equal to `image` ,the water height                                           | `number`               | `50`                   |
| opacity       | When the mode is equal to 'waterMark' and waterMark equal to `image` ,the water opacity range [0-1]                              | `number`               | `0.5`                  |
| filterType    | When the mode is equal to 'filter', can be set to `vintage` `blackWhite` `relief` `blur`                                         | `string`               | `vintage`              |

## Development

```
git clone https://github.com/lijinke666/react-image-process.git
npm install
npm start
```

## Properties

```jsx
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
    width:PropTypes.number,
    height:PropTypes.number,
    fontColor:PropTypes.string,
    fontSize: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    fontBold:PropTypes.bool,
    coordinate: PropTypes.array,
    onComplete: PropTypes.func
  };
```

## License

[MIT](https://github.com/lijinke666/react-image-process/blob/master/LICENSE)
