import { connect } from "react-redux";
import { State, ACTION_TYPES } from "../constants";
import ColorPicker from "../components/ColorPicker";

const mapStateToProps = (state: State) => state;

const mapDispatchToProps = (dispatch: any) => {
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
