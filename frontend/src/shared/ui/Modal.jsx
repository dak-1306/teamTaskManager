import { createPortal } from "react-dom";
function Modal({ isOpen, onClose, children, title }) {
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
      <div className="relative bg-white dark:bg-gray-700 rounded-xl p-6 shadow-xl w-[400px]">
        {title && (
          <h2 className="text-xl text-center font-semibold text-gray-800 dark:text-white mb-4">
            {title}
          </h2>
        )}
        {children}
      </div>
    </div>,
    document.body,
  );
}
export default Modal;
