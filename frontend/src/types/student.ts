/**
 * Main student interface representing a student record in the frontend.
 * All properties are required and represent the complete student information.
 * @interface Student
 */
export interface Student {
  /** Unique identifier (converted from backend UUID to string) */
  id: string;
  /** Student's full name */
  name: string;
  /** Class/grade level (1-12) */
  class: number;
  /** Student's gender - restricted to specific values */
  sex: 'male' | 'female';
  /** Student's age in years */
  age: number;
  /** Number of siblings the student has */
  siblings: number;
  /** Grade Point Average as string for form compatibility */
  gpa: string;
}

/**
 * Request payload for creating a new student.
 * Contains all required fields except the auto-generated ID.
 * @interface CreateStudentRequest
 */
export interface CreateStudentRequest {
  /** Student's full name */
  name: string;
  /** Class/grade level (1-12) */
  class: number;
  /** Student's gender */
  sex: 'male' | 'female';
  /** Student's age in years */
  age: number;
  /** Number of siblings */
  siblings: number;
  /** Grade Point Average as string */
  gpa: string;
}

/**
 * Request payload for updating an existing student.
 * Identical to CreateStudentRequest - all fields can be updated.
 * @interface UpdateStudentRequest
 * @extends CreateStudentRequest
 */
export interface UpdateStudentRequest extends CreateStudentRequest {}

/**
 * Redux state shape for student management.
 * Contains all student-related state including loading and error states.
 * @interface StudentState
 */
export interface StudentState {
  /** Array of all students currently loaded */
  students: Student[];
  /** Most recently looked up student (persists across navigation) */
  recentLookup: Student | null;
  /** Loading state for async operations */
  loading: boolean;
  /** Error message from failed operations, null when no error */
  error: string | null;
}

/**
 * Configuration object for table sorting.
 * Specifies which column to sort by and the sort direction.
 * @interface SortConfig
 */
export interface SortConfig {
  /** The student property to sort by */
  key: keyof Student;
  /** Sort direction - ascending or descending */
  direction: 'asc' | 'desc';
}

/**
 * Configuration object for filtering students.
 * All properties are optional to allow partial filtering.
 * @interface FilterConfig
 */
export interface FilterConfig {
  /** Filter by student name (partial match) */
  name?: string;
  /** Filter by specific class number */
  class?: number;
  /** Filter by gender - empty string means no filter */
  sex?: 'male' | 'female' | '';
  /** Minimum age filter (inclusive) */
  minAge?: number;
  /** Maximum age filter (inclusive) */
  maxAge?: number;
}