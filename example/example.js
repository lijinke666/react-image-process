import React from "react"
import ReactDOM from "react-dom"
import ReactImageMagician from "../src"
import Message from "rc-message"
import "rc-message/assets/index.css"

import demoImg from "./demo.jpg"

import "./example.less"

const Demo = ()=>(
    <ReactImageMagician
        mode="base64"
    >
        <img src={demoImg} alt="demo" className="example-img"/>
    </ReactImageMagician>
)

ReactDOM.render(
    <Demo/>,
    document.getElementById('root')
)
