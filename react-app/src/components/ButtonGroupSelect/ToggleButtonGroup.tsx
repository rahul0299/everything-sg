import "./togglebuttongroup.css";
import {useState} from "react";

interface PropTypes {
    items: string[];
}

const ToggleButtonGroup = ({ items }: PropTypes) => {
    const [selected, setSelected] = useState<string[]>([]);

    const toggleButton = (item: string) => {
        if (selected.includes(item)) {
            setSelected(prevState => prevState.filter(i => i !== item));
        } else {
            setSelected([...selected, item]);
        }
    }

    console.log(items);
    return <div className="toggle-button-group">
        {items.map(item => (
            <button
                key={item}
                className={`toggle-button ${selected.includes(item) ? "toggle-button-selected" : ""}`}
                onClick={() => toggleButton(item)}>
                {item}
            </button>
        ))}
    </div>

}


export default ToggleButtonGroup;