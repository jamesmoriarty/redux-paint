import {
  OP_CREATE,
  OP_UPDATE,
  UNDO,
  REDO,
  OP_SET_TYPE,
  OP_SET_COLOR,
} from "./actionTypes";
import { OP_TYPE_DEFAULT, OP_STROKE_STYLE_DEFAULT } from "./../constants";

function reduce(
  state = {
    type: OP_TYPE_DEFAULT,
    strokeStyle: OP_STROKE_STYLE_DEFAULT,
    history: [],
    future: [],
  },
  action
) {
  switch (action.type) {
    case OP_SET_TYPE:
      return {
        ...state,
        type: action.payload.type,
      };
    case OP_SET_COLOR:
      return {
        ...state,
        strokeStyle: action.payload.color,
      };
    case OP_CREATE:
      return {
        ...state,
        future: [],
        history: state.history.concat([[action.payload]]),
      };
    case OP_UPDATE:
      var [last, ...rest] = state.history.slice().reverse();
      return {
        ...state,
        future: [],
        history: [...rest.slice().reverse(), last.concat([action.payload])],
      };
    case UNDO:
      return {
        ...state,
        future: state.future.concat(state.history.slice(-1)),
        history: state.history.slice(0, -1),
      };
    case REDO:
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
