import { createPortal } from "react-dom";
function Modal({ isOpen, onClose, children }) {
  if (!isOpen) {
    return null;
  }
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Content */}
      <div className="relative bg-white rounded-xl p-6 shadow-xl w-[400px]">
        {children}
      </div>
    </div>,
    document.body,
  );
}
export default Modal;
