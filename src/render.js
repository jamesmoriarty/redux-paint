import { OP_TYPE_RECT, OP_TYPE_GESTURE } from "./constants";

export const render = (refCanvas, history) => {
  // eslint-disable-next-line
  refCanvas.current.width = refCanvas.current.width;

  const ctx = refCanvas.current.getContext("2d");

  for (const op of history) {
    const { type, strokeStyle, x: x1, y: y1 } = op[0];

    ctx.strokeStyle = strokeStyle;
    ctx.fillStyle = strokeStyle;

    switch (type) {
      case OP_TYPE_RECT:
        const [{ x: x2, y: y2 }, ...rest] = op.slice().reverse();
        ctx.beginPath();
        ctx.fillRect(x1, y1, (x1 - x2) * -1, (y1 - y2) * -1);
        ctx.stroke();
        break;
      case OP_TYPE_GESTURE:
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        for (const { x: x2, y: y2 } of op) {
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
        break;
      default:
        throw new Error("unknown op: ", op);
    }
  }
}
