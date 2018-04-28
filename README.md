# react-image-process

> in development

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

<!-- ![lightTheme](https://github.com/lijinke666/react-image-process/blob/master/assetsImg/screenshots.png) -->

## Example

> ONLINE example : [https://lijinke666.github.io/react-image-process/](https://lijinke666.github.io/react-image-process/)

## Usage

```jsx
import React from "react";
import ReactDOM from "react-dom";
import ReactImageMagician from "react-image-magician";

const onComplete = data => {
  console.log("data:", data);
};

ReactDOM.render(
  <ReactImageMagician 
    mode="base64" 
    onComplete={onComplete}
    >
    <img src="YOUR_IMG_URL" />
  </ReactImageMagician>,
  document.getElementById("root")
);
```

Suport multipart Images

```jsx
<ReactImageMagician 
    mode="compress" 
    quality={0.2}
    onComplete={onComplete}
>
  <img src="YOUR_IMG_URL" alt="compress" className="example-img" />
  <img src="YOUR_IMG_URL" alt="compress" className="example-img" />
</ReactImageMagician>
```

## API

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

[MIT](https://github.com/lijinke666/react-image-process/blob/master/LICENCE)
