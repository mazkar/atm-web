import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null, hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    console.log('error', error);
    console.log('errorInfo', errorInfo);
    console.log('haserror', this.state.hasError);
    // You can also log error messages to an error reporting service here
  }

  //   static getDerivedStateFromError(error) {
  //     // Update state so the next render will show the fallback UI.
  //     console.log('getDerivedState', error);
  //     return { hasError: true };
  //   }

  render() {
    if (this.state.error) {
      // Error path
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}

export default ErrorBoundary;
