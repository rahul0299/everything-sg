import React, {createContext, useReducer, useContext, ReactNode} from 'react';
import { reducer, initialState, CartContextState, Action } from './cart-reducer';
import Modal from "../components/Modal/Modal.tsx";

import "./cart.css";

interface CartContextType {
    state: CartContextState;
    dispatch: React.Dispatch<Action>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

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

export const Cart = () => {
    const context = useContext(CartContext);


    // DESIGN INSPIRATIONS
    // https://dribbble.com/shots/21752241-Shopping-Cart
    // https://dribbble.com/shots/22369270-Shopping-cart-exercise

    const handleButtonClick = () => context?.dispatch({
        type: "HIDE_CART",
        payload: ""
    })

    console.log(context?.state.isOpen);

    return <Modal open={context?.state.isOpen || false} className="cart">
        <div className="cart-header">
            <h3>Your Cart</h3>
        </div>
        <div className="cart-items">
            <ul>
                {
                    Array(5).fill("Item").map((item, i) => (
                        <li key={i}>{item} - {i}</li>
                    ))
                }
            </ul>

        </div>
        <div className="cart-footer">
            <button onClick={handleButtonClick}>Close</button>
            <button onClick={handleButtonClick}>Checkout</button>
        </div>
    </Modal>
}