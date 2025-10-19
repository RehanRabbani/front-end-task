import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html {
    font-size: 16px;
    line-height: 1.5;
  }
  
  body {
    font-family: ${theme.typography.fontFamily.primary};
    background: ${theme.colors.background};
    color: ${theme.colors.textPrimary};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-weight: ${theme.typography.fontWeight.semibold};
    line-height: ${theme.typography.lineHeight.tight};
  }
  
  h1 {
    font-size: ${theme.typography.fontSize['3xl']};
  }
  
  h2 {
    font-size: ${theme.typography.fontSize['2xl']};
  }
  
  h3 {
    font-size: ${theme.typography.fontSize.xl};
  }
  
  h4 {
    font-size: ${theme.typography.fontSize.lg};
  }
  
  h5 {
    font-size: ${theme.typography.fontSize.base};
  }
  
  h6 {
    font-size: ${theme.typography.fontSize.sm};
  }
  
  p {
    margin-bottom: ${theme.spacing[4]};
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  button {
    font-family: inherit;
  }
  
  input, select, textarea {
    font-family: inherit;
  }
  
  /* Custom scrollbar styles */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: ${theme.colors.gray[100]};
  }
  
  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.gray[400]};
    border-radius: ${theme.borderRadius.full};
    
    &:hover {
      background: ${theme.colors.gray[500]};
    }
  }
`;