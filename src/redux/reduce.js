import { LINE_START, LINE_NEXT, LINE_UNDO } from "./actionTypes";

function reduce(state = { lines: [] }, action) {
  switch (action.type) {
    case LINE_START:
      return {
        ...state,
        lines: state.lines.concat([
          [{ x: action.payload.x, y: action.payload.y }],
        ]),
      };
    case LINE_NEXT:
      var [last, ...rest] = state.lines.slice().reverse();
      return {
        ...state,
        lines: [
          ...rest.slice().reverse(),
          last.concat([{ x: action.payload.x, y: action.payload.y }]),
        ],
      };
    case LINE_UNDO:
      return {
          ...state,
          lines: state.lines.slice(0, -1)
      }
    default:
      return state;
  }
}

export default reduce;
