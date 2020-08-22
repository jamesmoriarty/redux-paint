import { OP_CREATE, OP_UPDATE, UNDO, REDO, OP_SET_TYPE } from "./actionTypes";

export const setType = (type) => ({
  type: OP_SET_TYPE,
  payload: { type },
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
