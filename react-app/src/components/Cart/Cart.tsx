import Modal from "../Modal/Modal.tsx";
import {useCart} from "../../store/CartContext.tsx";
import {IconButton} from "../IconButton/IconButton.tsx";
import CloseIcon from '@mui/icons-material/Close';

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
            {/*<button onClick={handleButtonClick}></button>*/}
            <IconButton onClick={handleButtonClick}>
                <CloseIcon />
            </IconButton>

        </div>

        <div className="cart-body">
            <div className="cart-items">
                <ul>
                    {
                        Array(5).fill("Item").map((item, i) => (
                            <li key={i}>{item} - {i}</li>
                        ))
                    }
                </ul>
            </div>
            <div className="cart-summary">
                <h3>Summary</h3>
                <div className="cart-summary-row">
                    <p>Subtotal</p>
                    <p>$123</p>
                </div>
                <div className="cart-summary-row">
                    <p>GST</p>
                    <p>10%</p>
                </div>

                <div className="cart-summary-row cart-total-row">
                    <p>Total</p>
                    <p>{`$${123 * 1.1}`}</p>
                </div>

                <button onClick={handleButtonClick} className="cart-checkout-button">Checkout</button>

            </div>
        </div>
    </Modal>
}