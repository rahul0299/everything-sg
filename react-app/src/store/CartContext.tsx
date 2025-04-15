import {createContext, useContext, useState, ReactNode, useEffect} from "react";
import "../components/Cart/cart.css";
import {CartBookingItem} from "../types/booking.tsx";
import {fetchCart} from "../dummy/server.ts";

interface CartContextType {
    cart: CartContextState;
    showCart: () => void;
    hideCart: () => void;
    addToCart: (item: CartBookingItem) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
    updateQuantity: (id: string, quantity: number) => void;
}

interface CartContextState {
    isOpen: boolean;
    items: CartBookingItem[];
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartContextState>({
        isOpen: false,
        items: [],
    });

    useEffect(() => {
        refreshCart()
    }, [cart.items]);

    function refreshCart() {
        fetchCart()
            .then((cartItems) => {
                setCart((prevState) => {
                    return {...prevState, items: cartItems} as CartContextState;
                })
            });
    }

    const showCart = () => {
        refreshCart();

        setCart(prevState => {return {...prevState, isOpen: true}});
    }

    const hideCart = () => {
        setCart(prevState => {return {...prevState, isOpen: false}});
    }

    const addToCart = (item: CartBookingItem) => {
        console.log("ADD TO CART", item);
    };

    const removeFromCart = (id: string) => {
        console.log("REMOVE ITEM", id);
    };

    const updateQuantity = (id: string, quantity: number) => {
         console.log("UPDATE QUANTITY", id, quantity);
    };

    const clearCart = () => setCart(prev => {
        return {
            isOpen: prev.isOpen,
            items: []
        }
    });

    return (
        <CartContext.Provider value={{ cart, showCart,hideCart, addToCart, removeFromCart, clearCart, updateQuantity }}>
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
