import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { store } from './store';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Navigation } from './components/Navigation';
import { StudentsPage } from './pages/StudentsPage';
import { StudentLookupPage } from './pages/StudentLookupPage';

/**
 * Main Application Component
 * 
 * Root component that sets up the application's core providers and routing.
 * Provides Redux store, styled-components theme, React Router configuration,
 * and application-wide error boundary for graceful error handling.
 * 
 * Features:
 * - ErrorBoundary wrapper for catching and displaying errors gracefully
 * - Redux state management integration
 * - Styled-components theming with Safepay brand colors
 * - Client-side routing with automatic redirects
 * - Global styles and responsive layout
 * - Navigation component for site-wide menu
 * 
 * Routes:
 * - `/` - Redirects to `/students`
 * - `/students` - Student management page with CRUD operations
 * - `/lookup` - Student lookup page with persistent search state
 * - `*` - Catch-all redirects to `/students`
 * 
 * Error Handling:
 * - Top-level ErrorBoundary catches JavaScript errors anywhere in the component tree
 * - Displays user-friendly error UI with refresh option
 * - Logs technical details for debugging
 * - Prevents entire application crashes
 * 
 * @component App
 * @returns {JSX.Element} The complete application with routing, providers, and error handling
 * 
 * @example
 * // App is typically rendered in main.tsx
 * import { App } from './App';
 * ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
 */
const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Router>
            <div>
              <Navigation />
              <main style={{ minHeight: 'calc(100vh - 80px)', paddingTop: '2rem' }}>
                <Routes>
                  <Route path="/" element={<Navigate to="/students" replace />} />
                  <Route path="/students" element={<StudentsPage />} />
                  <Route path="/lookup" element={<StudentLookupPage />} />
                  <Route path="*" element={<Navigate to="/students" replace />} />
                </Routes>
              </main>
            </div>
          </Router>
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;