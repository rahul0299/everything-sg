import React, {createContext, useReducer, useContext, ReactNode} from 'react';
import { reducer, initialState, CartContextState, Action } from './cart-reducer';

import "../components/Cart/cart.css";

interface CartContextType {
    state: CartContextState;
    dispatch: React.Dispatch<Action>;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useStore must be used within a CartProvider');
    }
    return context;
};