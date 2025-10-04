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

export const ToastProvider = ({
  children,
  defaultPosition = "top-right",
  maxToasts = 5,
  defaultDuration = 3000,
  defaultAnimation = "slide",
  defaultTheme = "auto",
  enableSounds = false,
  swipeToDismiss = true,
}) => {
  const [toasts, setToasts] = useState([]);
  const [toastQueue, setToastQueue] = useState([]);

  const addToast = useCallback(
    (message, options = {}) => {
      const id = Date.now() + Math.random();
      const toast = {
        id,
        message,
        type: options.type || "info",
        duration:
          options.duration !== undefined ? options.duration : defaultDuration,
        position: options.position || defaultPosition,
        showCloseButton:
          options.showCloseButton !== undefined
            ? options.showCloseButton
            : true,
        pauseOnHover:
          options.pauseOnHover !== undefined ? options.pauseOnHover : true,
        icon: options.icon || null,
        className: options.className || "",
        // Enhanced options
        actions: options.actions || [],
        isLoading: options.isLoading || false,
        animation: options.animation || defaultAnimation,
        theme: options.theme || defaultTheme,
        sound: options.sound !== undefined ? options.sound : enableSounds,
        swipeToDismiss:
          options.swipeToDismiss !== undefined
            ? options.swipeToDismiss
            : swipeToDismiss,
        richContent: options.richContent || false,
        ...options,
      };

      setToasts((prevToasts) => {
        // Check if we're at the max limit
        if (prevToasts.length >= maxToasts) {
          // Add to queue
          setToastQueue((prev) => [...prev, toast]);
          return prevToasts;
        }
        return [...prevToasts, toast];
      });

      // Auto-remove toast if duration is set and not loading
      if (toast.duration > 0 && !toast.isLoading) {
        setTimeout(() => {
          removeToast(id);
        }, toast.duration + 300); // Add extra time for animation
      }

      return id;
    },
    [
      defaultPosition,
      maxToasts,
      defaultDuration,
      defaultAnimation,
      defaultTheme,
      enableSounds,
      swipeToDismiss,
    ]
  );

  const removeToast = useCallback(
    (id) => {
      setToasts((prevToasts) => {
        const newToasts = prevToasts.filter((toast) => toast.id !== id);

        // If there are queued toasts and we now have space, add one
        if (newToasts.length < maxToasts && toastQueue.length > 0) {
          const nextToast = toastQueue[0];
          setToastQueue((prev) => prev.slice(1));

          // Auto-remove the new toast if it has duration
          if (nextToast.duration > 0 && !nextToast.isLoading) {
            setTimeout(() => {
              removeToast(nextToast.id);
            }, nextToast.duration + 300);
          }

          return [...newToasts, nextToast];
        }

        return newToasts;
      });
    },
    [maxToasts, toastQueue]
  );

  const removeAllToasts = useCallback(() => {
    setToasts([]);
    setToastQueue([]);
  }, []);

  const updateToast = useCallback((id, updates) => {
    setToasts((prevToasts) =>
      prevToasts.map((toast) =>
        toast.id === id ? { ...toast, ...updates } : toast
      )
    );
  }, []);

  // Enhanced convenience methods
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

  const loading = useCallback(
    (message, options = {}) => {
      return addToast(message, {
        ...options,
        type: "loading",
        isLoading: true,
        duration: 0, // Don't auto-dismiss loading toasts
        showCloseButton: false,
      });
    },
    [addToast]
  );

  // Promise integration
  const promise = useCallback(
    (promiseOrFunction, options = {}) => {
      const {
        loading: loadingMessage = "Loading...",
        success: successMessage = "Success!",
        error: errorMessage = "Something went wrong!",
      } = options;

      // Show loading toast
      const loadingId = loading(loadingMessage, options);

      // Handle the promise
      const handlePromise = async (promiseToHandle) => {
        try {
          const result = await promiseToHandle;

          // Remove loading toast and show success
          removeToast(loadingId);
          success(
            typeof successMessage === "function"
              ? successMessage(result)
              : successMessage,
            options
          );

          return result;
        } catch (err) {
          // Remove loading toast and show error
          removeToast(loadingId);
          error(
            typeof errorMessage === "function"
              ? errorMessage(err)
              : errorMessage,
            options
          );

          throw err;
        }
      };

      // If it's a function, call it and handle the returned promise
      if (typeof promiseOrFunction === "function") {
        return handlePromise(promiseOrFunction());
      }

      // Otherwise handle the promise directly
      return handlePromise(promiseOrFunction);
    },
    [addToast, removeToast, loading, success, error]
  );

  const value = {
    addToast,
    removeToast,
    removeAllToasts,
    updateToast,
    success,
    error,
    warning,
    info,
    loading,
    promise,
    toasts,
    queueCount: toastQueue.length,
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
