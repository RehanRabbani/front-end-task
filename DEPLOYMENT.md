# Safepay Students Management - Deployment Guide

This guide explains how to set up and run the Safepay Students Management application.

## 🚀 Quick Start

### Option 1: Automated Start (Recommended)
```bash
# From the safepay-frontend-interview-task directory
./start-app.sh
```

This script will:
- Start the backend server on port 5000
- Install frontend dependencies (if needed)
- Start the frontend development server on port 3000
- Provide helpful information about endpoints

### Option 2: Manual Start

#### Backend Server
```bash
# From the safepay-frontend-interview-task directory
./run_server
```

#### Frontend Application
```bash
# From the frontend directory
cd frontend
npm install  # First time only
npm run dev
```

## 📋 Prerequisites

### System Requirements
- **Node.js**: Version 18 or higher
- **npm**: Comes with Node.js
- **Python**: Version 3.x (for backend server)

### Verification
```bash
node --version   # Should be v18.x.x or higher
npm --version    # Should be 8.x.x or higher
python3 --version # Should be 3.x.x
```

## 🌐 Application URLs

Once both servers are running:

- **Frontend Application**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 🔧 Troubleshooting

### Port Conflicts
If ports 3000 or 5000 are already in use:

**Frontend (port 3000)**:
```bash
# Kill process using port 3000
lsof -ti:3000 | xargs kill -9

# Or set a different port
export PORT=3001
npm run dev
```

**Backend (port 5000)**:
```bash
# Kill process using port 5000
lsof -ti:5000 | xargs kill -9
```

### Dependencies Issues
```bash
# Clear npm cache and reinstall
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Network/Proxy Issues
If you're behind a corporate firewall:
```bash
# Set npm proxy (replace with your proxy details)
npm config set proxy http://your-proxy:port
npm config set https-proxy http://your-proxy:port

# Or try using yarn instead of npm
npm install -g yarn
yarn install
yarn dev
```

## 📁 Project Structure Overview

```
safepay-frontend-interview-task/
├── start-app.sh           # Automated startup script
├── run_server             # Backend server launcher
├── server/                # Python backend code
├── frontend/              # React TypeScript application
│   ├── src/              # Source code
│   ├── public/           # Static assets
│   ├── package.json      # Dependencies
│   └── vite.config.ts    # Build configuration
└── README.md             # This file
```

## 🎯 Using the Application

### Students Grid Page (/)
1. **View all students** in a sortable, filterable table
2. **Add new students** using the "Add New Student" button
3. **Edit students** by clicking the "Edit" button in any row
4. **Delete students** by clicking the "Delete" button (with confirmation)
5. **Filter students** using the filter controls above the table
6. **Sort students** by clicking on any column header

### Student Lookup Page (/lookup)
1. **Search by ID** using the search box
2. **View detailed information** in a card format
3. **Recent lookup persists** when navigating between pages

## 🔌 API Integration

The frontend automatically connects to the backend API. The backend provides:

### Endpoints
- `GET /students` - Retrieve all students
- `GET /student/:id` - Get a specific student
- `POST /student` - Create a new student
- `PUT /student/:id` - Update an existing student
- `DELETE /student/:id` - Delete a student

### Sample Student Data Format
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "name": "John Doe",
  "class": 10,
  "sex": "male",
  "age": 16,
  "siblings": 2,
  "gpa": "8.5"
}
```

## 🚀 Production Deployment

### Building for Production
```bash
cd frontend
npm run build
```

This creates a `dist` folder with optimized static files.

### Deployment Options

#### Option 1: Static Hosting (Netlify, Vercel)
1. Build the frontend (`npm run build`)
2. Deploy the `dist` folder
3. Configure redirects for SPA routing
4. Set up proxy/API routes to your backend

#### Option 2: Docker Deployment
```dockerfile
# Example Dockerfile for frontend
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

#### Option 3: Traditional Server
1. Build the application
2. Serve the `dist` folder with any web server (nginx, apache)
3. Configure reverse proxy to backend API

## 🔐 Environment Configuration

### Development
```bash
# frontend/.env
VITE_API_BASE_URL=http://localhost:5000
```

### Production
```bash
# frontend/.env.production
VITE_API_BASE_URL=https://your-api-server.com
```

## 📊 Performance Optimization

The application is optimized for performance with:
- **Code splitting**: Automatic route-based splitting
- **Tree shaking**: Unused code elimination
- **Asset optimization**: Images and bundles are optimized
- **Caching**: Browser caching for static assets

## 🧪 Development Workflow

### Making Changes
1. **Backend changes**: Restart `./run_server`
2. **Frontend changes**: Hot reload automatically updates
3. **New dependencies**: Run `npm install` in frontend directory

### Debugging
- **Frontend**: Use browser DevTools + React DevTools
- **Backend**: Check terminal output for Python server
- **Network**: Use browser Network tab to inspect API calls
- **State**: Redux DevTools extension for state debugging

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Verify all prerequisites are met
3. Check console logs for specific error messages
4. Ensure both servers are running and accessible