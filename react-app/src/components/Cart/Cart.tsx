import Modal from "../Modal/Modal.tsx";
import {useCart} from "../../store/CartContext.tsx";
import {IconButton} from "../IconButton/IconButton.tsx";
import CloseIcon from '@mui/icons-material/Close';
import CartItem from "../CartItem/CartItem.tsx";
import {Badge, Stack} from "@mui/material";
import {useNavigate} from "react-router";

export const Cart = () => {
    const cart = useCart();
    const navigate = useNavigate();


    const closeCart = () => {
        cart.hideCart();
    }

    const handleCheckoutClick =() => {
        cart.hideCart();
        navigate("/checkout");
    }

    const subTotal = cart.cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);


    return <Modal open={cart?.cart.isOpen || false} className="cart">
        <div className="cart-header">
            <h3>Your Cart</h3>
            <IconButton onClick={closeCart}>
                <CloseIcon />
            </IconButton>

        </div>

        <div className="cart-body">
            <div className="cart-items">
                {
                    cart.cart.items.map((item, index) => (<CartItem key={`cart-${index}-${item.id}`} item={item} />))
                }
            </div>
            <div className="cart-summary">
                <h3>Summary</h3>
                <div className="cart-summary-row">
                    <p>Subtotal</p>
                    <p>{subTotal.toFixed(2)} SGD</p>
                </div>
                <div className="cart-summary-row">
                    <p>GST</p>
                    <p>10%</p>
                </div>

                <div className="cart-summary-row cart-total-row">
                    <p>Total</p>
                    <p>{`${(subTotal * 1.1).toFixed(2)}`} SGD</p>
                </div>

                <button onClick={handleCheckoutClick} className="cart-checkout-button">Checkout</button>

            </div>
        </div>
    </Modal>
}


const icon_svg_url = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXNob3BwaW5nLWNhcnQtaWNvbiBsdWNpZGUtc2hvcHBpbmctY2FydCI+PGNpcmNsZSBjeD0iOCIgY3k9IjIxIiByPSIxIi8+PGNpcmNsZSBjeD0iMTkiIGN5PSIyMSIgcj0iMSIvPjxwYXRoIGQ9Ik0yLjA1IDIuMDVoMmwyLjY2IDEyLjQyYTIgMiAwIDAgMCAyIDEuNThoOS43OGEyIDIgMCAwIDAgMS45NS0xLjU3bDEuNjUtNy40M0g1LjEyIi8+PC9zdmc+"

export const CartMenuBarButton = () => {
    const cartContext = useCart();

    return (
        <Stack>

            <Badge color="primary" showZero={false} badgeContent={cartContext.cart.items.length}>
                <button onClick={cartContext.showCart}
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "0.4rem",
                            padding: "0.5rem 1rem",
                        }}>
                    Cart
                    <img src={icon_svg_url}  alt="cart"/>
                </button>
            </Badge>

        </Stack>

    )
}