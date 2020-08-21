import { OP_CREATE, OP_PATCH, UNDO, REDO } from "./actionTypes";

export const opStart = (type, x, y) => ({
  type: OP_CREATE,
  payload: {
    type: type,
    x: x,
    y: y,
  },
});

export const opContinue = (x, y) => ({
  type: OP_PATCH,
  payload: {
    x: x,
    y: y,
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
