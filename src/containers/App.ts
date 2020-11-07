import App from "../App";
import { ACTION_TYPES, OP_TYPES, State, Dispatch } from "../types";
import { connect } from "react-redux";

const mapStateToProps = (state: State) => state;

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onGesture: () => {
      dispatch({
        type: ACTION_TYPES.OP_SET_TYPE,
        payload: { type: OP_TYPES.OP_TYPE_GESTURE },
      });
    },
    onRect: () => {
      dispatch({
        type: ACTION_TYPES.OP_SET_TYPE,
        payload: { type: OP_TYPES.OP_TYPE_RECT },
      });
    },
    onUndo: () => {
      dispatch({ type: ACTION_TYPES.UNDO, payload: {} });
    },
    onRedo: () => {
      dispatch({ type: ACTION_TYPES.REDO, payload: {} });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
