/**
 * @jest-environment jsdom
 */
import {
  BrowserRouter as Router,
  Route,
  Switch,
  MemoryRouter,
} from "react-router-dom";
import ScrollToTop from "../../src/client/wrappers/ScrollToTop";
import "regenerator-runtime/runtime";
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Header from "../../src/client/components/Header";
import Footer from "../../src/client/components/Footer";
import Body from "../../src/client/components/Body";

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

it("Sets scroll value to (0,0) on route change", async (done) => {
  await act(async () => {
    render(
      <React.StrictMode>
        <MemoryRouter>
          <ScrollToTop>
            <Switch>
              <Route exact path="/*">
                <Header />
                <Body />
                <Footer />
              </Route>
            </Switch>
          </ScrollToTop>
        </MemoryRouter>
      </React.StrictMode>,
      container
    );
  });
  global.scrollTo = jest.fn();

  //This was just to make sure the correct element was being called. You can remove it or change the toEqual if you need to.
  expect(container.querySelector("#testScroll").innerHTML).toEqual("Clients");

  act(() => {
    container
      .querySelector("#testScroll")
      .dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(global.scrollTo).toBeCalledWith(0, 0);

  process.nextTick(() => {
    done();
  });
});
