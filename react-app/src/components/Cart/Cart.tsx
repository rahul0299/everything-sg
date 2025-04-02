import Modal from "../Modal/Modal.tsx";
import {useCart} from "../../store/CartContext.tsx";

export const Cart = () => {
    const context = useCart();


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