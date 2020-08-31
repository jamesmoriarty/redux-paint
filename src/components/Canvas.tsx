import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { handleRender } from "./Canvas/render";
import { handleResize } from "./Canvas/resize";
import { ACTION_TYPES, OP_TYPES, State } from "../constants";

function Canvas({ history, dispatch, type, color }: any) {
  const [state, setState] = useState({ mouseDown: false }),
    handleEvent = (event: any) => {
      if (refCanvas.current == null) return;

      switch (type) {
        case OP_TYPES.OP_TYPE_RECT:
        case OP_TYPES.OP_TYPE_GESTURE:
          switch (event.type) {
            case "mousedown":
              setState({ mouseDown: true });

              return dispatch({
                type: ACTION_TYPES.OP_CREATE,
                payload: {
                  type: type,
                  color: color,
                  x: event.pageX - refCanvas.current.offsetLeft,
                  y: event.pageY - refCanvas.current.offsetTop,
                },
              });
            case "mousemove":
              if (state.mouseDown) {
                return dispatch({
                  type: ACTION_TYPES.OP_UPDATE,
                  payload: {
                    x: event.pageX - refCanvas.current.offsetLeft,
                    y: event.pageY - refCanvas.current.offsetTop,
                  },
                });
              }
              return;
            case "mouseup":
              return setState({ mouseDown: false });
            default:
              throw new Error("unknown event.type: " + event.type);
          }
        default:
          throw new Error("unknown op.type: " + type);
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

const mapStateToProps = (state: State) => state;

export default connect(mapStateToProps, null)(Canvas);
