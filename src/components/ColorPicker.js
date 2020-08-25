import React, { useState } from "react";
import { connect } from "react-redux";
import { ChromePicker } from "react-color";
import { opSetColor } from "./../redux/actions";

function ColorPicker({ children, dispatch, strokeStyle }) {
  const [state, setState] = useState({ displayColorPicker: false }),
    handleClose = () => {
      setState({ displayColorPicker: false });
    },
    handleClick = () => {
      setState({ displayColorPicker: !state.displayColorPicker });
    },
    handleChangeComplete = (color) => {
      dispatch(opSetColor(color.hex));
    },
    popover = {
      marginTop: "5vh",
      position: "absolute",
      zIndex: "2",
    },
    cover = {
      position: "fixed",
      top: "0px",
      right: "0px",
      bottom: "0px",
      left: "0px",
    };

  return (
    <div>
      {React.cloneElement(children, { onClick: handleClick })}
      {state.displayColorPicker ? (
        <div style={popover}>
          <div style={cover} onClick={handleClose} />
          <ChromePicker
            color={strokeStyle}
            onChangeComplete={handleChangeComplete}
          />
        </div>
      ) : null}
    </div>
  );
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, null)(ColorPicker);
