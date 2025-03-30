import {useEffect, useRef} from "react";
import "./modal.css";

interface ModalProps {
    open: boolean;
    className?: string;
    children?: React.ReactNode;
}

const Modal = ({open, className = "", children}: ModalProps) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const modal = dialogRef.current as HTMLDialogElement;

        if (open && modal) {
            modal.showModal();
        }

        return () => modal.close();
    }, [open])

    return (
        <dialog ref={dialogRef} className={`modal ${className}`}>
            {children}

        </dialog>
    )
}

export default Modal;