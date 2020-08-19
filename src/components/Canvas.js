import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { opStart, opContinue } from "./../redux/actions";

function bindEventListeners(refCanvas, dispatch) {
  refCanvas.current.width = parseInt(
    getComputedStyle(refCanvas.current.parentNode).getPropertyValue("width")
  );
  refCanvas.current.height = parseInt(
    getComputedStyle(refCanvas.current.parentNode).getPropertyValue("height")
  );

  const onMouseMove = (event) => dispatch(opContinue(refCanvas, event));
  const onMouseUp = (event) =>
    refCanvas.current.removeEventListener("mousemove", onMouseMove, false);
  const onMouseDown = (event) => {
    dispatch(opStart(refCanvas, event));

    refCanvas.current.addEventListener("mousemove", onMouseMove, false);
  };

  refCanvas.current.addEventListener("mousedown", onMouseDown, false);
  refCanvas.current.addEventListener("mouseup", onMouseUp, false);

  return () => {
    refCanvas.current.removeEventListener("mousemove", onMouseMove, false);
    refCanvas.current.removeEventListener("mouseup", onMouseUp, false);
    refCanvas.current.removeEventListener("mousedown", onMouseDown, false);
  };
}

function drawLines(refCanvas, history) {
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

function Canvas({ history, dispatch }) {
  let refCanvas = useRef(null);

  useEffect(() => {
    return bindEventListeners(refCanvas, dispatch);
  }, [dispatch]);

  useEffect(() => {
    drawLines(refCanvas, history);
  });

  return <canvas ref={refCanvas}></canvas>;
}

const mapStateToProps = (state) => ({
  history: state.history,
});

export default connect(mapStateToProps, null)(Canvas);
