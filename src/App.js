import React from "react";
import { useRef, useEffect } from "react";
// import { connect } from "react-redux";
import { mousedown, mousemove } from "./redux/actions";
import store from "./redux/store";

function bindEventListeners(refCanvasContainer, refCanvas) {
  const onMouseMove = (event) => store.dispatch(mousemove(refCanvas, event));

  refCanvas.current.width = parseInt(
    getComputedStyle(refCanvasContainer.current).getPropertyValue("width")
  );
  refCanvas.current.height = parseInt(
    getComputedStyle(refCanvasContainer.current).getPropertyValue("height")
  );

  refCanvas.current.addEventListener(
    "mousedown",
    (event) => {
      store.dispatch(mousedown(refCanvas, event));

      refCanvas.current.addEventListener("mousemove", onMouseMove, false);
    },
    false
  );

  refCanvas.current.addEventListener(
    "mouseup",
    () => {
      refCanvas.current.removeEventListener("mousemove", onMouseMove, false);
    },
    false
  );
}

function App(props) {
  let refCanvas = useRef(null),
    refCanvasContainer = useRef(null);

  useEffect(() => bindEventListeners(refCanvasContainer, refCanvas));
  useEffect(() => {
    store.subscribe(()=> {
      const ctx = refCanvas.current.getContext("2d")

      for (const line of store.getState().lines) {
        const { x, y } = line[0];
        ctx.beginPath();
        ctx.moveTo(x, y);
        for (const { x, y } of line) {
          ctx.lineTo(x, y);
          ctx.stroke();
        }
      }
    })

  });

  return (
    <div ref={refCanvasContainer} className="App">
      <canvas ref={refCanvas}></canvas>
    </div>
  );
}

// const mapStateToProps = state => ({
//   lines: state.lines
// })

// export default connect(mapStateToProps)(App);

export default App;
