const keys = [
  {
    key: "Major",
    intervals: [2, 2, 1, 2, 2, 2]
  },
  {
    key: "Minor",
    intervals: [2, 1, 2, 2, 1, 2]
  },
  {
    key: "Major Pentatonic",
    intervals: [2, 2, 3, 2]
  },
  {
    key: "Minor Pentatonic",
    intervals: [3, 2, 2, 3]
  }
]

const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

const scales = notes.map((note, index) => {
  const scale = [];
  keys.forEach((key) => {
    const newScale = [note];
    let i = index;
    key.intervals.forEach((interval) => {
      i += interval;
      newScale.push(notes[i % notes.length]);
    });
    scale.push({
      name: key.key,
      notes: newScale
    });
  });
  return {
    root: note,
    keys: scale
  };
})

export default scales