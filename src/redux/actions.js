import {
  OP_CREATE,
  OP_UPDATE,
  UNDO,
  REDO,
  OP_SET_TYPE,
  OP_SET_COLOR,
} from "./actionTypes";

export const opSetType = (type) => ({
  type: OP_SET_TYPE,
  payload: { type },
});

export const opSetColor = (color) => ({
  type: OP_SET_COLOR,
  payload: { color },
});

export const opCreate = (type, strokeStyle, x, y) => ({
  type: OP_CREATE,
  payload: { type, strokeStyle, x, y },
});

export const opUpdate = (x, y) => ({
  type: OP_UPDATE,
  payload: { x, y },
});

export const undo = () => ({
  type: UNDO,
  payload: {},
});

export const redo = () => ({
  type: REDO,
  payload: {},
});
