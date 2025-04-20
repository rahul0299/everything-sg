import { CartBookingItem } from "../../types/booking.tsx";
import { useCart } from "../../store/CartContext";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./cartitem.css";
import {useState} from "react";
import {Chip, MenuItem, Select} from "@mui/material";

interface Props {
    item: CartBookingItem;
}


const CartItem = ({ item }: Props) => {
    const { updateQuantity, removeFromCart } = useCart();
    const [isEditing, setIsEditing] = useState(false);
    const [tempQty, setTempQty] = useState(item.quantity);

    const handleSave = () => {
        updateQuantity({...item, quantity: tempQty});
        setIsEditing(false);
    };

    const options = Array.from({length: item.category === "movie" ? 10 : 4}, (_, i) => i + 1);

    return (
        <div className="cart-item">
            <div className="cart-item-details">
                <h3 className="cart-item-title">
                    {item.name}
                    <Chip
                        variant="outlined"
                        size="small"
                        sx={{ fontSize: 10, marginLeft: "10px" }}
                        label={item.category.toUpperCase()}
                    />
                </h3>
                <p className="cart-item-subtext">Venue: {item.venue}</p>
                <p className="cart-item-subtext">Date: {item.session.date}</p>
                <p className="cart-item-subtext">Time: {item.session.time}</p>

                {isEditing ? (
                    <div className="cart-item-select">
                        <label>Quantity:</label>
                        <Select
                            sx={{ width: "100px", margin: "0 20px" }}
                            variant="standard"
                            size="small"
                            MenuProps={{
                                disablePortal: true,
                                sx: {
                                    zIndex: 2,
                                }
                            }}
                            value={tempQty}
                            onChange={(e) => setTempQty(Number(e.target.value))}
                        >
                            {options.map((q) => (
                                <MenuItem key={`${item.id}-${q}`} value={q}>
                                    {q}
                                </MenuItem>
                            ))}
                        </Select>
                        <button onClick={handleSave}>Save</button>
                    </div>
                ) : (
                    <div className="cart-item-meta">
                        <p className="cart-item-subtext">Quantity: {item.quantity}</p>
                        <button
                            className="edit-btn"
                            onClick={() => setIsEditing(true)}
                            title="Edit quantity"
                        >
                            <EditIcon fontSize="small" />
                            <span>Edit</span>
                        </button>
                    </div>
                )}
            </div>

            <div className="cart-item-remove">
                <button
                    onClick={() => removeFromCart(item.id)}
                    title="Remove"
                >
                    <DeleteIcon />
                </button>
            </div>
        </div>
    );
};

export default CartItem;

