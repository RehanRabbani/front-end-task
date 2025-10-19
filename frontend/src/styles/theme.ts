/**
 * Design System Theme Configuration
 * 
 * This file defines the complete design system for the application including
 * colors, typography, spacing, breakpoints, and other design tokens.
 * Based on Safepay's brand guidelines with navy blue primary color.
 * 
 * @fileoverview Theme configuration with Safepay brand colors and design tokens
 */

/**
 * Main theme object containing all design tokens and system values.
 * Used throughout the application for consistent styling and theming.
 * 
 * @constant theme
 * @type {Object}
 * 
 * @property {Object} colors - Color palette including brand, semantic, and neutral colors
 * @property {Object} colors.primary - Navy blue primary color (#1E3A8A) from Safepay branding
 * @property {Object} colors.secondary - Gold/amber secondary color for accents
 * @property {Object} colors.gray - Comprehensive gray scale from 50-900
 * @property {Object} typography - Font families, sizes, weights, and line heights
 * @property {Object} spacing - Spacing scale using rem units (1-20)
 * @property {Object} breakpoints - Responsive breakpoints for mobile-first design
 * @property {Object} borderRadius - Border radius scale for consistent rounded corners
 * @property {Object} shadows - Box shadow utilities for depth and elevation
 * 
 * @example
 * // Using theme colors in styled-components
 * const Button = styled.button`
 *   background: ${theme.colors.primary};
 *   color: ${theme.colors.white};
 *   font-size: ${theme.typography.fontSize.base};
 *   padding: ${theme.spacing[3]} ${theme.spacing[6]};
 * `;
 * 
 * @example
 * // Using theme for responsive design
 * const Container = styled.div`
 *   @media (min-width: ${theme.breakpoints.md}) {
 *     padding: ${theme.spacing[8]};
 *   }
 * `;
 */
export const theme = {
  colors: {
    primary: '#1E3A8A', // Navy blue (similar to Safepay branding)
    primaryLight: '#3B82F6',
    primaryDark: '#1E40AF',
    secondary: '#F59E0B',
    secondaryLight: '#FCD34D',
    secondaryDark: '#D97706',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    
    // Neutral colors
    white: '#FFFFFF',
    black: '#000000',
    gray: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },
    
    // Background colors
    background: '#FFFFFF',
    backgroundSecondary: '#F9FAFB',
    backgroundDark: '#F3F4F6',
    
    // Text colors
    textPrimary: '#111827',
    textSecondary: '#6B7280',
    textMuted: '#9CA3AF',
    textInverse: '#FFFFFF',
  },
  
  typography: {
    fontFamily: {
      primary: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      mono: '"JetBrains Mono", "Fira Code", "SF Mono", Monaco, Consolas, monospace',
    },
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  
  spacing: {
    0: '0',
    1: '0.25rem',  // 4px
    2: '0.5rem',   // 8px
    3: '0.75rem',  // 12px
    4: '1rem',     // 16px
    5: '1.25rem',  // 20px
    6: '1.5rem',   // 24px
    8: '2rem',     // 32px
    10: '2.5rem',  // 40px
    12: '3rem',    // 48px
    16: '4rem',    // 64px
    20: '5rem',    // 80px
    24: '6rem',    // 96px
  },
  
  borderRadius: {
    none: '0',
    sm: '0.125rem',  // 2px
    base: '0.25rem', // 4px
    md: '0.375rem',  // 6px
    lg: '0.5rem',    // 8px
    xl: '0.75rem',   // 12px
    '2xl': '1rem',   // 16px
    full: '9999px',
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    none: 'none',
  },
  
  breakpoints: {
    xs: '480px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  
  zIndex: {
    auto: 'auto',
    0: '0',
    10: '10',
    20: '20',
    30: '30',
    40: '40',
    50: '50',
    modal: '1000',
    dropdown: '1050',
    tooltip: '1060',
  },
} as const;