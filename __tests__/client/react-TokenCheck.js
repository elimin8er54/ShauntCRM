/**
 * @jest-environment jsdom
 */
import TokenCheck from "../../src/client/wrappers/TokenCheck";
import "regenerator-runtime/runtime";
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import axios from "axios";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

jest.useFakeTimers();
jest.mock("axios");
Enzyme.configure({ adapter: new Adapter() });
let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("mounts, clicks and waits to test token", async (done) => {
  await act(async () => {
    render(<TokenCheck time={1000}></TokenCheck>, container);
  });
  document.body.click();

  expect(axios).toHaveBeenCalledTimes(2);
  expect(axios).toHaveBeenCalledWith({
    url: `/api/jwtauth`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer  ${localStorage.getItem("token")}`,
    },
  });

  setTimeout(() => {
    expect(axios).toHaveBeenCalledTimes(3);
  }, 1000);
  jest.runTimersToTime(1000);
  process.nextTick(() => {
    axios.mockClear();
    done();
  });
});
