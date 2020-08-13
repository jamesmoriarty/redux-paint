import React from 'react';
import './App.css';
import { useRef, useEffect } from 'react';
import { configureStore } from '@reduxjs/toolkit'

function App() {
  let refCanvas = useRef(null),
    refCanvasContainer = useRef(null);

  function mapMouseEvent(type, event) {
    return {
      type: type,
      payload: {
        x: event.pageX - refCanvas.current.offsetLeft,
        y: event.pageY - refCanvas.current.offsetTop
      }
    }
  };

  function mouseReducer(state = { x: 0, y: 0 }, action) {
    console.log(action)

    if (refCanvas.current === null) return state

    const ctx = refCanvas.current.getContext('2d')

    switch (action.type) {
      case "mousedown":
        ctx.beginPath();
        ctx.moveTo(action.payload.x, action.payload.y);
        return { ...state, x: action.payload.x, y: action.payload.y };
      case "mousemove":
        ctx.lineTo(action.payload.x, action.payload.y);
        ctx.stroke();
        return { ...state, x: action.payload.x, y: action.payload.y };
      default:
        return state
    }
  }

  const store = configureStore({ reducer: mouseReducer })

  useEffect(() => {
    const nodeCanvas = refCanvas.current,
      nodeCanvasContainer = refCanvasContainer.current,
      stylesCanvasContainer = getComputedStyle(nodeCanvasContainer);

    nodeCanvas.width = parseInt(stylesCanvasContainer.getPropertyValue('width'));
    nodeCanvas.height = parseInt(stylesCanvasContainer.getPropertyValue('height'));

    const onMouseMove = event => store.dispatch(mapMouseEvent("mousemove", event))

    nodeCanvas.addEventListener('mousedown', (event) => {
      store.dispatch(mapMouseEvent("mousedown", event))

      nodeCanvas.addEventListener('mousemove', onMouseMove, false);
    }, false);

    nodeCanvas.addEventListener('mouseup', () => {
      nodeCanvas.removeEventListener('mousemove', onMouseMove, false);
    }, false);
  })

  return (
    <div ref={refCanvasContainer} className="App">
      <canvas ref={refCanvas}></canvas>
    </div>
  );
}

export default App;
