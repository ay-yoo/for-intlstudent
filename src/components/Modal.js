function Modal({ isOpen, title, onClose, children }) {
  if (!isOpen) return null;
  return (
    <div>
      <h1>{title}</h1>
      {children}
      <button onClick={onClose}>닫기</button>
    </div>
  );
}

export default Modal;
