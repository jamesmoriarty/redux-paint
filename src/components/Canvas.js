import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { handleOp } from "./Canvas/events";
import { handleRender } from "./Canvas/render";
import { handleResize } from "./Canvas/resize";
import { OP_TYPE_RECT, OP_TYPE_GESTURE } from "./../constants";

function Canvas({ history, dispatch, type, strokeStyle }) {
  const [state, setState] = useState({ mouseDown: false }),
    handleEvent = (event) => {
      switch (type) {
        case OP_TYPE_RECT:
        case OP_TYPE_GESTURE:
          return handleOp(
            dispatch,
            state,
            setState,
            refCanvas,
            type,
            strokeStyle,
            event
          );
        default:
          throw new Error("unknown op.type: ", type);
      }
    };

  let refCanvas = useRef(null);

  useEffect(() => {
    handleResize(refCanvas);
  });

  useEffect(() => {
    handleRender(refCanvas, history);
  });

  return (
    <canvas
      ref={refCanvas}
      onMouseUp={handleEvent}
      onMouseMove={handleEvent}
      onMouseDown={handleEvent}
    ></canvas>
  );
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, null)(Canvas);
