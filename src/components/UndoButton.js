import React from "react";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { lineUndo } from "./../redux/actions";

function UndoButton({ lines, dispatch }) {
  return (
    <Button
      variant="contained"
      disabled={lines.length === 0}
      onClick={() => {
        dispatch(lineUndo());
      }}
    >
      Undo
    </Button>
  );
}

const mapStateToProps = (state) => ({
  lines: state.lines,
});

export default connect(mapStateToProps, null)(UndoButton);
