import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { opStart, opContinue } from "./../redux/actions";

function render(refCanvas, history) {
  // eslint-disable-next-line
  refCanvas.current.width = refCanvas.current.width;

  const ctx = refCanvas.current.getContext("2d");

  for (const line of history) {
    const { x, y } = line[0];
    ctx.beginPath();
    ctx.moveTo(x, y);
    for (const { x, y } of line) {
      ctx.lineTo(x, y);
      ctx.stroke();
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
          dispatch(opStart(refCanvas, event));

          break;
        case "mousemove":
          if (state.mouseDown) dispatch(opContinue(refCanvas, event));

          break;
        case "mouseup":
          setState({ mouseDown: false });

          break;
        default:
          console.log(event);
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
