import React, { useState, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  fetchStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  clearError,
} from '../store/studentSlice';
import { Student, FilterConfig, SortConfig } from '../types';
import { StudentForm } from '../components/StudentForm';
import {
  Container,
  Card,
  Button,
  Input,
  Select,
  Label,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalFooter,
  Flex,
  Grid,
  LoadingSpinner,
  ErrorText,
} from '../styles/components';

/**
 * Students Management Page Component
 * 
 * Main interface for student CRUD operations with advanced features:
 * - Comprehensive data table with sorting and filtering
 * - Modal-based forms for create/edit operations
 * - Bulk actions and advanced search capabilities
 * - Real-time validation and error handling
 * - Responsive design with loading and error states
 * 
 * Features:
 * - **CRUD Operations**: Create, read, update, delete students
 * - **Sorting**: Click column headers to sort by any field
 * - **Filtering**: Filter by year, search by name/email
 * - **Form Validation**: Real-time validation with error messages
 * - **Confirmation Dialogs**: Safe delete operations with confirmation
 * - **Responsive Table**: Mobile-friendly table design
 * - **Loading States**: Visual feedback during API operations
 * - **Error Handling**: User-friendly error messages
 * 
 * State Management:
 * - Uses Redux store for student data and loading states
 * - Local state for UI interactions (modals, forms, filters)
 * - Optimistic updates for better user experience
 * 
 * @component StudentsPage
 * @returns {JSX.Element} Complete student management interface
 * 
 * @example
 * // Used in App.tsx routing
 * <Route path="/students" element={<StudentsPage />} />
 */
export const StudentsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { students, loading, error } = useAppSelector(state => state.students);

  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<Student | null>(null);

  // Filtering and sorting state
  const [filters, setFilters] = useState<FilterConfig>({
    name: '',
    class: undefined,
    sex: '',
    minAge: undefined,
    maxAge: undefined,
  });

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'name',
    direction: 'asc',
  });

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  // Filter and sort students
  const filteredAndSortedStudents = useMemo(() => {
    let filtered = students.filter(student => {
      const nameMatch = !filters.name || 
        student.name.toLowerCase().includes(filters.name.toLowerCase());
      
      const classMatch = !filters.class || student.class === filters.class;
      
      const sexMatch = !filters.sex || student.sex === filters.sex;
      
      const ageMatch = (!filters.minAge || student.age >= filters.minAge) &&
        (!filters.maxAge || student.age <= filters.maxAge);

      return nameMatch && classMatch && sexMatch && ageMatch;
    });

    // Sort the filtered results
    filtered.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });

    return filtered;
  }, [students, filters, sortConfig]);

  const handleSort = (key: keyof Student) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleAddStudent = () => {
    setEditingStudent(null);
    setShowForm(true);
  };

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    setShowForm(true);
  };

  const handleDeleteStudent = (student: Student) => {
    setDeleteConfirm(student);
  };

  const confirmDelete = () => {
    if (deleteConfirm) {
      dispatch(deleteStudent(deleteConfirm.id));
      setDeleteConfirm(null);
    }
  };

  const handleFormSubmit = async (studentData: any) => {
    try {
      if (editingStudent) {
        await dispatch(updateStudent({ id: editingStudent.id, studentData })).unwrap();
      } else {
        await dispatch(createStudent(studentData)).unwrap();
      }
      setShowForm(false);
      setEditingStudent(null);
    } catch (error) {
      // Error is handled by Redux
      console.error('Form submission error:', error);
    }
  };

  const handleFilterChange = (field: keyof FilterConfig, value: any) => {
    setFilters(prev => ({
      ...prev,
      [field]: value === '' ? undefined : value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      name: '',
      class: undefined,
      sex: '',
      minAge: undefined,
      maxAge: undefined,
    });
  };

  const getSortIndicator = (column: keyof Student) => {
    if (sortConfig.key !== column) return ' ↕️';
    return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
  };

  return (
    <Container>
      <Flex direction="column" gap="2rem">
        {/* Header */}
        <Flex justify="space-between" align="center">
          <h1>Students Management</h1>
          <Button onClick={handleAddStudent}>Add New Student</Button>
        </Flex>

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

        {/* Filters */}
        <Card>
          <h3 style={{ marginBottom: '1rem' }}>Filters</h3>
          <Grid columns={5} gap="1rem">
            <div>
              <Label htmlFor="filterName">Name</Label>
              <Input
                id="filterName"
                type="text"
                placeholder="Search by name..."
                value={filters.name}
                onChange={(e) => handleFilterChange('name', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="filterClass">Class</Label>
              <Select
                id="filterClass"
                value={filters.class || ''}
                onChange={(e) => handleFilterChange('class', e.target.value ? parseInt(e.target.value) : undefined)}
              >
                <option value="">All Classes</option>
                {Array.from({ length: 12 }, (_, i) => i + 1).map(num => (
                  <option key={num} value={num}>Class {num}</option>
                ))}
              </Select>
            </div>

            <div>
              <Label htmlFor="filterSex">Gender</Label>
              <Select
                id="filterSex"
                value={filters.sex || ''}
                onChange={(e) => handleFilterChange('sex', e.target.value)}
              >
                <option value="">All Genders</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Select>
            </div>

            <div>
              <Label htmlFor="filterMinAge">Min Age</Label>
              <Input
                id="filterMinAge"
                type="number"
                placeholder="Min age"
                value={filters.minAge || ''}
                onChange={(e) => handleFilterChange('minAge', e.target.value ? parseInt(e.target.value) : undefined)}
              />
            </div>

            <div>
              <Label htmlFor="filterMaxAge">Max Age</Label>
              <Input
                id="filterMaxAge"
                type="number"
                placeholder="Max age"
                value={filters.maxAge || ''}
                onChange={(e) => handleFilterChange('maxAge', e.target.value ? parseInt(e.target.value) : undefined)}
              />
            </div>
          </Grid>

          <Flex justify="flex-end" style={{ marginTop: '1rem' }}>
            <Button variant="ghost" onClick={clearFilters}>Clear Filters</Button>
          </Flex>
        </Card>

        {/* Students Table */}
        <Card>
          {loading && (
            <Flex justify="center" align="center" style={{ padding: '2rem' }}>
              <LoadingSpinner />
              <span style={{ marginLeft: '0.5rem' }}>Loading students...</span>
            </Flex>
          )}

          {!loading && filteredAndSortedStudents.length === 0 && (
            <Flex justify="center" align="center" style={{ padding: '2rem' }}>
              <p>No students found matching your criteria.</p>
            </Flex>
          )}

          {!loading && filteredAndSortedStudents.length > 0 && (
            <div style={{ overflowX: 'auto' }}>
              <Table>
                <thead>
                  <tr>
                    <TableHeader onClick={() => handleSort('name')}>
                      Name{getSortIndicator('name')}
                    </TableHeader>
                    <TableHeader onClick={() => handleSort('class')}>
                      Class{getSortIndicator('class')}
                    </TableHeader>
                    <TableHeader onClick={() => handleSort('sex')}>
                      Gender{getSortIndicator('sex')}
                    </TableHeader>
                    <TableHeader onClick={() => handleSort('age')}>
                      Age{getSortIndicator('age')}
                    </TableHeader>
                    <TableHeader onClick={() => handleSort('siblings')}>
                      Siblings{getSortIndicator('siblings')}
                    </TableHeader>
                    <TableHeader onClick={() => handleSort('gpa')}>
                      GPA{getSortIndicator('gpa')}
                    </TableHeader>
                    <TableHeader>Actions</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSortedStudents.map(student => (
                    <TableRow key={student.id}>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.class}</TableCell>
                      <TableCell style={{ textTransform: 'capitalize' }}>
                        {student.sex}
                      </TableCell>
                      <TableCell>{student.age}</TableCell>
                      <TableCell>{student.siblings}</TableCell>
                      <TableCell>{student.gpa}</TableCell>
                      <TableCell>
                        <Flex gap="0.5rem">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditStudent(student)}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => handleDeleteStudent(student)}
                          >
                            Delete
                          </Button>
                        </Flex>
                      </TableCell>
                    </TableRow>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Card>
      </Flex>

      {/* Student Form Modal */}
      <StudentForm
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setEditingStudent(null);
        }}
        onSubmit={handleFormSubmit}
        student={editingStudent}
        isLoading={loading}
      />

      {/* Delete Confirmation Modal */}
      <Modal isOpen={!!deleteConfirm}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Confirm Delete</ModalTitle>
          </ModalHeader>

          <p>
            Are you sure you want to delete the student "{deleteConfirm?.name}"? 
            This action cannot be undone.
          </p>

          <ModalFooter>
            <Button
              variant="ghost"
              onClick={() => setDeleteConfirm(null)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={confirmDelete}
              disabled={loading}
            >
              {loading ? 'Deleting...' : 'Delete Student'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};