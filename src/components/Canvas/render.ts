import { OpPayload, OpCreatePayload, OP_TYPES } from "../../constants";

export const handleRender = (
  refCanvas: React.RefObject<HTMLCanvasElement>,
  history: OpPayload[][]
) => {
  if (refCanvas.current == null) return;

  // eslint-disable-next-line
  refCanvas.current.width = refCanvas.current.width;

  const ctx = refCanvas.current.getContext("2d");

  if (ctx == null) return;

  for (const op of history) {
    const { type, color, x: x1, y: y1 } = op[0] as OpCreatePayload;

    ctx.strokeStyle = color;
    ctx.fillStyle = color;

    switch (type) {
      case OP_TYPES.OP_TYPE_RECT:
        // eslint-disable-next-line
        const [{ x: x2, y: y2 }, ...rest] = op.slice().reverse();
        ctx.beginPath();
        ctx.fillRect(x1, y1, (x1 - x2) * -1, (y1 - y2) * -1);
        ctx.stroke();
        break;
      case OP_TYPES.OP_TYPE_GESTURE:
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        for (const { x: x2, y: y2 } of op) {
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
        break;
      default:
        throw new Error("unknown op: " + type);
    }
  }
};
