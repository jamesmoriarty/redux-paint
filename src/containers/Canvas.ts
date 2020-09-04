import { connect } from "react-redux";
import { ACTION_TYPES, OP_TYPES, State, Dispatch } from "../constants";
import Canvas from "../components/Canvas";

const mapStateToProps = (state: State) => state;

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onEvent: (
      opType: OP_TYPES,
      color: string,
      eventType: string,
      x: number,
      y: number
    ) => {
      switch (opType) {
        case OP_TYPES.OP_TYPE_RECT:
        case OP_TYPES.OP_TYPE_GESTURE:
          switch (eventType) {
            case "mousedown":
              return dispatch({
                type: ACTION_TYPES.OP_CREATE,
                payload: {
                  type: opType,
                  color: color,
                  points: [{ x, y }],
                },
              });
            case "mousemove":
              return dispatch({
                type: ACTION_TYPES.OP_UPDATE,
                payload: {
                  x,
                  y,
                },
              });
            default:
              throw new Error("unknown event.type");
          }
        default:
          throw new Error("unknown op.type: " + opType);
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
