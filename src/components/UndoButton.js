import React from "react";
import { connect } from "react-redux";
import { lineUndo } from "./../redux/actions";

function UndoButton({ dispatch }) {
  return (
    <button
      onClick={() => {
        dispatch(lineUndo());
      }}
    >
      Undo
    </button>
  );
}

export default connect(null, null)(UndoButton);
