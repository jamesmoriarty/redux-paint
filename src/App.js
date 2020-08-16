import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { mousedown, mousemove } from "./redux/actions";
import store from "./redux/store";

function bindEventListeners(refCanvasContainer, refCanvas) {
  const onMouseMove = (event) => store.dispatch(mousemove(refCanvas, event)),
    onMouseUp = (event) =>
      refCanvas.current.removeEventListener("mousemove", onMouseMove, false),
    onMouseDown = (event) => {
      store.dispatch(mousedown(refCanvas, event));

      refCanvas.current.addEventListener("mousemove", onMouseMove, false);
    };

  refCanvas.current.width = parseInt(
    getComputedStyle(refCanvasContainer.current).getPropertyValue("width")
  );
  refCanvas.current.height = parseInt(
    getComputedStyle(refCanvasContainer.current).getPropertyValue("height")
  );

  refCanvas.current.addEventListener("mousedown", onMouseDown, false);
  refCanvas.current.addEventListener("mouseup", onMouseUp, false);

  return () => {
    refCanvas.current.removeEventListener("mousemove", onMouseMove, false);
    refCanvas.current.removeEventListener("mouseup", onMouseUp, false);
    refCanvas.current.removeEventListener("mousedown", onMouseDown, false);
  };
}

function App(props) {
  let refCanvas = useRef(null),
    refCanvasContainer = useRef(null);

  useEffect(() => {
    return bindEventListeners(refCanvasContainer, refCanvas);
  }, []);

  useEffect(() => {
    const ctx = refCanvas.current.getContext("2d");

    for (const line of props.lines) {
      const { x, y } = line[0];
      ctx.beginPath();
      ctx.moveTo(x, y);
      for (const { x, y } of line) {
        ctx.lineTo(x, y);
        ctx.stroke();
      }
    }
  });

  return (
    <div ref={refCanvasContainer} className="App">
      <canvas ref={refCanvas}></canvas>
    </div>
  );
}

const mapStateToProps = (state) => ({
  lines: state.lines,
});

export default connect(mapStateToProps)(App);

//export default App;
