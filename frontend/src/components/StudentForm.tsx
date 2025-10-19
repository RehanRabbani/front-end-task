import React, { useState, useEffect } from 'react';
import { Student, CreateStudentRequest } from '../types';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalFooter,
  Button,
  Input,
  Select,
  Label,
  ErrorText,
  Flex,
  Grid,
} from '../styles/components';

interface StudentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (studentData: CreateStudentRequest) => void;
  student?: Student | null;
  isLoading?: boolean;
}

export const StudentForm: React.FC<StudentFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  student,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<CreateStudentRequest>({
    name: '',
    class: 1,
    sex: 'male',
    age: 18,
    siblings: 0,
    gpa: '',
  });

  const [errors, setErrors] = useState<Partial<CreateStudentRequest>>({});

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name,
        class: student.class,
        sex: student.sex,
        age: student.age,
        siblings: student.siblings,
        gpa: student.gpa,
      });
    } else {
      setFormData({
        name: '',
        class: 1,
        sex: 'male',
        age: 18,
        siblings: 0,
        gpa: '',
      });
    }
    setErrors({});
  }, [student, isOpen]);

  const validateForm = (): boolean => {
    const newErrors: Partial<CreateStudentRequest> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (formData.class < 1 || formData.class > 12) {
      newErrors.class = 'Class must be between 1 and 12';
    }

    if (formData.age < 1 || formData.age > 100) {
      newErrors.age = 'Age must be between 1 and 100';
    }

    if (formData.siblings < 0 || formData.siblings > 20) {
      newErrors.siblings = 'Siblings must be between 0 and 20';
    }

    if (!formData.gpa.trim()) {
      newErrors.gpa = 'GPA is required';
    } else {
      const gpaNum = parseFloat(formData.gpa);
      if (isNaN(gpaNum) || gpaNum < 0 || gpaNum > 10) {
        newErrors.gpa = 'GPA must be a number between 0 and 10';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: keyof CreateStudentRequest, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  return (
    <Modal isOpen={isOpen}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>{student ? 'Edit Student' : 'Add New Student'}</ModalTitle>
        </ModalHeader>

        <form onSubmit={handleSubmit}>
          <Grid columns={1} gap="1rem">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                hasError={!!errors.name}
                placeholder="Enter student name"
              />
              {errors.name && <ErrorText>{errors.name}</ErrorText>}
            </div>

            <Grid columns={2} gap="1rem">
              <div>
                <Label htmlFor="class">Class</Label>
                <Select
                  id="class"
                  value={formData.class}
                  onChange={(e) => handleInputChange('class', parseInt(e.target.value))}
                  hasError={!!errors.class}
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(num => (
                    <option key={num} value={num}>Class {num}</option>
                  ))}
                </Select>
                {errors.class && <ErrorText>{errors.class}</ErrorText>}
              </div>

              <div>
                <Label htmlFor="sex">Gender</Label>
                <Select
                  id="sex"
                  value={formData.sex}
                  onChange={(e) => handleInputChange('sex', e.target.value as 'male' | 'female')}
                  hasError={!!errors.sex}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Select>
                {errors.sex && <ErrorText>{errors.sex}</ErrorText>}
              </div>
            </Grid>

            <Grid columns={2} gap="1rem">
              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  min="1"
                  max="100"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 0)}
                  hasError={!!errors.age}
                  placeholder="Enter age"
                />
                {errors.age && <ErrorText>{errors.age}</ErrorText>}
              </div>

              <div>
                <Label htmlFor="siblings">Siblings</Label>
                <Input
                  id="siblings"
                  type="number"
                  min="0"
                  max="20"
                  value={formData.siblings}
                  onChange={(e) => handleInputChange('siblings', parseInt(e.target.value) || 0)}
                  hasError={!!errors.siblings}
                  placeholder="Number of siblings"
                />
                {errors.siblings && <ErrorText>{errors.siblings}</ErrorText>}
              </div>
            </Grid>

            <div>
              <Label htmlFor="gpa">GPA</Label>
              <Input
                id="gpa"
                type="text"
                value={formData.gpa}
                onChange={(e) => handleInputChange('gpa', e.target.value)}
                hasError={!!errors.gpa}
                placeholder="Enter GPA (e.g., 7.25)"
              />
              {errors.gpa && <ErrorText>{errors.gpa}</ErrorText>}
            </div>
          </Grid>

          <ModalFooter>
            <Button type="button" variant="ghost" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : (student ? 'Update Student' : 'Add Student')}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};