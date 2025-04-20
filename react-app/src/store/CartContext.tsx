import {createContext, useContext, useState, ReactNode, useEffect} from "react";
import "../components/Cart/cart.css";
import {CartBookingItem} from "../types/booking.tsx";
import {API} from "../config.ts";
import {useAuth} from "./AuthContext.tsx";

interface CartContextType {
    cart: CartContextState;
    showCart: () => void;
    hideCart: () => void;
    addToCart: (item: CartBookingItem) => Promise<string>;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
    updateQuantity: (item: CartBookingItem) => void;
}

interface CartContextState {
    isOpen: boolean;
    items: CartBookingItem[];
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const user = useAuth();
    const [cart, setCart] = useState<CartContextState>({
        isOpen: false,
        items: [],
    });

    const refreshCart = async () => {
        if (!user) return;

        try {
            const res = await fetch(API.CART.GET, {
                credentials: 'include',
            });

            if (res.ok && res.status === 200) {
                const cartItems = await res.json();

                if (cartItems.message) {
                    throw new Error(cartItems.message);
                }

                setCart(prevState => {
                    return {
                        isOpen: prevState.isOpen,
                        items: cartItems
                    }
                });
            } else {
                setCart(prevState => {
                    return {
                        isOpen: prevState.isOpen,
                        items: []
                    }
                });
            }
        } catch (error) {
            console.log("Error fetching cart items: ", error);
            setCart(prevState => {
                return {
                    isOpen: prevState.isOpen,
                    items: []
                }
            });
        }
    };

    useEffect(() => {
        refreshCart().then();
    }, []);

    const showCart = () => {
        refreshCart().then();

        setCart(prevState => {return {...prevState, isOpen: true}});
    }

    const hideCart = () => {
        setCart(prevState => {return {...prevState, isOpen: false}});
    }

    const addToCart = async (item: CartBookingItem) => {
        try {
            const res = await fetch(API.CART.ADD, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item),
                signal: AbortSignal.timeout(1000)
            });

            if (!res.ok || res.status !== 200) {
                throw new Error('Failed adding item to cart. Please try again.');
            }

            return "Success";
        } catch (err: unknown) {
            throw new Error("Failed to login: " + err + ". Please try again.");
        }
    };

    const removeFromCart = (id: string) => {
        console.log("REMOVE ITEM", id);
    };

    const updateQuantity = (item: CartBookingItem) => {
         console.log("UPDATE QUANTITY", item);
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
