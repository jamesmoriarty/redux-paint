import { LINE_START, LINE_NEXT, LINE_UNDO, LINE_REDO } from "./actionTypes";

function reduce(state = { history: [], future: [] }, action) {
  switch (action.type) {
    case LINE_START:
      return {
        ...state,
        future: [],
        history: state.history.concat([
          [{ x: action.payload.x, y: action.payload.y }],
        ]),
      };
    case LINE_NEXT:
      var [last, ...rest] = state.history.slice().reverse();
      return {
        ...state,
        future: [],
        history: [
          ...rest.slice().reverse(),
          last.concat([{ x: action.payload.x, y: action.payload.y }]),
        ],
      };
    case LINE_UNDO:
      return {
        ...state,
        future: state.future.concat(state.history.slice(-1)),
        history: state.history.slice(0, -1),
      };
    case LINE_REDO:
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
