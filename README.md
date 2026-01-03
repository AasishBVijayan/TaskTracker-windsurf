# Task Tracker Web Application (TaskTracker-windsurf)

A full-stack task management application built with React, Node.js, Express, MongoDB, and JWT authentication.

## Features

### Core Features
- **User Authentication**: Sign up, login, logout with JWT tokens
- **Task Management**: Create, read, update, and delete tasks
- **Task Organization**: Filter by status and priority, sort by due date
- **Dashboard**: Overview of task statistics and visual task cards
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Subtasks**: Add subtasks to any task for better organization
- **Dark/Light Mode**: Toggle between themes for comfortable viewing
- **Profile Management**: Edit user profile information

### Technical Features
- JWT-based authentication with secure token handling
- Password hashing with bcryptjs
- Input validation and error handling
- RESTful API architecture
- MongoDB with Mongoose ODM
- React with TypeScript
- Tailwind CSS for modern UI
- Protected routes and middleware

## Tech Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- Axios for API calls
- Heroicons for icons
- Headless UI components

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- Express-validator for input validation
- CORS for cross-origin requests

## Project Structure

```
demo/
├── server/                 # Backend application
│   ├── config/            # Database configuration
│   ├── middleware/        # Authentication middleware
│   ├── models/            # MongoDB models (User, Task, Subtask)
│   ├── routes/            # API routes (auth, tasks, subtasks)
│   ├── server.js          # Express server entry point
│   ├── package.json       # Backend dependencies
│   └── .env.example       # Environment variables template
├── client/                # Frontend application
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── context/       # React context (Auth, Theme)
│   │   ├── types/         # TypeScript type definitions
│   │   ├── utils/         # Utility functions (API)
│   │   ├── App.tsx        # Main App component
│   │   └── index.tsx      # Entry point
│   ├── package.json       # Frontend dependencies
│   ├── tailwind.config.js # Tailwind configuration
│   └── .env.example       # Environment variables template
└── README.md              # This file
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### 1. Clone and Install Dependencies

```bash
# Navigate to the project directory
cd demo

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 2. Environment Setup

#### Backend Environment
Create a `.env` file in the `server` directory:

```bash
cd server
cp .env.example .env
```

Update the `.env` file with your configuration:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/tasktracker

# JWT
JWT_SECRET=your_super_secret_jwt_key_make_it_long_and_random
JWT_EXPIRE=30d

# Server
PORT=5001
NODE_ENV=development

# Client URL (for CORS)
CLIENT_URL=http://localhost:3000
```

#### Frontend Environment
Create a `.env` file in the `client` directory:

```bash
cd client
cp .env.example .env
```

The frontend `.env` file should contain:

```env
# API URL
REACT_APP_API_URL=http://localhost:5001/api
```

### 3. Database Setup

#### Option 1: Local MongoDB
Make sure MongoDB is running on your system:
```bash
# Start MongoDB service (varies by OS)
# On Windows: net start MongoDB
# On macOS: brew services start mongodb-community
# On Linux: sudo systemctl start mongod
```

#### Option 2: MongoDB Atlas
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Update the `MONGODB_URI` in your server `.env` file

### 4. Running the Application

#### Start the Backend Server
```bash
cd server
npm run dev
```
The server will start on `http://localhost:5001`

#### Start the Frontend Development Server
Open a new terminal:
```bash
cd client
npm start
```
The frontend will start on `http://localhost:3000`

### 5. Using the Application

1. **Register**: Create a new account at `http://localhost:3000/register`
2. **Login**: Sign in at `http://localhost:3000/login`
3. **Dashboard**: View task statistics and overview
4. **My Tasks**: Full task management interface
5. **Completed**: View completed tasks only
6. **Calendar**: Monthly calendar view with tasks
7. **Create Tasks**: Click "Add New Task" to add tasks
8. **Manage Tasks**: Edit or delete existing tasks
9. **Subtasks**: Add subtasks to any existing task
10. **Profile**: Edit your profile information
11. **Theme**: Toggle between dark and light modes

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `PUT /api/auth/profile` - Update user profile

### Tasks
- `GET /api/tasks` - Get all user tasks (with query params for filtering/sorting)
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

### Subtasks
- `GET /api/subtasks/task/:taskId` - Get all subtasks for a task
- `POST /api/subtasks` - Create a new subtask
- `PUT /api/subtasks/:id` - Update a subtask
- `DELETE /api/subtasks/:id` - Delete a subtask

### Query Parameters for Tasks
- `status`: Filter by status (`To-Do`, `In Progress`, `Completed`)
- `priority`: Filter by priority (`Low`, `Medium`, `High`)
- `sort`: Sort tasks (`createdAt`, `dueDate`, `-dueDate`)

## Data Models

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date (default: Date.now)
}
```

### Task Model
```javascript
{
  title: String (required),
  description: String (optional),
  status: String (enum: ['To-Do', 'In Progress', 'Completed'], default: 'To-Do'),
  priority: String (enum: ['Low', 'Medium', 'High'], default: 'Medium'),
  dueDate: Date (required),
  user: ObjectId (ref: 'User', required),
  createdAt: Date (default: Date.now)
}
```

### Subtask Model
```javascript
{
  title: String (required),
  completed: Boolean (default: false),
  task: ObjectId (ref: 'Task', required),
  user: ObjectId (ref: 'User', required),
  createdAt: Date (default: Date.now)
}
```

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs for secure password storage
- **Input Validation**: Express-validator for API input validation
- **CORS Protection**: Configured for specific frontend origin
- **Protected Routes**: Authentication middleware for sensitive endpoints

## Development

### Running Tests
```bash
# Backend tests
cd server
npm test

# Frontend tests
cd client
npm test
```

### Building for Production
```bash
# Build frontend
cd client
npm run build

# Start production server
cd ../server
npm start
```

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check your MONGODB_URI in .env file
   - Verify network connectivity for MongoDB Atlas

2. **CORS Errors**
   - Ensure CLIENT_URL in server .env matches your frontend URL
   - Check that both servers are running on correct ports

3. **Authentication Issues**
   - Clear browser localStorage if experiencing token issues
   - Verify JWT_SECRET is set in server .env

4. **Port Conflicts**
   - Change PORT in server .env if 5001 is in use
   - Frontend automatically uses next available port if 3000 is busy

### Environment Variables Checklist
- [ ] Server `.env` has MONGODB_URI
- [ ] Server `.env` has JWT_SECRET (long and random)
- [ ] Server `.env` has CLIENT_URL
- [ ] Client `.env` has REACT_APP_API_URL

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
