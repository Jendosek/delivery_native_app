import { create } from 'zustand';
import type { Item } from '../components/MockData';

type WishItem = Item & { quantity?: number };

type WishState = {
  orders: WishItem[];
  lastLikedItem: WishItem | null;
  isRemoveAction: boolean;
  wishlistVisible: boolean;

  openWishlist: () => void;
  closeWishlist: () => void;

  isItemLiked: (item: Item) => boolean;
  setOrdersWish: (orderItem: Item) => void;
  removeOrderWishItem: (orderItem: Item) => void;

  increaseQuantity: (orderItem: Item) => void;
  decreaseQuantity: (orderItem: Item) => void;

  getPriceForSize: (item: Item) => string;
};

export const useOrderWishStore = create<WishState>((set, get) => ({
  orders: [],
  lastLikedItem: null,
  isRemoveAction: false,
  wishlistVisible: false,

  openWishlist: () => set({ wishlistVisible: true }),
  closeWishlist: () => set({ wishlistVisible: false }),

  isItemLiked: (item) => {
    const state = get();
    return state.orders.some((o) => o.id === item.id && o.selectedSize === item.selectedSize);
  },

  setOrdersWish: (orderItem) =>
    set((state) => {
      const exists = state.orders.some(
        (o) => o.id === orderItem.id && o.selectedSize === orderItem.selectedSize
      );
      if (exists) return { ...state, lastLikedItem: orderItem };
      return {
        orders: [...state.orders, { ...orderItem, quantity: 1 }],
        lastLikedItem: orderItem,
      };
    }),

  removeOrderWishItem: (orderItem) =>
    set((state) => ({
      orders: state.orders.filter(
        (o) => !(o.id === orderItem.id && o.selectedSize === orderItem.selectedSize)
      ),
      isRemoveAction: true,
    })),

  increaseQuantity: (orderItem) =>
    set((state) => ({
      orders: state.orders.map((o) =>
        o.id === orderItem.id && o.selectedSize === orderItem.selectedSize
          ? { ...o, quantity: (o.quantity || 1) + 1 }
          : o
      ),
    })),

  decreaseQuantity: (orderItem) =>
    set((state) => ({
      orders: state.orders
        .map((o) => {
          if (o.id === orderItem.id && o.selectedSize === orderItem.selectedSize) {
            const q = (o.quantity || 1) - 1;
            return { ...o, quantity: q > 0 ? q : 0 };
          }
          return o;
        })
        .filter((o) => (o.quantity ?? 0) >= 0),
    })),

  getPriceForSize: (item) => {
    const priceStr = item.selectedSize === 42 ? item.size42 || '0' : item.newPrice || '0';
    return priceStr;
  },
}));

export default useOrderWishStore;
