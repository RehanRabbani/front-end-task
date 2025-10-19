# Safepay Students Management System

A full-stack web application for managing student records with modern React frontend and Python Flask backend.

## 🚀 Quick Start

```bash
./start-app.sh
```

## 📋 Prerequisites

- **Python 3.x** - Backend server
- **Node.js 16+** - Frontend development
- **npm** - Package management

## 🏗️ Project Structure

```
safepay-frontend-interview-task/
├── 📁 frontend/                    # React TypeScript application
│   ├── src/
│   │   ├── components/            # Reusable UI components
│   │   ├── pages/                 # Main application pages
│   │   ├── store/                 # Redux state management
│   │   ├── services/              # API integration layer
│   │   ├── styles/                # Styled-components theme
│   │   └── types/                 # TypeScript definitions
│   ├── package.json
│   └── vite.config.ts
├── 📁 server/                      # Python Flask backend
│   ├── server.py                  # Main server file
│   └── student_api.py             # API endpoints
├── 📁 server_unittests/           # Backend tests
├── 📁 Logos/                      # Safepay brand assets
├── run_server                     # Backend startup script
├── start-app.sh                   # Full application startup
└── README.md
```

## 🎯 Features

### Frontend (React + TypeScript)
- **📊 Students Grid Page**: CRUD operations with sorting and filtering
- **🔍 Student Lookup Page**: ID-based search with persistent state
- **🎨 Styled Components**: Safepay brand theme with responsive design
- **🔄 Redux State Management**: Persistent data across navigation
- **🛡️ Error Boundary**: Graceful error handling
- **📱 Responsive Design**: Mobile-friendly interface

### Backend (Python Flask)
- **REST API**: Full CRUD operations for student management
- **SQLite Database**: Lightweight data persistence
- **UUID Generation**: Unique student identifiers
- **CORS Support**: Cross-origin resource sharing

## 🌐 Application URLs

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/students` | Get all students |
| POST | `/api/students` | Create new student |
| GET | `/api/student/:id` | Get student by ID |
| PUT | `/api/student/:id` | Update student |
| DELETE | `/api/student/:id` | Delete student |

## 🎨 Frontend Technology Stack

- **React 18** - Component library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Redux Toolkit** - State management
- **Styled Components** - CSS-in-JS styling
- **React Router** - Client-side routing
- **Axios** - HTTP client

## 🐍 Backend Technology Stack

- **Python 3** - Runtime
- **Flask** - Web framework
- **SQLite** - Database
- **UUID** - Unique identifiers

## 📖 Usage Guide

### Students Grid Page (/)
1. **View Students**: All students displayed in sortable table
2. **Add Student**: Click "Add Student" button to open form
3. **Edit Student**: Click "Edit" button on any row
4. **Delete Student**: Click "Delete" with confirmation dialog
5. **Filter**: Use search box and year dropdown
6. **Sort**: Click column headers to sort data

### Student Lookup Page (/lookup)
1. **Search**: Enter student ID in search box
2. **View Details**: Student information displayed in card format
3. **Persistence**: Last searched student remains when navigating away
4. **Error Handling**: Clear messages for invalid IDs

## 🧪 Testing

### Backend Tests
```bash
cd server_unittests
python -m pytest
```

### Frontend Development
```bash
cd frontend
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 🔧 Development Features

### Frontend
- **Hot Reload**: Instant updates during development
- **TypeScript**: Full type checking and IntelliSense
- **ESLint**: Code quality and style enforcement
- **Vite**: Fast build tool with HMR

### Backend
- **Auto-reload**: Development server restarts on changes
- **CORS**: Configured for frontend development
- **Error Handling**: Comprehensive error responses

## 🎨 Design System

The application follows Safepay's brand guidelines:
- **Primary Color**: Navy Blue (#1E3A8A)
- **Secondary Color**: Gold (#F59E0B)
- **Typography**: Clean, professional fonts
- **Components**: Consistent styled-components library
- **Responsive**: Mobile-first design approach

## 🐛 Troubleshooting

### Common Issues

**Port 3000/5000 already in use:**
```bash
# Kill processes on ports
lsof -ti:3000 | xargs kill -9
lsof -ti:5000 | xargs kill -9
```

**Frontend dependencies issues:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

**Backend not starting:**
```bash
# Check Python version
python3 --version

# Ensure run_server is executable
chmod +x run_server
```

## 🚦 Stopping the Application

```bash
# If using start-app.sh
Press Ctrl+C

# Manual stop
lsof -ti:3000,5000 | xargs kill -9
```

## 📚 Additional Resources

- **Postman Collection**: `Students.postman_collection.json` - API testing
- **Brand Guide**: `Brand Guide - Safepay.pdf` - Design guidelines
- **Logos**: `/Logos/` directory - Safepay brand assets

## 🔗 Project Requirements

This application fulfills the take-home task requirements:

✅ **React + TypeScript frontend**  
✅ **Styled Components with Safepay branding**  
✅ **Two-page application with React Router**  
✅ **Students grid with CRUD operations**  
✅ **Student lookup with persistent state**  
✅ **Redux state management**  
✅ **Responsive design**  
✅ **Modern React with hooks**  

---

**Built with ❤️ for Safepay**
