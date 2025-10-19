import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Student, StudentState, CreateStudentRequest, UpdateStudentRequest } from '../types';
import * as studentService from '../services/studentService';

const initialState: StudentState = {
  students: [],
  recentLookup: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchStudents = createAsyncThunk(
  'students/fetchStudents',
  async (_, { rejectWithValue }) => {
    try {
      return await studentService.getAllStudents();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch students');
    }
  }
);

export const fetchStudentById = createAsyncThunk(
  'students/fetchStudentById',
  async (id: string, { rejectWithValue }) => {
    try {
      return await studentService.getStudentById(id);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch student');
    }
  }
);

export const createStudent = createAsyncThunk(
  'students/createStudent',
  async (studentData: CreateStudentRequest, { rejectWithValue }) => {
    try {
      return await studentService.createStudent(studentData);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to create student');
    }
  }
);

export const updateStudent = createAsyncThunk(
  'students/updateStudent',
  async ({ id, studentData }: { id: string; studentData: UpdateStudentRequest }, { rejectWithValue }) => {
    try {
      return await studentService.updateStudent(id, studentData);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to update student');
    }
  }
);

export const deleteStudent = createAsyncThunk(
  'students/deleteStudent',
  async (id: string, { rejectWithValue }) => {
    try {
      await studentService.deleteStudent(id);
      return id;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to delete student');
    }
  }
);

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    setRecentLookup: (state, action: PayloadAction<Student>) => {
      state.recentLookup = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch students
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch student by ID
      .addCase(fetchStudentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentById.fulfilled, (state, action) => {
        state.loading = false;
        state.recentLookup = action.payload;
      })
      .addCase(fetchStudentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create student
      .addCase(createStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.students.push(action.payload);
      })
      .addCase(createStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update student
      .addCase(updateStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.students.findIndex(s => s.id === action.payload.id);
        if (index !== -1) {
          state.students[index] = action.payload;
        }
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete student
      .addCase(deleteStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.students = state.students.filter(s => s.id !== action.payload);
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setRecentLookup, clearError } = studentSlice.actions;
export default studentSlice.reducer;