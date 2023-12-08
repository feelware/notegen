const extendScale = (scale, octaves) => {
  const newScale = [];
  for (let i = octaves[0]; i <= octaves[1]; i++) {
    scale.forEach((note) => {
      newScale.push(`${note}${i}`);
    });
  }
  return newScale;
}

export default extendScale;