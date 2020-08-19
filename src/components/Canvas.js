import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { opStart, opContinue } from "./../redux/actions";

function render(refCanvas, history) {
  // eslint-disable-next-line
  refCanvas.current.width = refCanvas.current.width;

  const ctx = refCanvas.current.getContext("2d");

  for (const op of history) {
    switch (op.type) {
      case "line":
      default:
        const { x, y } = op[0];
        ctx.beginPath();
        ctx.moveTo(x, y);
        for (const { x, y } of op) {
          ctx.lineTo(x, y);
          ctx.stroke();
        }
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

function Canvas({ history, dispatch }) {
  const [state, setState] = useState({ mouseDown: false }),
    handleEvent = (event) => {
      switch (event.type) {
        case "mousedown":
          setState({ mouseDown: true });
          return dispatch(opStart(refCanvas, event));
        case "mousemove":
          if (state.mouseDown) {
            return dispatch(opContinue(refCanvas, event));
          }
          return;
        case "mouseup":
          return setState({ mouseDown: false });
        default:
          return console.log(event);
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

const mapStateToProps = (state) => ({
  history: state.history,
});

export default connect(mapStateToProps, null)(Canvas);
