import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import ReactImageMagician from "../src";
import swal from "sweetalert";
import { name } from "../package.json";

import demoImg from "./demo.jpg";
import waterMark from "./watermark.png";

import "./example.less";

const onComplete = data => {
  console.log("data:", data);
};

class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  state = {
    primaryColor: "transparent"
  };
  getPrimaryColorComplete = primaryColor => {
    console.log("primaryColor:", primaryColor);
    this.setState({ primaryColor });
  };
  render() {
    const { primaryColor } = this.state;
    return (
      <Fragment>
        <h1>
          {name}{" "}
          <a
            href="https://github.com/lijinke666/react-image-process/blob/master/example/example.js"
            target="_blank"
          >
            [Source Code]
          </a>
        </h1>
        <hr />

        <h2>Base Image</h2>
        <img src={demoImg} alt="clip" className="example-img" />

        <h2>base64</h2>
        <ReactImageMagician mode="base64" onComplete={onComplete}>
          <img
            src={demoImg}
            alt="base64"
            className="example-img"
            onClick={() =>
              swal({
                text: `
              { 
                mode:'base64'
              }
            `
              })
            }
          />
        </ReactImageMagician>

        <h2>clip</h2>
        <ReactImageMagician
          mode="clip"
          scale={1.0}
          coordinate={[[200, 200], [300, 300]]}
        >
          <img
            src={demoImg}
            alt="clip"
            className="example-img"
            onClick={() =>
              swal({
                text: `
                  {
                    mode:'clip',
                    scale:1,
                    coordinate:[[200, 200], [300, 300]]
                  }
                  `
              })
            }
          />
        </ReactImageMagician>
        <ReactImageMagician
          mode="clip"
          scale={2}
          coordinate={[[200, 200], [600, 600]]}
        >
          <img
            src={demoImg}
            alt="clip"
            className="example-img"
            onClick={() =>
              swal({
                text: `
                  {
                    mode:'clip',
                    scale:2,
                    coordinate:[[200, 200], [600, 600]]}
                  `
              })
            }
          />
        </ReactImageMagician>

        <h2>compress</h2>
        <ReactImageMagician mode="compress" quality={0.1}>
          <img
            src={demoImg}
            alt="compress"
            className="example-img"
            onClick={() =>
              swal({
                text: `
                {
                  mode:'compress',
                  quality:0.1
                }
                `
              })
            }
          />
        </ReactImageMagician>
        <ReactImageMagician mode="compress" quality={0.01}>
          <img
            src={demoImg}
            alt="compress"
            className="example-img"
            onClick={() =>
              swal({
                text: `
                  {
                    mode:'compress',
                    quality:0.01
                  }
                  `
              })
            }
          />
        </ReactImageMagician>

        <h2>rotate</h2>
        <ReactImageMagician mode="rotate" rotate={30}>
          <img
            src={demoImg}
            alt="rotate"
            className="example-img"
            onClick={() =>
              swal({
                text: `
                {
                  mode:'rotate',
                  rotate:30
                }`
              })
            }
          />
        </ReactImageMagician>

        <h2>primaryColor</h2>
        <ReactImageMagician
          mode="primaryColor"
          onComplete={this.getPrimaryColorComplete}
        >
          <img
            src={waterMark}
            alt={primaryColor}
            title={primaryColor}
            className="example-img"
            onClick={() =>
              swal({
                text: `
                {
                  mode:'primaryColor'
                }`
              })
            }
          />
        </ReactImageMagician>
        <div style={{textAlign:"center"}}>{primaryColor}</div>

        <h2>waterMark</h2>
        <ReactImageMagician
          mode="waterMark"
          waterMarkType="image"
          waterMark={waterMark}
          width={60}
          height={60}
          opacity={0.7}
          coordinate={[430, 200]}
        >
          <img
            src={demoImg}
            alt="waterMark"
            className="example-img"
            onClick={() =>
              swal({
                text: `
                  {
                    mode:'waterMark',
                    waterMarkType:'image'
                    waterMark={waterMark}
                    width:60
                    height:60
                    opacity:0.8
                    coordinate:[330, 300]
                  }
                `
              })
            }
          />
        </ReactImageMagician>
        <ReactImageMagician
          mode="waterMark"
          waterMarkType="text"
          waterMark={name}
          fontBold={false}
          fontSize={20}
          fontColor="#396"
          coordinate={[10, 20]}
        >
          <img
            src={demoImg}
            alt="waterMark"
            className="example-img"
            onClick={() =>
              swal({
                text: `
                  {
                    mode:'waterMark',
                    waterMarkType:'text'.
                    waterMark={${name}}.
                    fontBold:false,
                    fontSize:30
                    fontColor:"#396"
                    coordinate:[10,20]
                  }
                `
              })
            }
          />
        </ReactImageMagician>

        <h2>imageFilter</h2>
        <ReactImageMagician mode="filter" filterType="vintage">
          <img
            src={demoImg}
            alt="vintage"
            className="example-img"
            onClick={() =>
              swal({
                text: `
                {
                  mode:'filter',
                  filterType:'vintage'
                  }
                  `
              })
            }
          />
        </ReactImageMagician>
        <ReactImageMagician mode="filter" filterType="blackWhite">
          <img
            src={demoImg}
            alt="blackWhite"
            className="example-img"
            onClick={() =>
              swal({
                text: `
                {
                  mode:'filter',
                  filterType:'blackWhite'
                }
                `
              })
            }
          />
        </ReactImageMagician>
        <ReactImageMagician mode="filter" filterType="relief">
          <img
            src={demoImg}
            alt="relief"
            className="example-img"
            onClick={() =>
              swal({
                text: `
                {
                  mode:'filter',
                  filterType:'relief'
                }
                  `
              })
            }
          />
        </ReactImageMagician>
        <ReactImageMagician mode="filter" filterType="blur">
          <img
            src={demoImg}
            alt="blur"
            className="example-img"
            onClick={() =>
              swal({
                text: `
                {
                  mode:'filter',
                  filterType:'blur'
                }
                `
              })
            }
          />
        </ReactImageMagician>
      </Fragment>
    );
  }
}

ReactDOM.render(<Demo />, document.getElementById("root"));
