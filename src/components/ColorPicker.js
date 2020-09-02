import React, { useState } from "react";
import { ChromePicker } from "react-color";

function ColorPicker({ children, onChangeComplete, color }) {
  const [state, setState] = useState({ displayColorPicker: false }),
    handleClose = () => {
      setState({ displayColorPicker: false });
    },
    handleClick = () => {
      setState({ displayColorPicker: !state.displayColorPicker });
    },
    handleChangeComplete = (color) => {
      onChangeComplete(color);
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
          <ChromePicker color={color} onChangeComplete={handleChangeComplete} />
        </div>
      ) : null}
    </div>
  );
}

export default ColorPicker;
