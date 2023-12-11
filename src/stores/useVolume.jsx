import { create } from 'zustand';

const useVolume = create((set) => ({
  volume: -18,
  setVolume: (volume) => set({ volume }),
}));

export default useVolume;
