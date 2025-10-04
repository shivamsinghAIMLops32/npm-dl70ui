import React from "react";
import { ToastProvider, useToast } from "dl70-ui";

// Demo component that uses the toast
function ToastDemo() {
  const toast = useToast();

  const showToasts = () => {
    // Show different types of toasts
    toast.success("Success! Operation completed.");

    setTimeout(() => {
      toast.warning("Warning! Please check your input.");
    }, 500);

    setTimeout(() => {
      toast.error("Error! Something went wrong.");
    }, 1000);

    setTimeout(() => {
      toast.info("Info! Here's some useful information.");
    }, 1500);

    setTimeout(() => {
      toast.addToast("Custom toast with emoji!", {
        type: "success",
        icon: "🚀",
        duration: 5000,
        position: "bottom-center",
      });
    }, 2000);
  };

  const showPersistentToast = () => {
    toast.addToast("This toast stays until you close it!", {
      type: "info",
      duration: 0, // No auto-dismiss
      position: "top-center",
      icon: "📌",
    });
  };

  const showPositionedToasts = () => {
    const positions = [
      "top-left",
      "top-center",
      "top-right",
      "bottom-left",
      "bottom-center",
      "bottom-right",
    ];

    positions.forEach((position, index) => {
      setTimeout(() => {
        toast.addToast(`Toast at ${position}`, {
          type: index % 2 === 0 ? "success" : "info",
          position,
          duration: 3000,
        });
      }, index * 200);
    });
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <h1>DL70 UI Toast Demo</h1>

      <div style={{ marginBottom: "20px" }}>
        <h2>Basic Toast Types</h2>
        <button
          onClick={showToasts}
          style={{
            background: "#3b82f6",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
            marginRight: "10px",
          }}
        >
          Show Sequential Toasts
        </button>

        <button
          onClick={showPersistentToast}
          style={{
            background: "#10b981",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
            marginRight: "10px",
          }}
        >
          Show Persistent Toast
        </button>

        <button
          onClick={showPositionedToasts}
          style={{
            background: "#f59e0b",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Show All Positions
        </button>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h2>Individual Toast Types</h2>
        <button
          onClick={() => toast.success("Success message!")}
          style={{
            background: "#10b981",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "4px",
            cursor: "pointer",
            margin: "5px",
          }}
        >
          Success
        </button>

        <button
          onClick={() => toast.error("Error message!")}
          style={{
            background: "#ef4444",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "4px",
            cursor: "pointer",
            margin: "5px",
          }}
        >
          Error
        </button>

        <button
          onClick={() => toast.warning("Warning message!")}
          style={{
            background: "#f59e0b",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "4px",
            cursor: "pointer",
            margin: "5px",
          }}
        >
          Warning
        </button>

        <button
          onClick={() => toast.info("Info message!")}
          style={{
            background: "#3b82f6",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "4px",
            cursor: "pointer",
            margin: "5px",
          }}
        >
          Info
        </button>
      </div>

      <div>
        <h2>Actions</h2>
        <button
          onClick={() => toast.removeAllToasts()}
          style={{
            background: "#6b7280",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Clear All Toasts
        </button>
      </div>
    </div>
  );
}

// Main App component with ToastProvider
function App() {
  return (
    <ToastProvider defaultPosition="top-right">
      <ToastDemo />
    </ToastProvider>
  );
}

export default App;
