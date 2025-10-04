import React, { useState, useEffect } from "react";
import "./Toast.css";

const Toast = ({
  message,
  type = "info",
  duration = 3000,
  position = "top-right",
  onClose,
  showCloseButton = true,
  pauseOnHover = true,
  icon = null,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (duration === 0) return; // Don't auto-close if duration is 0

    let timer;
    if (!isPaused) {
      timer = setTimeout(() => {
        handleClose();
      }, duration);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [duration, isPaused]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      if (onClose) onClose();
    }, 300); // Wait for animation to complete
  };

  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      setIsPaused(false);
    }
  };

  const getIcon = () => {
    if (icon) return icon;

    switch (type) {
      case "success":
        return "✓";
      case "error":
        return "✕";
      case "warning":
        return "⚠";
      case "info":
      default:
        return "ℹ";
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className={`toast toast--${type} toast--${position} ${className} ${
        isVisible ? "toast--show" : ""
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="alert"
      aria-live="polite"
    >
      <div className="toast__icon">{getIcon()}</div>
      <div className="toast__message">{message}</div>
      {showCloseButton && (
        <button
          className="toast__close"
          onClick={handleClose}
          aria-label="Close notification"
        >
          ×
        </button>
      )}
      {duration > 0 && (
        <div
          className={`toast__progress ${
            isPaused ? "toast__progress--paused" : ""
          }`}
          style={{ animationDuration: `${duration}ms` }}
        />
      )}
    </div>
  );
};

export default Toast;
