import React, { useEffect, useState, useRef } from "react";
import { handleRender } from "./Canvas/render";
import { handleResize } from "./Canvas/resize";

function Canvas({ history, onEvent, type, color }: any) {
  const [state, setState] = useState({ mouseDown: false }),
    handleEvent = (event: any) => {
      if (refCanvas.current == null) return;

      const x = event.pageX - refCanvas.current.offsetLeft,
        y = event.pageY - refCanvas.current.offsetTop;

      switch (event.type) {
        case "mousedown":
          setState({ mouseDown: true });
          return onEvent(type, color, event.type, x, y);
        case "mousemove":
          if (state.mouseDown) return onEvent(type, color, event.type, x, y);
          break;
        case "mouseup":
          return setState({ mouseDown: false });
        default:
          break;
      }
    };

  let refCanvas = useRef<HTMLCanvasElement>(null);

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

export default Canvas;
