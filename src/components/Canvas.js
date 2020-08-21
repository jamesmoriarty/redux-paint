import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { opCreate, opUpdate } from "./../redux/actions";
import { render } from "./../render";
import { OP_TYPE_RECT, OP_TYPE_GESTURE } from "./../constants";

function resize(refCanvas) {
  refCanvas.current.width = parseInt(
    getComputedStyle(refCanvas.current.parentNode).getPropertyValue("width")
  );
  refCanvas.current.height = parseInt(
    getComputedStyle(refCanvas.current.parentNode).getPropertyValue("height")
  );
}

function Canvas({ history, dispatch, type, strokeStyle }) {
  const [state, setState] = useState({ mouseDown: false }),
    handleEventAs = (type, strokeStyle, event) => {
      switch (event.type) {
        case "mousedown":
          setState({ mouseDown: true });

          return dispatch(
            opCreate(
              type,
              strokeStyle,
              event.pageX - refCanvas.current.offsetLeft,
              event.pageY - refCanvas.current.offsetTop
            )
          );
        case "mousemove":
          if (state.mouseDown) {
            return dispatch(
              opUpdate(
                event.pageX - refCanvas.current.offsetLeft,
                event.pageY - refCanvas.current.offsetTop
              )
            );
          }
          return;
        case "mouseup":
          return setState({ mouseDown: false });
        default:
          throw new Error("unknown event.type: ", event.type);
      }
    },
    handleEvent = (event) => {
      switch (type) {
        case OP_TYPE_GESTURE:
          return handleEventAs(type, strokeStyle, event);
        case OP_TYPE_RECT:
          return handleEventAs(type, strokeStyle, event);
        default:
          throw new Error("unknown op.type: ", type);
      }
    };

  let refCanvas = useRef(null);

  useEffect(() => {
    resize(refCanvas);
  });

  useEffect(() => {
    render(refCanvas, history);
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
