import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { 
  HomeIcon, 
  CheckCircleIcon, 
  CalendarIcon, 
  UserIcon,
  CogIcon,
  ArrowRightOnRectangleIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  BellIcon,
  SunIcon,
  MoonIcon,
  PencilIcon
} from '@heroicons/react/24/outline';
import TaskModal from './TaskModal';
import EditProfileModal from './EditProfileModal';
import api from '../utils/api';
import { Task } from '../types';

interface TaskFlowLayoutProps {
  children: React.ReactNode;
}

const TaskFlowLayout: React.FC<TaskFlowLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleAddTask = () => {
    setEditingTask(null);
    setShowModal(true);
  };

  const handleTaskSaved = () => {
    setShowModal(false);
    setEditingTask(null);
    window.location.reload(); // Refresh to show new task
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-blue-600 dark:bg-blue-800 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-blue-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10c0 5.55 3.84 10 9 10h4c5.16 0 9-4.48 9-10s-3.84-10-9-10H9c-5.16 0-9 4.48-9 10v3c0 .55.45 1 1 1h4c.55 0 1-.45 1-1V7c0-.55-.45-1-1-1H9c-.55 0-1 .45-1 1z"/>
              </svg>
            </div>
            <span className="text-white text-xl font-semibold">TaskFlow</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 pl-10 bg-blue-700 text-white placeholder-blue-200 rounded-lg focus:outline-none focus:bg-blue-800"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-blue-200" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => handleNavigation('/dashboard')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive('/dashboard') 
                    ? 'bg-blue-700 text-white' 
                    : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                }`}
              >
                <HomeIcon className="h-5 w-5" />
                <span>Dashboard</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation('/my-tasks')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive('/my-tasks') 
                    ? 'bg-blue-700 text-white' 
                    : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                }`}
              >
                <UserIcon className="h-5 w-5" />
                <span>My Tasks</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation('/completed')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive('/completed') 
                    ? 'bg-blue-700 text-white' 
                    : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                }`}
              >
                <CheckCircleIcon className="h-5 w-5" />
                <span>Completed</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation('/calendar')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive('/calendar') 
                    ? 'bg-blue-700 text-white' 
                    : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                }`}
              >
                <CalendarIcon className="h-5 w-5" />
                <span>Calendar</span>
              </button>
            </li>
          </ul>
        </nav>

        {/* Add New Task Button */}
        <div className="p-4">
          <button 
            onClick={handleAddTask}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50"
          >
            <PlusIcon className="h-5 w-5" />
            <span>Add New Task</span>
          </button>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-blue-700">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center space-x-3">
              <img
                src={`https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=3B82F6&color=fff`}
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <div className="text-white font-medium">{user?.name || 'John Doe'}</div>
                <div className="text-blue-200 text-sm">{user?.email || 'john.doe@example.com'}</div>
              </div>
            </div>
            <button
              onClick={() => setShowProfileModal(true)}
              className="text-blue-200 hover:text-white p-1"
              title="Edit Profile"
            >
              <PencilIcon className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-4 space-y-2 px-4">
            <a href="#" className="flex items-center space-x-2 text-blue-100 hover:text-white">
              <CogIcon className="h-4 w-4" />
              <span>Settings</span>
            </a>
            <button
              onClick={toggleTheme}
              className="flex items-center space-x-2 text-blue-100 hover:text-white w-full text-left"
            >
              {theme === 'dark' ? (
                <SunIcon className="h-4 w-4" />
              ) : (
                <MoonIcon className="h-4 w-4" />
              )}
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
            <button
              onClick={logout}
              className="flex items-center space-x-2 text-blue-100 hover:text-white w-full text-left"
            >
              <ArrowRightOnRectangleIcon className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex-1 max-w-xl">
              <input
                type="text"
                placeholder="Search"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100">
                <BellIcon className="h-6 w-6" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              <img
                src={`https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=3B82F6&color=fff`}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>

      {/* Task Modal */}
      {showModal && (
        <TaskModal
          task={editingTask}
          onClose={() => setShowModal(false)}
          onSave={handleTaskSaved}
        />
      )}

      {/* Edit Profile Modal */}
      {showProfileModal && (
        <EditProfileModal onClose={() => setShowProfileModal(false)} />
      )}
    </div>
  );
};

export default TaskFlowLayout;
