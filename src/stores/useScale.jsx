import { create } from 'zustand';

const useScale = create((set) => ({
  root: 'D',
  key: 'Major Pentatonic',
  setRoot: (root) => set({ root }),
  setKey: (key) => set({ key }),
}));

export default useScale;
