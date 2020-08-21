import { OP_CREATE, OP_PATCH, UNDO, REDO } from "./actionTypes";
import { OP_TYPE_LINE } from "./../constants";

function reduce(state = { type: OP_TYPE_LINE, history: [], future: [] }, action) {
  switch (action.type) {
    case OP_CREATE:
      return {
        ...state,
        future: [],
        history: state.history.concat([[action.payload]]),
      };
    case OP_PATCH:
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
