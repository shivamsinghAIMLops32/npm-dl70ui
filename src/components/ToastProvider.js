import React, { useState, useCallback, createContext, useContext } from "react";
import Toast from "./Toast";

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children, defaultPosition = "top-right" }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(
    (message, options = {}) => {
      const id = Date.now() + Math.random();
      const toast = {
        id,
        message,
        type: options.type || "info",
        duration: options.duration !== undefined ? options.duration : 3000,
        position: options.position || defaultPosition,
        showCloseButton:
          options.showCloseButton !== undefined
            ? options.showCloseButton
            : true,
        pauseOnHover:
          options.pauseOnHover !== undefined ? options.pauseOnHover : true,
        icon: options.icon || null,
        className: options.className || "",
        ...options,
      };

      setToasts((prevToasts) => [...prevToasts, toast]);

      // Auto-remove toast if duration is set
      if (toast.duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, toast.duration + 300); // Add extra time for animation
      }

      return id;
    },
    [defaultPosition]
  );

  const removeToast = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  const removeAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  // Convenience methods
  const success = useCallback(
    (message, options = {}) => {
      return addToast(message, { ...options, type: "success" });
    },
    [addToast]
  );

  const error = useCallback(
    (message, options = {}) => {
      return addToast(message, { ...options, type: "error" });
    },
    [addToast]
  );

  const warning = useCallback(
    (message, options = {}) => {
      return addToast(message, { ...options, type: "warning" });
    },
    [addToast]
  );

  const info = useCallback(
    (message, options = {}) => {
      return addToast(message, { ...options, type: "info" });
    },
    [addToast]
  );

  const value = {
    addToast,
    removeToast,
    removeAllToasts,
    success,
    error,
    warning,
    info,
    toasts,
  };

  // Group toasts by position
  const toastsByPosition = toasts.reduce((acc, toast) => {
    const position = toast.position;
    if (!acc[position]) {
      acc[position] = [];
    }
    acc[position].push(toast);
    return acc;
  }, {});

  return (
    <ToastContext.Provider value={value}>
      {children}
      {Object.entries(toastsByPosition).map(([position, positionToasts]) => (
        <div
          key={position}
          className={`toast-container toast-container--${position}`}
        >
          {positionToasts.map((toast) => (
            <Toast
              key={toast.id}
              message={toast.message}
              type={toast.type}
              duration={0} // We handle duration in the provider
              position={toast.position}
              onClose={() => removeToast(toast.id)}
              showCloseButton={toast.showCloseButton}
              pauseOnHover={toast.pauseOnHover}
              icon={toast.icon}
              className={toast.className}
            />
          ))}
        </div>
      ))}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
