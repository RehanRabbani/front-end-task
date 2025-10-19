import axios from 'axios';
import { Student, CreateStudentRequest, UpdateStudentRequest } from '../types';

/**
 * Base URL for all API requests. Uses Vite proxy to forward to backend server.
 * @constant {string}
 */
const API_BASE_URL = '/api';

/**
 * Axios instance configured for the student API.
 * Includes default headers and base URL configuration.
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

/**
 * Backend response type representing the raw student data from the Python API.
 * This interface matches the exact structure returned by the Flask backend.
 * @interface BackendStudent
 */
interface BackendStudent {
  /** Unique identifier from SQLite database (auto-increment integer) */
  uuid: number;
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
  /** Grade Point Average - could be number or string from backend */
  gpa: number | string;
}

/**
 * Transforms a backend student object to frontend format.
 * Converts uuid (number) to id (string) and ensures GPA is a string.
 * @param {BackendStudent} backendStudent - Raw student data from Python API
 * @returns {Student} Student object formatted for frontend use
 */
const transformStudentFromBackend = (backendStudent: BackendStudent): Student => {
  return {
    id: backendStudent.uuid.toString(), // Convert uuid to string id
    name: backendStudent.name,
    class: backendStudent.class,
    sex: backendStudent.sex,
    age: backendStudent.age,
    siblings: backendStudent.siblings,
    gpa: String(backendStudent.gpa), // Convert to string safely
  };
};

/**
 * Transforms frontend student data to backend format.
 * Converts GPA from string to number for Python API compatibility.
 * @param {CreateStudentRequest | UpdateStudentRequest} studentData - Student data from frontend forms
 * @returns {Object} Student data formatted for backend API
 */
const transformStudentToBackend = (studentData: CreateStudentRequest | UpdateStudentRequest) => {
  return {
    name: studentData.name,
    class: studentData.class,
    sex: studentData.sex,
    age: studentData.age,
    siblings: studentData.siblings,
    gpa: parseFloat(studentData.gpa), // Convert string to number
  };
};

/**
 * Retrieves all students from the backend API.
 * Transforms backend format to frontend format automatically.
 * @returns {Promise<Student[]>} Promise resolving to array of students
 * @throws {Error} When API request fails or network error occurs
 */
export const getAllStudents = async (): Promise<Student[]> => {
  const response = await api.get('/students');
  const backendStudents: BackendStudent[] = response.data;
  return backendStudents.map(transformStudentFromBackend);
};

/**
 * Retrieves a specific student by their ID.
 * @param {string} id - The student's unique identifier (UUID)
 * @returns {Promise<Student>} Promise resolving to student data
 * @throws {Error} When student not found or API request fails
 */
export const getStudentById = async (id: string): Promise<Student> => {
  const response = await api.get(`/student/${id}`);
  const backendStudent: BackendStudent = response.data;
  return transformStudentFromBackend(backendStudent);
};

/**
 * Creates a new student record in the database.
 * @param {CreateStudentRequest} studentData - New student information
 * @returns {Promise<Student>} Promise resolving to created student data
 * @throws {Error} When validation fails or API request fails
 */
export const createStudent = async (studentData: CreateStudentRequest): Promise<Student> => {
  const backendData = transformStudentToBackend(studentData);
  const response = await api.post('/student', backendData);
  
  // The backend returns { uuid: number }
  const createdUuid = response.data.uuid;
  
  // We need to fetch the created student to get all data
  return getStudentById(createdUuid.toString());
};

/**
 * Updates an existing student's information.
 * @param {string} id - The student's unique identifier
 * @param {UpdateStudentRequest} studentData - Updated student information
 * @returns {Promise<Student>} Promise resolving to updated student data
 * @throws {Error} When student not found or API request fails
 */
export const updateStudent = async (id: string, studentData: UpdateStudentRequest): Promise<Student> => {
  const backendData = transformStudentToBackend(studentData);
  await api.put(`/student/${id}`, backendData);
  
  // Fetch the updated student data
  return getStudentById(id);
};

/**
 * Deletes a student record from the database.
 * @param {string} id - The student's unique identifier
 * @returns {Promise<void>} Promise that resolves when deletion is complete
 * @throws {Error} When student not found or API request fails
 */
export const deleteStudent = async (id: string): Promise<void> => {
  await api.delete(`/student/${id}`);
};