import { create } from 'zustand';

type OrderItem = {
    id: string;
    type?: string;
    oldPrice?: string;
    newPrice: string;
    size42?: string;
    selectedSize: number;
    quantity?: number;
    price?: string | { pricePizza: string; price: number; volume: string };
    volume?: string;
    selectTopping?: { price: string }[];
}

type OrderState = {
    orders: OrderItem[];
    setOrders: (orderItem: OrderItem) => void;
    removeOrder: (orederItem: OrderItem) => void;
    clearOrders: () => void;
    increaseQuantity: (orderItem: OrderItem) => void;
    decreaseQuantity: (orderItem: OrderItem) => void;
    // calculateTotal: () => {totalAmount: string; totalDiscount: string};
    totalItems: () => void;
    getPriceForPizza: (item: OrderItem) => { pricePizza: string; price: number; volume: string };
    confirmOrder: () => void;
}

export const useOrderStore = create<OrderState>((set, get) => ({
    orders: [],
    setOrders: (orderItem) =>
        set((state) => {
            const existingOrder = state.orders.find(
                (item) => item.id === orderItem.id && item.selectedSize === orderItem.selectedSize
            );
            if (existingOrder) {
                return {
                    orders: state.orders.map((item) =>
                        item.id === orderItem.id && item.selectedSize === orderItem.selectedSize
                            ? { ...item, quantity: (item.quantity || 1) + 1 }
                            : item
                    )
                }
            }
            return { orders: [...state.orders, { ...orderItem, quantity: 1 }] };
        }),
    getPriceForPizza: (item) => {
        const basePrice = item.selectedSize === 42 ? item.size42 || '0' : item.newPrice || '0';
        const pricePizza = (parseFloat(basePrice.replace('$', '')));

        const priceString = typeof item.price === 'string' ? item.price : '0';

        return {
            pricePizza,
        }
    },

    totalItems: () => get().orders.reduce((total, item) => total + (item.quantity || 0), 0),

    removeOrder: (orderItem) =>
        set((state) => ({
            orders: state.orders.filter(
                (item) =>
                    !(item.id === orderItem.id && item.selectedSize === orderItem.selectedSize)
            )
        })),


    clearOrders: () => set({ orders: [] }),

    confirmOrder: () => set({ orders: [] }),

    increaseQuantity: (orderItem) =>
        set((state) => ({
            orders: state.orders.map((item) =>
                item.id === orderItem.id && item.selectedSize === orderItem.selectedSize
                    ? { ...item, quantity: (item.quantity || 1) + 1 }
                    : item
            )
        })),

    decreaseQuantity: (orderItem) =>
        set((state) => ({
            orders: state.orders
                .map((item) => {
                    if (item.id === orderItem.id && item.selectedSize === orderItem.selectedSize) {
                        const newQuantity = (item.quantity || 1) - 1;
                        return { ...item, quantity: newQuantity >= 0 ? newQuantity : 0 };
                    }
                    return item;
                }
                ),
        })),
}));

export default useOrderStore;