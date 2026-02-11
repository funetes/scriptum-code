export const formatTime = (seconds: number) => {
  const absSeconds = Math.round(Math.abs(seconds));
  const h = Math.floor(absSeconds / 3600);
  const m = Math.floor((absSeconds % 3600) / 60);
  const s = Math.floor(absSeconds % 60);

  const paddedM = m.toString().padStart(2, "0");
  const paddedS = s.toString().padStart(2, "0");

  if (h > 0) {
    const paddedH = h.toString().padStart(2, "0");
    return `${paddedH}:${paddedM}:${paddedS}`;
  } else if (m > 0) {
    return `${paddedM}:${paddedS}`;
  } else {
    return `00:${paddedS}`;
  }
};
