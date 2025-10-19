import styled from 'styled-components';
import { theme } from './theme';

/**
 * Styled Components Library
 * 
 * This file contains all reusable styled components for the application.
 * Components follow the design system defined in theme.ts and provide
 * consistent styling across the entire application.
 * 
 * @fileoverview Reusable styled components with theme integration
 */

/**
 * Responsive container component with automatic centering and padding.
 * Provides consistent content width and spacing across different screen sizes.
 * 
 * @component Container
 * @example
 * <Container>
 *   <h1>Page Content</h1>
 * </Container>
 */
export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing[4]};
  
  @media (min-width: ${theme.breakpoints.sm}) {
    padding: 0 ${theme.spacing[6]};
  }
  
  @media (min-width: ${theme.breakpoints.lg}) {
    padding: 0 ${theme.spacing[8]};
  }
`;

/**
 * Card component with subtle elevation and clean styling.
 * Used for content sections that need visual separation and organization.
 * Features rounded corners, padding, and subtle border for content grouping.
 * 
 * @component Card
 * @example
 * <Card>
 *   <h2>Student Information</h2>
 *   <p>Details about the student...</p>
 * </Card>
 */
export const Card = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.base};
  padding: ${theme.spacing[6]};
  border: 1px solid ${theme.colors.gray[200]};
`;

/**
 * Versatile button component with multiple variants and sizes.
 * Supports different visual styles and interaction states for various use cases.
 * 
 * @component Button
 * @param {Object} props - Component props
 * @param {'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'} [props.variant='primary'] - Visual style variant
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - Button size
 * @param {boolean} [props.fullWidth=false] - Whether button should take full width
 * 
 * @example
 * // Primary button
 * <Button variant="primary">Save Student</Button>
 * 
 * @example
 * // Danger button with small size
 * <Button variant="danger" size="sm">Delete</Button>
 * 
 * @example
 * // Full width outline button
 * <Button variant="outline" fullWidth>Search Students</Button>
 */
export const Button = styled.button<{
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing[2]};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-family: ${theme.typography.fontFamily.primary};
  font-weight: ${theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  outline: none;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &:focus {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }
  
  ${({ size = 'md' }) => {
    switch (size) {
      case 'sm':
        return `
          padding: ${theme.spacing[2]} ${theme.spacing[3]};
          font-size: ${theme.typography.fontSize.sm};
          height: 32px;
        `;
      case 'lg':
        return `
          padding: ${theme.spacing[3]} ${theme.spacing[6]};
          font-size: ${theme.typography.fontSize.lg};
          height: 48px;
        `;
      default:
        return `
          padding: ${theme.spacing[2]} ${theme.spacing[4]};
          font-size: ${theme.typography.fontSize.base};
          height: 40px;
        `;
    }
  }}
  
  ${({ variant = 'primary' }) => {
    switch (variant) {
      case 'secondary':
        return `
          background: ${theme.colors.secondary};
          color: ${theme.colors.white};
          
          &:hover:not(:disabled) {
            background: ${theme.colors.secondaryDark};
          }
        `;
      case 'outline':
        return `
          background: transparent;
          color: ${theme.colors.primary};
          border: 1px solid ${theme.colors.primary};
          
          &:hover:not(:disabled) {
            background: ${theme.colors.primary};
            color: ${theme.colors.white};
          }
        `;
      case 'ghost':
        return `
          background: transparent;
          color: ${theme.colors.primary};
          
          &:hover:not(:disabled) {
            background: ${theme.colors.gray[100]};
          }
        `;
      case 'danger':
        return `
          background: ${theme.colors.error};
          color: ${theme.colors.white};
          
          &:hover:not(:disabled) {
            background: #dc2626;
          }
        `;
      default:
        return `
          background: ${theme.colors.primary};
          color: ${theme.colors.white};
          
          &:hover:not(:disabled) {
            background: ${theme.colors.primaryDark};
          }
        `;
    }
  }}
  
  ${({ fullWidth }) => fullWidth && `
    width: 100%;
  `}
`;

/**
 * Form input component with error state support and accessibility features.
 * Provides consistent styling with focus states and error indication.
 * 
 * @component Input
 * @param {Object} props - Component props
 * @param {boolean} [props.hasError=false] - Whether input is in error state
 * 
 * @example
 * // Normal input
 * <Input 
 *   type="text" 
 *   placeholder="Enter student name"
 *   value={name}
 *   onChange={(e) => setName(e.target.value)}
 * />
 * 
 * @example
 * // Input with error state
 * <Input 
 *   hasError={!!errors.email}
 *   type="email" 
 *   placeholder="Enter email"
 * />
 */
export const Input = styled.input<{ hasError?: boolean }>`
  width: 100%;
  padding: ${theme.spacing[3]} ${theme.spacing[4]};
  border: 1px solid ${({ hasError }) => hasError ? theme.colors.error : theme.colors.gray[300]};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSize.base};
  font-family: ${theme.typography.fontFamily.primary};
  background: ${theme.colors.white};
  transition: border-color 0.2s ease-in-out;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px ${theme.colors.primary}20;
  }
  
  &::placeholder {
    color: ${theme.colors.gray[400]};
  }
  
  &:disabled {
    background: ${theme.colors.gray[100]};
    cursor: not-allowed;
  }
`;

/**
 * Form select dropdown component with error state support.
 * Matches Input component styling for form consistency.
 * 
 * @component Select
 * @param {Object} props - Component props
 * @param {boolean} [props.hasError=false] - Whether select is in error state
 * 
 * @example
 * // Basic select dropdown
 * <Select 
 *   value={selectedYear}
 *   onChange={(e) => setSelectedYear(e.target.value)}
 * >
 *   <option value="">Select Year</option>
 *   <option value="1">First Year</option>
 *   <option value="2">Second Year</option>
 * </Select>
 * 
 * @example
 * // Select with error state
 * <Select hasError={!!errors.year}>
 *   <option value="">Required field</option>
 * </Select>
 */
export const Select = styled.select<{ hasError?: boolean }>`
  width: 100%;
  padding: ${theme.spacing[3]} ${theme.spacing[4]};
  border: 1px solid ${({ hasError }) => hasError ? theme.colors.error : theme.colors.gray[300]};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSize.base};
  font-family: ${theme.typography.fontFamily.primary};
  background: ${theme.colors.white};
  cursor: pointer;
  transition: border-color 0.2s ease-in-out;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px ${theme.colors.primary}20;
  }
  
  &:disabled {
    background: ${theme.colors.gray[100]};
    cursor: not-allowed;
  }
`;

/**
 * Form label component with consistent typography.
 * Used to identify form fields and provide accessibility labels.
 * 
 * @component Label
 * @example
 * <Label htmlFor="student-name">Student Name</Label>
 * <Input id="student-name" type="text" />
 */
export const Label = styled.label`
  display: block;
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.textPrimary};
  margin-bottom: ${theme.spacing[2]};
`;

/**
 * Error message text component for form validation feedback.
 * Displays validation errors with consistent error styling.
 * 
 * @component ErrorText
 * @example
 * {errors.name && <ErrorText>{errors.name}</ErrorText>}
 */
export const ErrorText = styled.span`
  display: block;
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.error};
  margin-top: ${theme.spacing[1]};
`;

/**
 * Data table component with clean styling and shadow.
 * Provides consistent table layout for displaying structured data.
 * 
 * @component Table
 * @example
 * <Table>
 *   <thead>
 *     <tr>
 *       <TableHeader>Name</TableHeader>
 *       <TableHeader>Email</TableHeader>
 *     </tr>
 *   </thead>
 *   <tbody>
 *     <TableRow>
 *       <TableCell>John Doe</TableCell>
 *       <TableCell>john@example.com</TableCell>
 *     </TableRow>
 *   </tbody>
 * </Table>
 */
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${theme.shadows.base};
`;

/**
 * Table header cell component with sortable styling.
 * Features hover effects and consistent padding for table headers.
 * 
 * @component TableHeader
 */
export const TableHeader = styled.th`
  background: ${theme.colors.gray[50]};
  padding: ${theme.spacing[4]};
  text-align: left;
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.textPrimary};
  border-bottom: 1px solid ${theme.colors.gray[200]};
  cursor: pointer;
  
  &:hover {
    background: ${theme.colors.gray[100]};
  }
`;

/**
 * Standard table data cell component.
 * Provides consistent padding and border styling for table content.
 * 
 * @component TableCell
 */
export const TableCell = styled.td`
  padding: ${theme.spacing[4]};
  border-bottom: 1px solid ${theme.colors.gray[200]};
  color: ${theme.colors.textPrimary};
`;

/**
 * Table row component with hover effects.
 * Enhances user experience with visual feedback on row interaction.
 * 
 * @component TableRow
 */
export const TableRow = styled.tr`
  &:hover {
    background: ${theme.colors.gray[50]};
  }
  
  &:last-child td {
    border-bottom: none;
  }
`;

export const Modal = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => isOpen ? 'flex' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
  z-index: ${theme.zIndex.modal};
  padding: ${theme.spacing[4]};
`;

export const ModalContent = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  padding: ${theme.spacing[6]};
  box-shadow: ${theme.shadows.xl};
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: between;
  margin-bottom: ${theme.spacing[4]};
  padding-bottom: ${theme.spacing[4]};
  border-bottom: 1px solid ${theme.colors.gray[200]};
`;

export const ModalTitle = styled.h3`
  margin: 0;
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.textPrimary};
`;

export const ModalFooter = styled.div`
  display: flex;
  gap: ${theme.spacing[3]};
  justify-content: flex-end;
  margin-top: ${theme.spacing[6]};
  padding-top: ${theme.spacing[4]};
  border-top: 1px solid ${theme.colors.gray[200]};
`;

export const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid ${theme.colors.gray[300]};
  border-radius: 50%;
  border-top-color: ${theme.colors.primary};
  animation: spin 1s ease-in-out infinite;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

/**
 * CSS Grid layout component for structured layouts.
 * Provides responsive grid system with configurable columns and gaps.
 * 
 * @component Grid
 * @param {Object} props - Component props
 * @param {number} [props.columns=1] - Number of grid columns
 * @param {string} [props.gap=theme.spacing[4]] - Gap between grid items
 * 
 * @example
 * // 3-column grid with custom gap
 * <Grid columns={3} gap="2rem">
 *   <Card>Item 1</Card>
 *   <Card>Item 2</Card>
 *   <Card>Item 3</Card>
 * </Grid>
 */
export const Grid = styled.div<{ columns?: number; gap?: string }>`
  display: grid;
  grid-template-columns: repeat(${({ columns = 1 }) => columns}, 1fr);
  gap: ${({ gap = theme.spacing[4] }) => gap};
`;

/**
 * Flexbox layout component with comprehensive alignment options.
 * Provides flexible layout system for component arrangement and spacing.
 * 
 * @component Flex
 * @param {Object} props - Component props
 * @param {'row' | 'column'} [props.direction='row'] - Flex direction
 * @param {'flex-start' | 'center' | 'flex-end' | 'stretch'} [props.align='stretch'] - Align items
 * @param {'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around'} [props.justify='flex-start'] - Justify content
 * @param {string} [props.gap='0'] - Gap between flex items
 * @param {boolean} [props.wrap=false] - Whether items should wrap
 * 
 * @example
 * // Centered row with gap
 * <Flex justify="center" align="center" gap="1rem">
 *   <Button>Cancel</Button>
 *   <Button variant="primary">Save</Button>
 * </Flex>
 * 
 * @example
 * // Vertical column layout
 * <Flex direction="column" gap="0.5rem">
 *   <Label>Student Name</Label>
 *   <Input type="text" />
 *   <ErrorText>Name is required</ErrorText>
 * </Flex>
 */
export const Flex = styled.div<{
  direction?: 'row' | 'column';
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
  gap?: string;
  wrap?: boolean;
}>`
  display: flex;
  flex-direction: ${({ direction = 'row' }) => direction};
  align-items: ${({ align = 'stretch' }) => align};
  justify-content: ${({ justify = 'flex-start' }) => justify};
  gap: ${({ gap = '0' }) => gap};
  flex-wrap: ${({ wrap = false }) => wrap ? 'wrap' : 'nowrap'};
`;