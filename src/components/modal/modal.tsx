import { ReactNode, useEffect } from "react";
import s from './modal.module.css';


type TModalProps = {
    children: ReactNode;
    onClose: () => void;
};

const Modal: React.FC<TModalProps> = ({ children, onClose }) => {

    useEffect(() => {
        const onCloseEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', onCloseEsc);
        return () => {
            document.removeEventListener('keydown', onCloseEsc);
        }
    });

    return (
            <div className={s.overlay} onClick={() => onClose()}>
                <div className={s.modal} onClick={(e) => e.stopPropagation()}>
                    {children}
                </div>
            </div>
        )
};

export default Modal;