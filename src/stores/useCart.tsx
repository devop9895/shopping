import { create } from 'zustand';

type CartStore = {
  showCart: boolean;
  toggleShowCart: () => void;
};

export const useCart = create<CartStore>((set) => ({
  showCart: false,
  toggleShowCart: () => set((state) => ({ showCart: !state.showCart })),
}));
