import { MOUSE_DOWN, MOUSE_MOVE } from "./actionTypes";

function reduce(state = { lines: [] }, action) {
  switch (action.type) {
    case MOUSE_DOWN:
      return {
        ...state,
        lines: state.lines.concat([
          [{ x: action.payload.x, y: action.payload.y }],
        ]),
      };
    case MOUSE_MOVE:
      var [last, ...rest] = state.lines.slice().reverse();
      return {
        ...state,
        lines: [
          ...rest.slice().reverse(),
          last.concat([{ x: action.payload.x, y: action.payload.y }]),
        ],
      };
    default:
      return state;
  }
}

export default reduce;
