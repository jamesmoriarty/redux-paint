import React from 'react';
import './App.css';
import { useRef, useEffect } from 'react';

function App() {
  let refCanvas = useRef(null),
    refCanvasContainer = useRef(null);

  useEffect(() => {
    const nodeCanvas = refCanvas.current,
      nodeCanvasContainer = refCanvasContainer.current,
      stylesCanvasContainer = getComputedStyle(nodeCanvasContainer),
      ctx = nodeCanvas.getContext('2d'),
      onPaint = function () {
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      };

    nodeCanvas.width = parseInt(stylesCanvasContainer.getPropertyValue('width'));
    nodeCanvas.height = parseInt(stylesCanvasContainer.getPropertyValue('height'));

    let mouse = { x: 0, y: 0 };

    nodeCanvas.addEventListener('mousemove', function (e) {
      mouse.x = e.pageX - this.offsetLeft;
      mouse.y = e.pageY - this.offsetTop;
    }, false);

    ctx.lineWidth = 3;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#00CC99';

    nodeCanvas.addEventListener('mousedown', function (e) {
      ctx.beginPath();
      ctx.moveTo(mouse.x, mouse.y);

      nodeCanvas.addEventListener('mousemove', onPaint, false);
    }, false);

    nodeCanvas.addEventListener('mouseup', function () {
      nodeCanvas.removeEventListener('mousemove', onPaint, false);
    }, false);
  })

  return (
    <div ref={refCanvasContainer} className="App">
      <canvas ref={refCanvas}></canvas>
    </div>
  );
}

export default App;
