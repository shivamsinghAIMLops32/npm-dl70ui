import React from "react";
import { ToastProvider, useToast } from "dl70-ui";

// Enhanced Demo component showcasing all new features
function EnhancedToastDemo() {
  const toast = useToast();

  const showBasicToasts = () => {
    toast.success("Success with enhanced styling!", {
      animation: "bounce",
    });

    setTimeout(() => {
      toast.error("Error with action buttons!", {
        actions: [
          {
            label: "Retry",
            onClick: () => console.log("Retrying..."),
            style: "primary",
          },
          {
            label: "Dismiss",
            style: "secondary",
          },
        ],
      });
    }, 500);
  };

  const showLoadingDemo = async () => {
    // Method 1: Manual loading control
    const loadingId = toast.loading("Processing your request...");

    setTimeout(() => {
      toast.removeToast(loadingId);
      toast.success("Request completed!");
    }, 3000);
  };

  const showPromiseDemo = () => {
    // Method 2: Promise integration
    toast.promise(
      // Simulate API call
      new Promise((resolve, reject) => {
        setTimeout(() => {
          Math.random() > 0.5
            ? resolve("Success!")
            : reject(new Error("Failed!"));
        }, 2000);
      }),
      {
        loading: "Saving data...",
        success: "Data saved successfully!",
        error: "Failed to save data!",
        animation: "fade",
      }
    );
  };

  const showAnimationVariants = () => {
    const animations = ["slide", "fade", "bounce", "flip"];
    const positions = ["top-left", "top-right", "bottom-left", "bottom-right"];

    animations.forEach((animation, index) => {
      setTimeout(() => {
        toast.info(`${animation} animation`, {
          animation,
          position: positions[index % positions.length],
          duration: 4000,
        });
      }, index * 300);
    });
  };

  const showAdvancedFeatures = () => {
    // Rich content toast
    toast.success(
      <div>
        <strong>Rich Content!</strong>
        <br />
        <small>This toast supports JSX content!</small>
      </div>,
      {
        richContent: true,
        actions: [
          {
            label: "Learn More",
            onClick: () =>
              window.open(
                "https://github.com/shivamsinghAIMLops32/npm-dl70ui",
                "_blank"
              ),
            style: "primary",
          },
        ],
        duration: 8000,
      }
    );

    // Sound enabled toast
    setTimeout(() => {
      toast.warning("Sound enabled toast!", {
        sound: true,
        animation: "bounce",
      });
    }, 1000);
  };

  const showThemeDemo = () => {
    toast.info("Light theme toast", {
      theme: "light",
      position: "top-left",
    });

    setTimeout(() => {
      toast.info("Dark theme toast", {
        theme: "dark",
        position: "top-right",
      });
    }, 500);
  };

  const showQueueDemo = () => {
    // This will demonstrate the queue system
    for (let i = 1; i <= 8; i++) {
      toast.info(`Toast ${i} - Queue demo`, {
        duration: 2000,
      });
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "800px",
        margin: "0 auto",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        🎉 DL70 UI v2.0 - Enhanced Toast Demo
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.1)",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <h3>🎨 Enhanced Styling</h3>
          <button onClick={showBasicToasts} style={buttonStyle}>
            Show Enhanced Toasts
          </button>
          <p style={{ fontSize: "12px", opacity: 0.8 }}>
            Gradients, rounded corners, better animations
          </p>
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.1)",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <h3>⏳ Loading States</h3>
          <button onClick={showLoadingDemo} style={buttonStyle}>
            Show Loading Toast
          </button>
          <p style={{ fontSize: "12px", opacity: 0.8 }}>
            Spinner animations and loading management
          </p>
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.1)",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <h3>🔮 Promise Integration</h3>
          <button onClick={showPromiseDemo} style={buttonStyle}>
            Test Promise Toast
          </button>
          <p style={{ fontSize: "12px", opacity: 0.8 }}>
            Automatic loading → success/error flow
          </p>
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.1)",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <h3>🎭 Animation Variants</h3>
          <button onClick={showAnimationVariants} style={buttonStyle}>
            Show All Animations
          </button>
          <p style={{ fontSize: "12px", opacity: 0.8 }}>
            Slide, fade, bounce, flip animations
          </p>
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.1)",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <h3>✨ Advanced Features</h3>
          <button onClick={showAdvancedFeatures} style={buttonStyle}>
            Rich Content & Sound
          </button>
          <p style={{ fontSize: "12px", opacity: 0.8 }}>
            JSX content, action buttons, sound effects
          </p>
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.1)",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <h3>🌙 Theme Support</h3>
          <button onClick={showThemeDemo} style={buttonStyle}>
            Test Themes
          </button>
          <p style={{ fontSize: "12px", opacity: 0.8 }}>
            Light, dark, auto themes
          </p>
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.1)",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <h3>📋 Queue System</h3>
          <button onClick={showQueueDemo} style={buttonStyle}>
            Test Queue (8 toasts)
          </button>
          <p style={{ fontSize: "12px", opacity: 0.8 }}>
            Max 5 visible, rest queued
          </p>
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.1)",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <h3>🧹 Management</h3>
          <button
            onClick={() => toast.removeAllToasts()}
            style={{ ...buttonStyle, background: "#ef4444" }}
          >
            Clear All Toasts
          </button>
          <p style={{ fontSize: "12px", opacity: 0.8 }}>
            Remove all active toasts
          </p>
        </div>
      </div>

      <div
        style={{
          background: "rgba(255,255,255,0.1)",
          padding: "20px",
          borderRadius: "12px",
          textAlign: "center",
        }}
      >
        <h3>🚀 New Features in v2.0</h3>
        <ul style={{ textAlign: "left", maxWidth: "600px", margin: "0 auto" }}>
          <li>✅ Action buttons with callbacks</li>
          <li>✅ Loading states with spinners</li>
          <li>✅ Promise integration</li>
          <li>✅ Queue management (max visible toasts)</li>
          <li>✅ Multiple animation variants</li>
          <li>✅ Dark/Light theme support</li>
          <li>✅ Sound notifications</li>
          <li>✅ Swipe to dismiss</li>
          <li>✅ Rich JSX content support</li>
          <li>✅ Enhanced accessibility</li>
          <li>✅ Better mobile responsiveness</li>
        </ul>
      </div>
    </div>
  );
}

const buttonStyle = {
  background: "#3b82f6",
  color: "white",
  border: "none",
  padding: "10px 15px",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "600",
  transition: "all 0.2s ease",
  width: "100%",
  marginBottom: "10px",
};

// Main App component with enhanced ToastProvider
function App() {
  return (
    <ToastProvider
      defaultPosition="top-right"
      maxToasts={5}
      defaultDuration={4000}
      defaultAnimation="slide"
      defaultTheme="auto"
      enableSounds={false}
      swipeToDismiss={true}
    >
      <EnhancedToastDemo />
    </ToastProvider>
  );
}

export default App;
