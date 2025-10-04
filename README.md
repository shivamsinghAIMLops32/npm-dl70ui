# 🎉 DL70 UI - Enhanced Toast Component Library v2.0

[![npm version](https://badge.fury.io/js/dl70-ui.svg)](https://badge.fury.io/js/dl70-ui)
[![GitHub issues](https://img.shields.io/github/issues/shivamsinghAIMLops32/npm-dl70ui)](https://github.com/shivamsinghAIMLops32/npm-dl70ui/issues)
[![GitHub stars](https://img.shields.io/github/stars/shivamsinghAIMLops32/npm-dl70ui)](https://github.com/shivamsinghAIMLops32/npm-dl70ui/stargazers)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A beautiful, feature-rich, and highly customizable React toast notification component library with advanced functionality including action buttons, loading states, promise integration, queue management, and modern animations.

## 🚀 Live Demo

Check out the [interactive demo](https://npm-dl70ui.vercel.app) to see all features in action!

## ✨ What's New in v2.0

- 🎯 **Action Buttons** - Add interactive buttons to toasts with custom callbacks
- ⏳ **Loading States** - Built-in loading spinners and loading management
- 🔮 **Promise Integration** - Automatic loading → success/error flow for async operations
- 📋 **Queue Management** - Smart toast queuing system with configurable limits
- 🎭 **Animation Variants** - Multiple entrance animations (slide, fade, bounce, flip)
- 🌙 **Theme Support** - Dark/Light/Auto theme detection with CSS custom properties
- 🔊 **Sound Effects** - Optional audio notifications for better UX
- 👆 **Swipe to Dismiss** - Touch gesture support for mobile devices
- 📝 **Rich Content** - Full JSX content support for complex messages
- ⌨️ **Keyboard Navigation** - Enhanced accessibility with keyboard controls
- � **Better Mobile** - Improved responsive design and touch interactions
- � **Modern Design** - Gradients, blur effects, rounded corners, and smooth animations## Installation

```bash
npm install dl70-ui
```

or

```bash
yarn add dl70-ui
```

## Quick Start

### 1. Wrap your app with ToastProvider

```jsx
import React from "react";
import { ToastProvider } from "dl70-ui";
import App from "./App";

function Root() {
  return (
    <ToastProvider defaultPosition="top-right">
      <App />
    </ToastProvider>
  );
}

export default Root;
```

### 2. Use the useToast hook

```jsx
import React from "react";
import { useToast } from "dl70-ui";

function MyComponent() {
  const toast = useToast();

  const showSuccessToast = () => {
    toast.success("Operation completed successfully!");
  };

  const showErrorToast = () => {
    toast.error("Something went wrong!");
  };

  const showCustomToast = () => {
    toast.addToast("Custom message", {
      type: "info",
      duration: 5000,
      position: "bottom-center",
      icon: "🚀",
    });
  };

  return (
    <div>
      <button onClick={showSuccessToast}>Success Toast</button>
      <button onClick={showErrorToast}>Error Toast</button>
      <button onClick={showCustomToast}>Custom Toast</button>
    </div>
  );
}
```

## API Reference

### ToastProvider Props

| Prop              | Type        | Default       | Description                 |
| ----------------- | ----------- | ------------- | --------------------------- |
| `defaultPosition` | `string`    | `'top-right'` | Default position for toasts |
| `children`        | `ReactNode` | -             | Your app components         |

### useToast Hook

The `useToast` hook returns an object with the following methods:

#### Methods

- **`success(message, options?)`** - Show a success toast
- **`error(message, options?)`** - Show an error toast
- **`warning(message, options?)`** - Show a warning toast
- **`info(message, options?)`** - Show an info toast
- **`addToast(message, options?)`** - Show a custom toast
- **`removeToast(id)`** - Remove a specific toast
- **`removeAllToasts()`** - Remove all toasts

#### Toast Options

| Option            | Type                                          | Default       | Description                                 |
| ----------------- | --------------------------------------------- | ------------- | ------------------------------------------- |
| `type`            | `'success' \| 'error' \| 'warning' \| 'info'` | `'info'`      | Toast type                                  |
| `duration`        | `number`                                      | `3000`        | Auto-dismiss duration (0 = no auto-dismiss) |
| `position`        | `string`                                      | `'top-right'` | Toast position                              |
| `showCloseButton` | `boolean`                                     | `true`        | Show close button                           |
| `pauseOnHover`    | `boolean`                                     | `true`        | Pause timer on hover                        |
| `icon`            | `ReactNode`                                   | `null`        | Custom icon                                 |
| `className`       | `string`                                      | `''`          | Additional CSS class                        |

#### Positions

- `'top-right'`
- `'top-left'`
- `'top-center'`
- `'bottom-right'`
- `'bottom-left'`
- `'bottom-center'`

## Advanced Usage

### Custom Styling

You can override the default styles by targeting the CSS classes:

```css
/* Override toast background */
.toast--success {
  background-color: #your-color;
}

/* Add custom styling */
.my-custom-toast {
  border: 2px solid #gold;
  border-radius: 12px;
}
```

Then use it:

```jsx
toast.success("Custom styled toast!", {
  className: "my-custom-toast",
});
```

### Persistent Toasts

```jsx
// Toast that doesn't auto-dismiss
toast.info("This toast stays until closed", {
  duration: 0,
});
```

### Custom Icons

```jsx
toast.success("Success with custom icon!", {
  icon: <YourCustomIcon />,
});
```

### Manual Toast Management

```jsx
const toastId = toast.addToast("Manual toast");

// Remove it later
setTimeout(() => {
  toast.removeToast(toastId);
}, 5000);

// Or remove all toasts
toast.removeAllToasts();
```

## Examples

### E-commerce Notifications

```jsx
function ShoppingCart() {
  const toast = useToast();

  const addToCart = (product) => {
    // Add product logic here
    toast.success(`${product.name} added to cart!`, {
      icon: "🛒",
      duration: 2000,
    });
  };

  const checkout = async () => {
    try {
      await processPayment();
      toast.success("Order placed successfully!", {
        icon: "✅",
        duration: 5000,
      });
    } catch (error) {
      toast.error("Payment failed. Please try again.", {
        icon: "❌",
        duration: 0, // Persistent until user closes
      });
    }
  };
}
```

### Form Validation

```jsx
function ContactForm() {
  const toast = useToast();

  const handleSubmit = async (formData) => {
    if (!formData.email) {
      toast.warning("Please enter your email address", {
        position: "top-center",
      });
      return;
    }

    try {
      await submitForm(formData);
      toast.success("Message sent successfully!");
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    }
  };
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Internet Explorer 11+

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT © [Shivam Singh]

## Changelog

### v1.0.0

- Initial release
- Basic toast functionality
- Multiple positions and types
- Responsive design
- Accessibility features
