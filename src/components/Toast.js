import React, { useState, useEffect, useRef } from "react";
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
  // New enhanced props
  actions = [],
  isLoading = false,
  animation = "slide",
  theme = "auto",
  sound = false,
  swipeToDismiss = true,
  richContent = false,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const toastRef = useRef(null);
  const audioRef = useRef(null);

  // Auto-detect dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (theme === "auto") {
      const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
      setIsDarkMode(darkModeQuery.matches);

      const handleChange = (e) => setIsDarkMode(e.matches);
      darkModeQuery.addEventListener("change", handleChange);

      return () => darkModeQuery.removeEventListener("change", handleChange);
    } else {
      setIsDarkMode(theme === "dark");
    }
  }, [theme]);

  // Play sound effect
  useEffect(() => {
    if (sound && type !== "loading") {
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      const frequencies = {
        success: 800,
        error: 300,
        warning: 600,
        info: 500,
      };

      oscillator.frequency.setValueAtTime(
        frequencies[type] || 500,
        audioContext.currentTime
      );
      oscillator.type = "sine";
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.2
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
    }
  }, [sound, type]);

  useEffect(() => {
    if (duration === 0 || isLoading) return; // Don't auto-close if duration is 0 or loading

    let timer;
    if (!isPaused) {
      timer = setTimeout(() => {
        handleClose();
      }, duration);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [duration, isPaused, isLoading]);

  const handleClose = () => {
    if (isRemoving) return;
    setIsRemoving(true);
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

  // Touch/Swipe handlers
  const handleTouchStart = (e) => {
    if (!swipeToDismiss) return;
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !swipeToDismiss) return;
    const touchX = e.touches[0].clientX;
    setCurrentX(touchX - startX);
  };

  const handleTouchEnd = () => {
    if (!isDragging || !swipeToDismiss) return;
    setIsDragging(false);

    if (Math.abs(currentX) > 100) {
      handleClose();
    } else {
      setCurrentX(0);
    }
  };

  // Mouse drag handlers (for desktop)
  const handleMouseDown = (e) => {
    if (!swipeToDismiss) return;
    setStartX(e.clientX);
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !swipeToDismiss) return;
    setCurrentX(e.clientX - startX);
  };

  const handleMouseUp = () => {
    if (!isDragging || !swipeToDismiss) return;
    setIsDragging(false);

    if (Math.abs(currentX) > 100) {
      handleClose();
    } else {
      setCurrentX(0);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const getIcon = () => {
    if (icon) return icon;
    if (isLoading) return <LoadingSpinner />;

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

  const LoadingSpinner = () => (
    <div className="toast__spinner">
      <div className="toast__spinner-circle"></div>
    </div>
  );

  if (!isVisible) return null;

  const toastClasses = [
    "toast",
    `toast--${type}`,
    `toast--${position}`,
    `toast--${animation}`,
    isDarkMode ? "toast--dark" : "toast--light",
    isVisible ? "toast--show" : "",
    isDragging ? "toast--dragging" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const toastStyle = {
    transform: isDragging ? `translateX(${currentX}px)` : "",
    opacity: isDragging ? Math.max(0.3, 1 - Math.abs(currentX) / 200) : 1,
  };

  return (
    <div
      ref={toastRef}
      className={toastClasses}
      style={toastStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      role="alert"
      aria-live="polite"
      tabIndex={0}
    >
      <div className="toast__icon">{getIcon()}</div>
      <div className="toast__content">
        <div className="toast__message">
          {richContent
            ? message
            : typeof message === "string"
            ? message
            : String(message)}
        </div>
        {actions.length > 0 && (
          <div className="toast__actions">
            {actions.map((action, index) => (
              <button
                key={index}
                className={`toast__action ${action.style || "primary"}`}
                onClick={() => {
                  if (action.onClick) action.onClick();
                  if (action.closeOnClick !== false) handleClose();
                }}
                disabled={action.disabled || isLoading}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
      {showCloseButton && !isLoading && (
        <button
          className="toast__close"
          onClick={handleClose}
          aria-label="Close notification"
        >
          ×
        </button>
      )}
      {duration > 0 && !isLoading && (
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
