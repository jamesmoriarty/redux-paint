import { connect } from "react-redux";
import { ACTION_TYPES, State, Dispatch } from "../constants";
import ColorPicker from "../components/ColorPicker";

const mapStateToProps = (state: State) => state;

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onChangeComplete: (color: any) => {
      dispatch({
        type: ACTION_TYPES.OP_SET_COLOR,
        payload: { color: color.hex },
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ColorPicker);
