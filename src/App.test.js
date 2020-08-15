import React from "react";
import { act, render } from "@testing-library/react";
import App from "./App";

test("renders html", () => {
  act(() => {
    expect(render(<App />)).toMatchSnapshot();
  });
});
