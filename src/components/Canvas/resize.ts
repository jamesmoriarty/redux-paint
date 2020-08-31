export const handleResize = (refCanvas: React.RefObject<HTMLCanvasElement>) => {
  if (refCanvas.current == null) return;

  const parentNode = refCanvas.current.parentNode as HTMLDivElement;

  refCanvas.current.width = parseInt(
    getComputedStyle(parentNode).getPropertyValue("width")
  );
  refCanvas.current.height = parseInt(
    getComputedStyle(parentNode).getPropertyValue("height")
  );
};
