import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";
import UndoButton from "./components/UndoButton";
import { lineStart, lineNext } from "./redux/actions";
import store from "./redux/store";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  canvas: {
    height: "70vh",
  },
}));

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
  const classes = useStyles();

  let refCanvas = useRef(null),
    refCanvasContainer = useRef(null);

  useEffect(() => {
    return bindEventListeners(refCanvasContainer, refCanvas);
  }, []);

  useEffect(() => {
    drawLines(refCanvas, lines);
  });

  return (
    <div>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Redux Paint
          </Typography>
          <UndoButton />
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <Container
          maxWidth="lg"
          className={classes.container}
          ref={refCanvasContainer}
        >
          <Card className={classes.canvas} raised={true}>
            <canvas ref={refCanvas}></canvas>
          </Card>
        </Container>
      </main>
    </div>
  );
}

const mapStateToProps = (state) => ({
  lines: state.lines,
});

export default connect(mapStateToProps, null)(App);
