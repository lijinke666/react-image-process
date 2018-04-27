import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import ReactImageMagician from "../src";
import Message from "rc-message";
import "rc-message/assets/index.css";

import demoImg from "./demo2.jpg";

import "./example.less";

const Demo = () => (
  <Fragment>
    <h2>原图</h2>
    <img src={demoImg} alt="clip" className="example-img" />

    <h2>base64</h2>
    <ReactImageMagician mode="base64">
      <img
        src={demoImg}
        alt="base64"
        className="example-img"
        onClick={() => Message.success({ content: "base64" })}
      />
      <img
        src={demoImg}
        alt="base64"
        className="example-img"
        onClick={() => Message.success({ content: "base64" })}
      />
    </ReactImageMagician>

    <h2>clip</h2>
    <ReactImageMagician
      mode="clip"
      scale={1.0}
      coordinate={[[200, 200], [300, 300]]}
    >
      <img src={demoImg} alt="clip" className="example-img" />
      <img src={demoImg} alt="clip" className="example-img" />
    </ReactImageMagician>
    <ReactImageMagician
      mode="clip"
      scale={2}
      coordinate={[[100, 100], [400, 400]]}
    >
      <img src={demoImg} alt="clip" className="example-img" />
    </ReactImageMagician>
  </Fragment>
);

ReactDOM.render(<Demo />, document.getElementById("root"));
