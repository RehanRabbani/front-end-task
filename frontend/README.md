# Safepay Students Management Frontend

A modern React TypeScript application for managing a database of students with full CRUD operations, filtering, sorting, and search functionality.

## 🚀 Features

### Students Grid Page
- **Complete CRUD Operations**: Add, edit, update, and delete students
- **Advanced Filtering**: Filter by name, class, gender, and age range
- **Multi-column Sorting**: Click any column header to sort (with visual indicators)
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Real-time Validation**: Form validation with clear error messages
- **Modal-based Forms**: Clean UI with modal dialogs for adding/editing

### Student Lookup Page
- **ID-based Search**: Find students by their unique identifier
- **Card-based Display**: Beautiful card layout showing all student information
- **Persistent State**: Recent lookup is maintained across page navigation using Redux
- **Error Handling**: Clear feedback for invalid IDs or network errors

### Technical Features
- **Modern React**: Functional components with hooks
- **TypeScript**: Full type safety and IntelliSense support
- **Redux Toolkit**: State management with RTK Query patterns
- **Styled Components**: Component-based styling with Safepay brand colors
- **React Router**: Client-side routing between pages
- **Responsive Design**: Mobile-first approach with breakpoint-based layouts

## 🛠 Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and building
- **State Management**: Redux Toolkit with React Redux hooks
- **Styling**: Styled Components with custom theme system
- **Routing**: React Router DOM v6
- **HTTP Client**: Axios for API communication
- **Development**: Hot reload, TypeScript checking, ESLint

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navigation.tsx   # Main navigation bar
│   │   └── StudentForm.tsx  # Modal form for add/edit
│   ├── pages/              # Main application pages
│   │   ├── StudentsPage.tsx        # Grid view with CRUD
│   │   └── StudentLookupPage.tsx   # Search and card view
│   ├── store/              # Redux store configuration
│   │   ├── index.ts        # Store setup and types
│   │   ├── hooks.ts        # Typed Redux hooks
│   │   └── studentSlice.ts # Student state management
│   ├── services/           # API service layer
│   │   └── studentService.ts # HTTP client functions
│   ├── styles/             # Styling and theming
│   │   ├── theme.ts        # Design system tokens
│   │   ├── components.ts   # Styled components library
│   │   └── GlobalStyles.ts # Global CSS reset and styles
│   ├── types/              # TypeScript type definitions
│   │   ├── index.ts        # Exported types
│   │   └── student.ts      # Student-related interfaces
│   ├── assets/             # Static assets
│   │   └── Logos/          # Safepay brand logos
│   ├── App.tsx             # Root application component
│   └── main.tsx            # Application entry point
├── public/                 # Static public assets
├── index.html              # HTML template
├── package.json            # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite build configuration
└── README.md              # This file
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ and npm
- The backend server running on `http://localhost:5000`

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## 🎨 Design System

The application uses a comprehensive design system based on Safepay's branding:

### Color Palette
- **Primary**: Navy blue tones (#1E3A8A, #3B82F6)
- **Secondary**: Amber/gold accents (#F59E0B, #FCD34D)
- **Neutrals**: Gray scale for text and backgrounds
- **Status Colors**: Success (green), warning (amber), error (red)

### Typography
- **Font Family**: Inter (primary), JetBrains Mono (monospace)
- **Type Scale**: From 12px (xs) to 36px (4xl)
- **Weights**: Normal (400), Medium (500), Semibold (600), Bold (700)

### Component Library
All UI components are built with styled-components and include:
- Buttons (5 variants, 3 sizes)
- Forms (inputs, selects, labels with validation states)
- Cards and containers
- Tables with sorting capabilities
- Modals and overlays
- Loading spinners and error states

## 🔧 API Integration

The frontend communicates with the backend through a service layer that handles:

### Endpoints Used
- `GET /students` - Fetch all students
- `GET /student/:id` - Fetch student by ID
- `POST /student` - Create new student
- `PUT /student/:id` - Update existing student
- `DELETE /student/:id` - Delete student

### Error Handling
- Network errors are caught and displayed to users
- Validation errors show specific field feedback
- Loading states provide user feedback during operations

## 📱 Responsive Design

The application is fully responsive with:
- **Mobile-first approach**: Designed for mobile, enhanced for desktop
- **Breakpoints**: 480px, 640px, 768px, 1024px, 1280px, 1536px
- **Flexible layouts**: Grid and flexbox-based responsive components
- **Touch-friendly**: Appropriate touch targets and spacing

## 🧪 State Management

Redux Toolkit is used for predictable state management:

### Student Slice
- **State**: Students list, recent lookup, loading status, errors
- **Actions**: CRUD operations with async thunks
- **Selectors**: Typed selectors for component access
- **Persistence**: Recent lookup persists across navigation

### Benefits
- **Predictable updates**: All state changes go through reducers
- **Time travel debugging**: Redux DevTools support
- **Performance**: Only re-render components when relevant data changes
- **Type safety**: Full TypeScript integration

## 🚀 Production Deployment

To deploy the application:

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting service

3. **Configure proxy**: Ensure API calls are proxied to your backend server

### Environment Variables
Create a `.env` file for environment-specific configuration:
```
VITE_API_BASE_URL=http://localhost:5000
```

## 🔒 Security Considerations

- Input validation on all forms
- XSS protection through React's built-in escaping
- CORS handling through Vite proxy configuration
- No sensitive data stored in localStorage

## 🎯 Future Enhancements

Potential improvements for the application:
- **Pagination**: Handle large datasets efficiently
- **Bulk operations**: Select multiple students for bulk actions
- **Export functionality**: CSV/Excel export of student data
- **Advanced search**: Full-text search with highlighting
- **Drag & drop**: File upload for student photos
- **Dashboard**: Analytics and reporting features
- **Real-time updates**: WebSocket integration for live data
- **Offline support**: Service worker for offline functionality

## 🤝 Contributing

1. Follow the existing code style and patterns
2. Write TypeScript for all new code
3. Use the established component library
4. Test thoroughly across different screen sizes
5. Update documentation for new features

## 📄 License

This project is part of the Safepay frontend interview task.