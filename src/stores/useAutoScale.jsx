import { create } from 'zustand';

const useAutoScale = create((set) => ({
  autoScale: true,
  toggleAutoScale: () => set((state) => ({ autoScale: !state.autoScale })),
}));

export default useAutoScale;
