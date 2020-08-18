import React from "react";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { lineUndo } from "./../redux/actions";

function UndoButton({ history, dispatch, className }) {
  return (
    <Button
      variant="contained"
      className={className}
      disabled={history.length === 0}
      onClick={() => {
        dispatch(lineUndo());
      }}
    >
      Undo
    </Button>
  );
}

const mapStateToProps = (state) => ({
  history: state.history,
});

export default connect(mapStateToProps, null)(UndoButton);
