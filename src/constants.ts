export interface State {
  type: OP_TYPES;
  color: string;
  history: OpPayload[][];
  future: OpPayload[][];
}

export type OpPayload = OpCreatePayload | OpUpdatePayload;

export type Action =
  | UndoAction
  | RedoAction
  | OpSetTypeAction
  | OpSetColorAction
  | OpCreateAction
  | OpUpdateAction;

export enum OP_TYPES {
  OP_TYPE_GESTURE,
  OP_TYPE_RECT,
}

export const OP_TYPE_DEFAULT = OP_TYPES.OP_TYPE_GESTURE;
export const OP_STROKE_STYLE_DEFAULT = "#333";

export type OpCreatePayload = {
  type: OP_TYPES;
  color: string;
  x: number;
  y: number;
};

export type OpUpdatePayload = {
  x: number;
  y: number;
};

export enum ACTION_TYPES {
  OP_SET_TYPE,
  OP_SET_COLOR,
  OP_CREATE,
  OP_UPDATE,
  UNDO,
  REDO,
}

export type UndoAction = {
  type: ACTION_TYPES.UNDO;
  payload: {};
};

export type RedoAction = {
  type: ACTION_TYPES.REDO;
  payload: {};
};

export type OpSetTypeAction = {
  type: ACTION_TYPES.OP_SET_TYPE;
  payload: {
    type: OP_TYPES;
  };
};

export type OpSetColorAction = {
  type: ACTION_TYPES.OP_SET_COLOR;
  payload: {
    color: string;
  };
};

export type OpCreateAction = {
  type: ACTION_TYPES.OP_CREATE;
  payload: OpCreatePayload;
};

export type OpUpdateAction = {
  type: ACTION_TYPES.OP_UPDATE;
  payload: OpUpdatePayload;
};
