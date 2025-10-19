import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchStudentById, clearError } from '../store/studentSlice';
import { Student } from '../types';
import {
  Container,
  Card,
  Button,
  Input,
  Label,
  Flex,
  Grid,
  LoadingSpinner,
  ErrorText,
} from '../styles/components';

/**
 * Student Lookup Page Component
 * 
 * Specialized interface for finding and viewing individual student details.
 * Features persistent search state that maintains searched student data
 * even when navigating between pages, as requested in requirements.
 * 
 * @fileoverview Student lookup with persistent state and detailed view
 */

interface StudentCardProps {
  student: Student;
}

const StudentCard: React.FC<StudentCardProps> = ({ student }) => {
  return (
    <Card>
      <Flex direction="column" gap="1.5rem">
        <Flex justify="space-between" align="center">
          <h2>{student.name}</h2>
          <div style={{
            background: '#e3f2fd',
            color: '#1976d2',
            padding: '0.25rem 0.75rem',
            borderRadius: '1rem',
            fontSize: '0.875rem',
            fontWeight: '500',
          }}>
            ID: {student.id}
          </div>
        </Flex>

        <Grid columns={2} gap="1.5rem">
          <div>
            <Label>Class</Label>
            <div style={{ 
              fontSize: '1.125rem', 
              fontWeight: '600',
              color: '#1f2937',
              marginTop: '0.25rem'
            }}>
              Class {student.class}
            </div>
          </div>

          <div>
            <Label>Gender</Label>
            <div style={{ 
              fontSize: '1.125rem', 
              fontWeight: '600',
              color: '#1f2937',
              marginTop: '0.25rem',
              textTransform: 'capitalize'
            }}>
              {student.sex}
            </div>
          </div>

          <div>
            <Label>Age</Label>
            <div style={{ 
              fontSize: '1.125rem', 
              fontWeight: '600',
              color: '#1f2937',
              marginTop: '0.25rem'
            }}>
              {student.age} years old
            </div>
          </div>

          <div>
            <Label>Siblings</Label>
            <div style={{ 
              fontSize: '1.125rem', 
              fontWeight: '600',
              color: '#1f2937',
              marginTop: '0.25rem'
            }}>
              {student.siblings} {student.siblings === 1 ? 'sibling' : 'siblings'}
            </div>
          </div>

          <div>
            <Label>GPA</Label>
            <div style={{ 
              fontSize: '1.125rem', 
              fontWeight: '600',
              color: '#1f2937',
              marginTop: '0.25rem'
            }}>
              {student.gpa}
            </div>
          </div>
        </Grid>
      </Flex>
    </Card>
  );
};

/**
 * Student Lookup Page Component
 * 
 * Individual student search and detail view page with persistent state.
 * Allows users to search for students by ID and view detailed information.
 * Maintains the last searched student data in Redux state for persistence.
 * 
 * Key Features:
 * - **ID-based Search**: Find students by their unique identifier
 * - **Persistent Results**: Last searched student remains visible across page navigation
 * - **Detailed View**: Comprehensive student information display
 * - **Error Handling**: Validation and API error management
 * - **Loading States**: Visual feedback during search operations
 * - **Responsive Design**: Mobile-friendly layout and styling
 * 
 * State Management:
 * - Uses Redux `recentLookup` state for persistence
 * - Local state for search input and validation
 * - Integrates with global loading and error states
 * 
 * User Experience:
 * - Search persists when navigating to other pages and back
 * - Clear error messages for invalid inputs or API failures
 * - Intuitive search interface with Enter key support
 * - Professional card-based layout for student details
 * 
 * @component StudentLookupPage
 * @returns {JSX.Element} Student lookup interface with search and results
 * 
 * @example
 * // Used in App.tsx routing
 * <Route path="/lookup" element={<StudentLookupPage />} />
 */
export const StudentLookupPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { recentLookup, loading, error } = useAppSelector(state => state.students);

  const [searchId, setSearchId] = useState('');
  const [searchError, setSearchError] = useState('');

  const handleSearch = async () => {
    if (!searchId.trim()) {
      setSearchError('Please enter a student ID');
      return;
    }

    setSearchError('');
    
    try {
      await dispatch(fetchStudentById(searchId.trim())).unwrap();
    } catch (error) {
      setSearchError('Student not found. Please check the ID and try again.');
    }
  };

  const handleInputChange = (value: string) => {
    setSearchId(value);
    if (searchError) {
      setSearchError('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Container>
      <Flex direction="column" gap="2rem">
        {/* Header */}
        <div>
          <h1>Student Lookup</h1>
          <p style={{ 
            color: '#6b7280', 
            marginTop: '0.5rem',
            fontSize: '1.125rem'
          }}>
            Search for a student by their unique ID to view their detailed information.
          </p>
        </div>

        {/* Search Section */}
        <Card>
          <Flex direction="column" gap="1rem">
            <Label htmlFor="studentId">Student ID</Label>
            <Flex gap="1rem" align="flex-end">
              <div style={{ flex: 1 }}>
                <Input
                  id="studentId"
                  type="text"
                  placeholder="Enter student ID (e.g., 123e4567-e89b-12d3-a456-426614174000)"
                  value={searchId}
                  onChange={(e) => handleInputChange(e.target.value)}
                  onKeyPress={handleKeyPress}
                  hasError={!!searchError}
                />
                {searchError && <ErrorText>{searchError}</ErrorText>}
              </div>
              <Button 
                onClick={handleSearch} 
                disabled={loading || !searchId.trim()}
                style={{ minWidth: '120px' }}
              >
                {loading ? (
                  <Flex align="center" gap="0.5rem">
                    <LoadingSpinner />
                    Searching...
                  </Flex>
                ) : (
                  'Search'
                )}
              </Button>
            </Flex>
          </Flex>
        </Card>

        {/* Error Display */}
        {error && (
          <Card>
            <Flex justify="space-between" align="center">
              <ErrorText>{error}</ErrorText>
              <Button variant="ghost" size="sm" onClick={() => dispatch(clearError())}>
                Dismiss
              </Button>
            </Flex>
          </Card>
        )}

        {/* Student Card */}
        {recentLookup && (
          <div>
            <h2 style={{ 
              marginBottom: '1rem', 
              color: '#374151',
              fontSize: '1.5rem',
              fontWeight: '600'
            }}>
              Student Information
            </h2>
            <StudentCard student={recentLookup} />
          </div>
        )}

        {/* Empty State */}
        {!recentLookup && !loading && !error && (
          <Card>
            <Flex direction="column" align="center" gap="1rem" style={{ 
              padding: '3rem', 
              textAlign: 'center' 
            }}>
              <div style={{ 
                fontSize: '3rem',
                opacity: 0.3,
                marginBottom: '1rem'
              }}>
                🔍
              </div>
              <h3 style={{ 
                color: '#374151',
                marginBottom: '0.5rem'
              }}>
                No Student Selected
              </h3>
              <p style={{ 
                color: '#6b7280',
                maxWidth: '400px',
                lineHeight: 1.6
              }}>
                Enter a student ID in the search box above to view their detailed information. 
                The most recent lookup will be saved and displayed here.
              </p>
            </Flex>
          </Card>
        )}
      </Flex>
    </Container>
  );
};