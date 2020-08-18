import { LINE_START, LINE_NEXT, LINE_UNDO, LINE_REDO } from "./actionTypes";

function reduce(state = { lines: [], future: [] }, action) {
  switch (action.type) {
    case LINE_START:
      return {
        ...state,
        future: [],
        lines: state.lines.concat([
          [{ x: action.payload.x, y: action.payload.y }],
        ]),
      };
    case LINE_NEXT:
      var [last, ...rest] = state.lines.slice().reverse();
      return {
        ...state,
        future: [],
        lines: [
          ...rest.slice().reverse(),
          last.concat([{ x: action.payload.x, y: action.payload.y }]),
        ],
      };
    case LINE_UNDO:
      return {
        ...state,
        future: state.future.concat(state.lines.slice(-1)),
        lines: state.lines.slice(0, -1),
      };
      case LINE_REDO:
        return {
          ...state,
          future: state.future.slice(0, -1),
          lines: state.lines.slice().concat(state.future.slice(-1)),
        };
    default:
      return state;
  }
}

export default reduce;
