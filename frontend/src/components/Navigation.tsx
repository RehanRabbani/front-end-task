import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { Container, Flex } from '../styles/components';

/**
 * Navigation Component
 * 
 * Site-wide navigation header with logo and navigation links.
 * Features active route highlighting and Safepay branding.
 * 
 * @fileoverview Main navigation component with responsive design and active states
 */

const NavBar = styled.nav`
  background: ${theme.colors.white};
  border-bottom: 1px solid ${theme.colors.gray[200]};
  padding: ${theme.spacing[4]} 0;
  box-shadow: ${theme.shadows.sm};
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[3]};
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.primary};
  text-decoration: none;
`;

const LogoImage = styled.img`
  height: 32px;
  width: auto;
`;

const NavLinks = styled.div`
  display: flex;
  gap: ${theme.spacing[6]};
  
  @media (max-width: ${theme.breakpoints.sm}) {
    gap: ${theme.spacing[4]};
  }
`;

const NavLink = styled(Link)<{ isActive: boolean }>`
  padding: ${theme.spacing[2]} ${theme.spacing[4]};
  border-radius: ${theme.borderRadius.md};
  text-decoration: none;
  font-weight: ${theme.typography.fontWeight.medium};
  transition: all 0.2s ease-in-out;
  
  ${({ isActive }) => isActive ? `
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
  ` : `
    color: ${theme.colors.textSecondary};
    
    &:hover {
      background: ${theme.colors.gray[100]};
      color: ${theme.colors.primary};
    }
  `}
`;

/**
 * Navigation component providing site-wide navigation and branding.
 * 
 * Features:
 * - Safepay logo and brand identity
 * - Navigation links with active state highlighting
 * - Responsive layout using flexbox
 * - Route-aware active link detection
 * - Clean shadow and border styling
 * 
 * Navigation Links:
 * - Students Grid: Main CRUD interface for student management
 * - Student Lookup: Search interface with persistent state
 * 
 * @component Navigation
 * @returns {JSX.Element} Navigation header with logo and links
 * 
 * @example
 * // Used in App.tsx as the main navigation
 * <Navigation />
 */
export const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <NavBar>
      <Container>
        <Flex justify="space-between" align="center">
          <Logo as={Link} to="/">
            <LogoImage 
              src="/src/assets/Logos/1/Safepay-logo-01.svg" 
              alt="Safepay Logo" 
            />
            <span>Students Management</span>
          </Logo>

          <NavLinks>
            <NavLink 
              to="/students" 
              isActive={location.pathname === '/students' || location.pathname === '/'}
            >
              Students Grid
            </NavLink>
            <NavLink 
              to="/lookup" 
              isActive={location.pathname === '/lookup'}
            >
              Student Lookup
            </NavLink>
          </NavLinks>
        </Flex>
      </Container>
    </NavBar>
  );
};