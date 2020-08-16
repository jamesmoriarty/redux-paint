import React from "react";
import { act, render } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";

test("renders html", () => {
  act(() => {
    expect(
      render(
        <Provider store={store}>
          <App />
        </Provider>
      )
    ).toMatchSnapshot();
  });
});
