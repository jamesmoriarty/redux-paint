import React from "react";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { lineRedo } from "./../redux/actions";

function UndoButton({ future, dispatch }) {
  return (
    <Button
      variant="contained"
      disabled={future.length === 0}
      onClick={() => {
        dispatch(lineRedo());
      }}
    >
      Redo
    </Button>
  );
}

const mapStateToProps = (state) => ({
  future: state.future,
});

export default connect(mapStateToProps, null)(UndoButton);
