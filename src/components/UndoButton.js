import React from "react";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { lineUndo } from "./../redux/actions";

function UndoButton({ dispatch }) {
  return (
    <Button
      variant="contained"
      onClick={() => {
        dispatch(lineUndo());
      }}
    >
      Undo
    </Button>
  );
}

export default connect(null, null)(UndoButton);
