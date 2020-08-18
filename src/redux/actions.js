import { LINE_START, LINE_NEXT, LINE_UNDO, LINE_REDO } from "./actionTypes";

export const lineStart = (refCanvas, event) => ({
  type: LINE_START,
  payload: {
    x: event.pageX - refCanvas.current.offsetLeft,
    y: event.pageY - refCanvas.current.offsetTop,
  },
});

export const lineNext = (refCanvas, event) => ({
  type: LINE_NEXT,
  payload: {
    x: event.pageX - refCanvas.current.offsetLeft,
    y: event.pageY - refCanvas.current.offsetTop,
  },
});

export const lineUndo = () => ({
  type: LINE_UNDO,
  payload: {},
});

export const lineRedo = () => ({
  type: LINE_REDO,
  payload: {},
});
