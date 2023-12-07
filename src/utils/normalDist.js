const normalDist = (mean, deviation, elements) => {
  const raw = elements.map((element, index) => ({
    ...element,
    prob: Math.exp(-((index - mean) ** 2) / (2 * deviation ** 2)),
  }));
  const total = raw.reduce((acc, element) => acc + element.prob, 0);
  return raw.map((element) => ({ ...element, prob: element.prob / total }));
};

export default normalDist