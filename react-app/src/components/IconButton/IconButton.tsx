import "./iconbutton.css";
import {ButtonHTMLAttributes, PropsWithChildren} from "react";

type PropsType = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;

export const IconButton = (props: PropsType) => {

    return <button className="icon-button" {...props}>
        {props.children}
    </button>
}