import { createContext, useContext, useState, ReactNode } from "react";
import "../components/Cart/cart.css";
import {CartBookingItem} from "../types/booking.tsx";

interface CartContextType {
    cart: CartBookingItem[];
    addToCart: (item: CartBookingItem) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
    updateQuantity: (id: string, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartBookingItem[]>([]);

    const addToCart = (item: CartBookingItem) => {
        setCart(prev => {
            const exists = prev.find(i => i.id === item.id);
            if (exists) {
                return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i);
            } else {
                return [...prev, item];
            }
        });
    };

    const removeFromCart = (id: string) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const updateQuantity = (id: string, quantity: number) => {
        setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
    };

    const clearCart = () => setCart([]);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
