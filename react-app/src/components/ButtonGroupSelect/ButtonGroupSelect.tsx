import "./buttongroupselect.css";
import {useState} from "react";

interface PropTypes {
    items: string[];
    onChange?: (items: string[]) => void;
}

const ButtonGroupSelect = ({ items, onChange }: PropTypes) => {
    const [selected, setSelected] = useState<string[]>([]);

    const toggleButton = (item: string) => {
        let newSelected: string[];

        if (selected.includes(item)) {
            newSelected = selected.filter(i => i !== item);
        } else {
            newSelected = [...selected, item];
        }

        setSelected(newSelected);
        onChange?.(newSelected);
    };

    console.log(selected);
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


export default ButtonGroupSelect;