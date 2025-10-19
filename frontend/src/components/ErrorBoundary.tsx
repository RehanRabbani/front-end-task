import React, { Component, ReactNode } from 'react';
import { Card, Button, Flex } from '../styles/components';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem' }}>
          <Card>
            <Flex direction="column" align="center" gap="1rem" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
              <h2>Something went wrong</h2>
              <p style={{ color: '#6b7280', maxWidth: '500px' }}>
                We're sorry, but something unexpected happened. Please try refreshing the page or contact support if the problem persists.
              </p>
              {this.state.error && (
                <details style={{ marginTop: '1rem', textAlign: 'left' }}>
                  <summary style={{ cursor: 'pointer', color: '#6b7280' }}>
                    Technical Details
                  </summary>
                  <pre style={{ 
                    marginTop: '1rem', 
                    padding: '1rem', 
                    background: '#f3f4f6', 
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    overflow: 'auto',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word'
                  }}>
                    {this.state.error.toString()}
                  </pre>
                </details>
              )}
              <Button onClick={() => window.location.reload()}>
                Refresh Page
              </Button>
            </Flex>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}