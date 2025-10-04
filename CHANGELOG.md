# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2025-10-04

### ✨ Added

- **Action Buttons**: Interactive buttons with custom callbacks and styles
- **Loading States**: Built-in loading spinners and state management
- **Promise Integration**: Automatic loading → success/error flow for async operations
- **Queue Management**: Smart toast queuing system with configurable limits (maxToasts)
- **Animation Variants**: Multiple entrance animations (slide, fade, bounce, flip)
- **Theme Support**: Dark/Light/Auto theme detection with system preference
- **Sound Effects**: Optional audio notifications for better user experience
- **Swipe to Dismiss**: Touch gesture support for mobile devices
- **Rich Content Support**: Full JSX content support for complex messages
- **Keyboard Navigation**: Enhanced accessibility with ESC key support
- **Touch Interactions**: Mouse and touch drag support for dismissing toasts
- **Modern Styling**: Gradients, blur effects, rounded corners, and smooth animations
- **Enhanced Responsiveness**: Improved mobile design and touch interactions
- **Toast Updates**: Ability to update existing toasts dynamically
- **Queue Information**: Access to queue count and management

### 🔧 Enhanced

- **Provider Configuration**: Extended with new props for better control
- **CSS Architecture**: Modular CSS with enhanced styling and custom properties
- **Accessibility**: Better ARIA labels, focus management, and keyboard navigation
- **Performance**: Optimized animations and reduced unnecessary re-renders
- **Bundle Size**: Maintained compact size despite feature additions
- **Browser Support**: Enhanced compatibility across modern browsers
- **Error Handling**: Better error boundaries and graceful degradation

### 🎨 Improved

- **Visual Design**: Modern gradients and improved color schemes
- **Animation System**: Smoother transitions and multiple animation options
- **Typography**: Better font scaling and line height
- **Spacing**: Consistent spacing system across components
- **Icons**: Enhanced icon system with loading spinners
- **Responsive Design**: Better mobile and tablet experience

### 📚 Documentation

- **Comprehensive README**: Detailed API documentation with examples
- **Enhanced CONTRIBUTING**: Detailed contribution guidelines
- **Code Examples**: Multiple usage examples and best practices
- **TypeScript Support**: Improved type definitions (in progress)

### 🐛 Fixed

- **Animation Flickering**: Resolved animation issues on mobile devices
- **Memory Leaks**: Fixed event listener cleanup
- **Z-index Issues**: Better stacking context management
- **Mobile Touch**: Improved touch event handling
- **CSS Conflicts**: Better CSS isolation and specificity

## [1.1.1] - 2025-10-04

### 🐛 Fixed

- Minor bug fixes and stability improvements
- Updated documentation
- Improved build process

### 🔧 Enhanced

- Better error handling
- Performance optimizations
- Code cleanup

## [1.1.0] - 2025-10-04

### ✨ Added

- Enhanced Babel configuration with modern presets
- ESLint integration for code quality
- Dual build system (CommonJS and ES modules)
- Improved development workflow

### 🔧 Enhanced

- Build process with automatic transpilation
- Better browser compatibility
- Tree-shaking support
- Development tools and scripts

### 📚 Documentation

- Improved README with better examples
- Contributing guidelines
- License information

## [1.0.0] - 2025-10-04

### 🎉 Initial Release

- **Basic Toast Functionality**: Success, error, warning, info toast types
- **Positioning System**: 6 different positions (corners and centers)
- **Customizable Duration**: Auto-dismiss with configurable timing
- **Pause on Hover**: User-friendly interaction
- **Close Button**: Manual dismissal option
- **Progress Bar**: Visual indication of remaining time
- **Responsive Design**: Mobile-friendly layout
- **Accessibility**: Basic ARIA labels and semantic HTML
- **Custom Styling**: CSS class override support
- **Context Provider**: React Context for global toast management
- **Hook API**: Simple useToast hook for easy integration

### 🎨 Design

- Clean and modern appearance
- Smooth animations and transitions
- Color-coded toast types
- Professional styling

### 📚 Documentation

- Basic README with installation and usage
- API documentation
- Simple examples

---

## Development Guidelines

### Version Numbering

- **Major** (X.0.0): Breaking changes
- **Minor** (0.X.0): New features, backward compatible
- **Patch** (0.0.X): Bug fixes, backward compatible

### Release Process

1. Update version in package.json
2. Update CHANGELOG.md
3. Create git tag
4. Publish to NPM
5. Create GitHub release

### Breaking Changes

When introducing breaking changes, we:

- Clearly document the changes
- Provide migration guides
- Maintain backward compatibility when possible
- Follow semantic versioning strictly

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to contribute to this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
