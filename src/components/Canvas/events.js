import { opCreate, opUpdate } from "./../../redux/actions";

export const handleOp = (
  dispatch,
  state,
  setState,
  refCanvas,
  type,
  strokeStyle,
  event
) => {
  switch (event.type) {
    case "mousedown":
      setState({ mouseDown: true });

      return dispatch(
        opCreate(
          type,
          strokeStyle,
          event.pageX - refCanvas.current.offsetLeft,
          event.pageY - refCanvas.current.offsetTop
        )
      );
    case "mousemove":
      if (state.mouseDown) {
        return dispatch(
          opUpdate(
            event.pageX - refCanvas.current.offsetLeft,
            event.pageY - refCanvas.current.offsetTop
          )
        );
      }
      return;
    case "mouseup":
      return setState({ mouseDown: false });
    default:
      throw new Error("unknown event.type: ", event.type);
  }
};
