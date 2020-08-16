import React, { useEffect, useRef } from "react";
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import { connect } from "react-redux";
import { lineStart, lineNext } from "./redux/actions";
import store from "./redux/store";
import UndoButton from "./components/UndoButton";

function bindEventListeners(refCanvasContainer, refCanvas) {
  refCanvas.current.width = parseInt(
    getComputedStyle(refCanvasContainer.current).getPropertyValue("width")
  );
  refCanvas.current.height = parseInt(
    getComputedStyle(refCanvasContainer.current).getPropertyValue("height")
  );

  const onMouseMove = (event) => store.dispatch(lineNext(refCanvas, event)),
    onMouseUp = (event) =>
      refCanvas.current.removeEventListener("mousemove", onMouseMove, false),
    onMouseDown = (event) => {
      store.dispatch(lineStart(refCanvas, event));

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

function drawLines(refCanvas, lines) {
  refCanvas.current.width = refCanvas.current.width;
  const ctx = refCanvas.current.getContext("2d");

  for (const line of lines) {
    const { x, y } = line[0];
    ctx.beginPath();
    ctx.moveTo(x, y);
    for (const { x, y } of line) {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  }
}

function App({ lines, dispatch }) {
  let refCanvas = useRef(null),
    refCanvasContainer = useRef(null);

  useEffect(() => {
    return bindEventListeners(refCanvasContainer, refCanvas);
  }, []);

  useEffect(() => {
    drawLines(refCanvas, lines);
  });

  return (
    <Container maxWidth="sm" ref={refCanvasContainer}>
      <Card>
        <canvas ref={refCanvas}></canvas>
        <CardActions>
          <UndoButton />
        </CardActions>
      </Card>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  lines: state.lines,
});

export default connect(mapStateToProps, null)(App);
