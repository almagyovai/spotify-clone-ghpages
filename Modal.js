import React, { useRef, useEffect } from "react";

const NotificationmodalStyle = {
  position: "absolute",
  top: "64px",
  right: "20px",
  width: "190px",
  padding: "5px 5px",
  backgroundColor: "#666666",
  color: "#fff",
  fontSize: "14px",
  lineHeight: "1",
  borderRadius: "5px",
  zIndex: "1000",
};

function Modal({ open, children, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div style={NotificationmodalStyle} ref={modalRef}>
      {children}
    </div>
  );
}

export default Modal;
