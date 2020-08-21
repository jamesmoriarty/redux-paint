import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { opStart, opContinue } from "./../redux/actions";
import { OP_TYPE_LINE } from "./../constants";

function render(refCanvas, history) {
  // eslint-disable-next-line
  refCanvas.current.width = refCanvas.current.width;

  const ctx = refCanvas.current.getContext("2d");

  for (const op of history) {
    const { type, x, y } = op[0];
    switch (type) {
      case OP_TYPE_LINE:
        ctx.beginPath();
        ctx.moveTo(x, y);
        for (const { x, y } of op) {
          ctx.lineTo(x, y);
          ctx.stroke();
        }
        break;
      default:
        throw new Error("unknown op: ", op);
    }
  }
}

function resize(refCanvas) {
  refCanvas.current.width = parseInt(
    getComputedStyle(refCanvas.current.parentNode).getPropertyValue("width")
  );
  refCanvas.current.height = parseInt(
    getComputedStyle(refCanvas.current.parentNode).getPropertyValue("height")
  );
}

function Canvas({ history, dispatch, type }) {
  const [state, setState] = useState({ mouseDown: false, type: type }),
    handleEventAsLine = (event) => {
      switch (event.type) {
        case "mousedown":
          setState({ mouseDown: true });
          return dispatch(
            opStart(
              OP_TYPE_LINE,
              event.pageX - refCanvas.current.offsetLeft,
              event.pageY - refCanvas.current.offsetTop
            )
          );
        case "mousemove":
          if (state.mouseDown) {
            return dispatch(
              opContinue(
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
        case OP_TYPE_LINE:
          return handleEventAsLine(event);
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
