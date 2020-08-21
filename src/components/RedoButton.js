import React from "react";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { redo } from "./../redux/actions";

function UndoButton({ future, dispatch, className }) {
  return (
    <Button
      variant="contained"
      className={className}
      disabled={future.length === 0}
      onClick={() => {
        dispatch(redo());
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
