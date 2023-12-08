import { create } from 'zustand';

const useScale = create((set) => ({
  root: 'C',
  key: 'Minor Pentatonic',
  setRoot: (root) => set({ root }),
  setKey: (key) => set({ key }),
}));

export default useScale;
