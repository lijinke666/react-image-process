import React from "react";
import assert from "power-assert";
import { shallow, mount } from "enzyme";
import ReactImageProcess from "../../src";
import watermark from "../../example/watermark.png"
import img from "../../example/demo.jpg"

describe("ReactImageProcess", () => {
  it("should render a <ReactImageProcess/> components", () => {
    const wrapper = mount(
      <ReactImageProcess mode="base64" className="text-class-name" />
    );
    assert(wrapper.find(".react-image-process-base64").length === 1);
    assert(wrapper.find(".text-class-name").length >= 1);
  });
  it("should render mode == base64", () => {
    const wrapper = mount(<ReactImageProcess mode="base64" />);
    assert(wrapper.props().mode === "base64");
    wrapper.setProps({ mode: "clip" });
    assert(wrapper.props().mode === "clip");
  })
});
