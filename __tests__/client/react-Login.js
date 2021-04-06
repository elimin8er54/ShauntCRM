/**
 * @jest-environment jsdom
 */

import Login from "../../src/client/components/body/Login";
import "regenerator-runtime/runtime";
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import axios from "axios";

jest.mock("axios");

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

it("Checks if login button is labeled and calls axios on login click", async (done) => {
  await act(async () => {
    render(

      <Login />,

      container
    );
  });

  const data = { data: { success: true } };

  axios.mockImplementationOnce(() => Promise.resolve(data));

  //We need to check nested due to material UI wrapping the button in a nested span
  expect(container.querySelector("#loginButton span").innerHTML).toEqual("Log In");

  container
    .querySelector("#loginButton")
    .dispatchEvent(new MouseEvent("click", { bubbles: true }));

  const username = "";
  const password = "";

  expect(axios).toHaveBeenCalledWith({
    url: `/api/signin`,
    method: "POST",
    data: { username: username, password: password },
    headers: { "Content-Type": "application/json" },
  });

  expect(axios).toHaveBeenCalledTimes(1);




  process.nextTick(() => {
    done();
  });
});


it("Checks if buttons are labeled and calls axios on login click", async (done) => {
  await act(async () => {
    render(

      <Login />,

      container
    );
  });

  const data = { data: { success: true } };

  axios.mockImplementationOnce(() => Promise.resolve(data));
  //We need to check nested due to material UI wrapping the button in a nested span
  expect(container.querySelector("#createButton span").innerHTML).toEqual("Create Account");

  container
    .querySelector("#createButton")
    .dispatchEvent(new MouseEvent("click", { bubbles: true }));

  const username = "";
  const password = "";

  expect(axios).toHaveBeenCalledWith({
    url: `/api/createuser`,
    method: "POST",
    data: { username: username, password: password },
    headers: { "Content-Type": "application/json" }
  });

  //2 times because it was called the first time in the other test before this
  expect(axios).toHaveBeenCalledTimes(2);

  process.nextTick(() => {
    done();
  });
});
