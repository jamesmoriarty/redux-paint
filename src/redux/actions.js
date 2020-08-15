import { MOUSE_DOWN, MOUSE_MOVE } from "./actionTypes";

export const mousedown = (refCanvas, event) => ({
  type: MOUSE_DOWN,
  payload: {
    x: event.pageX - refCanvas.current.offsetLeft,
    y: event.pageY - refCanvas.current.offsetTop,
  },
});

export const mousemove = (refCanvas, event) => ({
  type: MOUSE_MOVE,
  payload: {
    x: event.pageX - refCanvas.current.offsetLeft,
    y: event.pageY - refCanvas.current.offsetTop,
  },
});
