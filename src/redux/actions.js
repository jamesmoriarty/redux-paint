import { OP_START, OP_CONTINUE, UNDO, REDO } from "./actionTypes";

export const opStart = (refCanvas, event) => ({
  type: OP_START,
  payload: {
    x: event.pageX - refCanvas.current.offsetLeft,
    y: event.pageY - refCanvas.current.offsetTop,
  },
});

export const opContinue = (refCanvas, event) => ({
  type: OP_CONTINUE,
  payload: {
    x: event.pageX - refCanvas.current.offsetLeft,
    y: event.pageY - refCanvas.current.offsetTop,
  },
});

export const undo = () => ({
  type: UNDO,
  payload: {},
});

export const redo = () => ({
  type: REDO,
  payload: {},
});
