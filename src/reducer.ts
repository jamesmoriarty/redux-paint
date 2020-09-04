import {
  State,
  Action,
  ACTION_TYPES,
  OP_TYPE_DEFAULT,
  OP_STROKE_STYLE_DEFAULT,
} from "./constants";

function reduce(
  state: State = {
    type: OP_TYPE_DEFAULT,
    color: OP_STROKE_STYLE_DEFAULT,
    history: [],
    future: [],
  },
  action: Action
) {
  switch (action.type) {
    case ACTION_TYPES.OP_SET_TYPE:
      return {
        ...state,
        type: action.payload.type,
      };
    case ACTION_TYPES.OP_SET_COLOR:
      return {
        ...state,
        color: action.payload.color,
      };
    case ACTION_TYPES.OP_CREATE:
      return {
        ...state,
        future: [],
        history: state.history.concat([action.payload]),
      };
    case ACTION_TYPES.OP_UPDATE:
      const { type, color, points } = state.history.slice(-1)[0],
        { x, y } = action.payload;

      return {
        ...state,
        future: [],
        history: state.history.slice(0, -1).concat([
          {
            type,
            color,
            points: points.concat([{ x, y }]),
          },
        ]),
      };
    case ACTION_TYPES.UNDO:
      return {
        ...state,
        future: state.future.concat(state.history.slice(-1)),
        history: state.history.slice(0, -1),
      };
    case ACTION_TYPES.REDO:
      return {
        ...state,
        future: state.future.slice(0, -1),
        history: state.history.slice().concat(state.future.slice(-1)),
      };
    default:
      return state;
  }
}

export default reduce;
