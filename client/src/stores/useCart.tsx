import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type CartStore = {
  showCart: boolean;
  toggleShowCart: () => void;
};

export const useCart = create<CartStore>()(
  devtools((set) => ({
    showCart: false,
    toggleShowCart: () => set((state) => ({ showCart: !state.showCart })),
  })),
);
