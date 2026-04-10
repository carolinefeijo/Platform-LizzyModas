// import { BsXCircleFill } from "react-icons/bs";
import "./styles.css";

function Modal({
  children,
  // onClose,
  visible,
  title,
}: {
  children: React.ReactNode;
  onClose: () => void;
  visible: boolean;
  title?: string;
}) {
  if (!visible) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* <div className="modal-close-wrapper" onClick={onClose}>
          <BsXCircleFill size={22} color="#000" />
        </div> */}
        <h2 className="title">{title}</h2>
        {children}
      </div>
    </div>
  );
}

export default Modal;
