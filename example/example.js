import React from "react"
import ReactDOM from "react-dom"
import ReactImageMagician from "../src"
import Message from "rc-message"

const demoImg = "https://avatars0.githubusercontent.com/u/21015895?s=400&u=c92c75e78c9bf23ddcb07ddff55d5d6540e16669&v=4"

import "./example.less"

const Demo = ()=>(
    <ReactImageMagician
        mode="base64"
    >
        <img src={demoImg} alt="demo"/>
    </ReactImageMagician>
)

ReactDOM.render(
    <Demo/>,
    document.getElementById('root')
)
