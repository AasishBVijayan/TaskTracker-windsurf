import React, { useState } from 'react';
import { Task } from '../types';
import { 
  CheckCircleIcon, 
  PencilIcon, 
  TrashIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete }) => {
  const [activeTab, setActiveTab] = useState('All');
  const [sortBy, setSortBy] = useState('dueDate');

  const filteredTasks = tasks.filter(task => {
    if (activeTab === 'All') return true;
    return task.status === activeTab;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'dueDate') {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    return 0;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'To-Do': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-orange-100 text-orange-800';
      case 'Low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const isOverdue = (task: Task) => {
    return new Date(task.dueDate) < new Date() && task.status !== 'Completed';
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Tabs */}
      <div className="border-b">
        <nav className="flex space-x-8 px-6" aria-label="Tabs">
          {['All', 'To-Do', 'In Progress', 'Completed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Sort */}
      <div className="px-6 py-3 border-b flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="dueDate">Due Date</option>
            <option value="createdAt">Created Date</option>
            <option value="priority">Priority</option>
          </select>
        </div>
      </div>

      {/* Task List */}
      <div className="divide-y divide-gray-200">
        {sortedTasks.map((task) => (
          <div key={task._id} className="p-4 hover:bg-gray-50">
            <div className="flex items-center space-x-4">
              {/* Status Indicator */}
              <div className="flex-shrink-0">
                <div className={`w-1 h-12 rounded-full ${
                  task.status === 'To-Do' ? 'bg-blue-500' :
                  task.status === 'In Progress' ? 'bg-yellow-500' :
                  task.status === 'Completed' ? 'bg-green-500' : 'bg-gray-500'
                }`}></div>
              </div>

              {/* Task Info */}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">{task.title}</h3>
                  <div className="flex items-center space-x-2">
                    {/* Status Badge */}
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      isOverdue(task) ? 'bg-red-100 text-red-800' : getStatusColor(task.status)
                    }`}>
                      {isOverdue(task) ? 'Overdue' : task.status}
                    </span>
                    
                    {/* Priority Badge */}
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  Due {new Date(task.dueDate).toLocaleDateString()}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                {task.status !== 'Completed' && (
                  <button
                    onClick={() => {/* Mark as complete logic */}}
                    className="p-1 text-green-600 hover:text-green-900"
                    title="Mark as complete"
                  >
                    <CheckCircleIcon className="h-5 w-5" />
                  </button>
                )}
                <button
                  onClick={() => onEdit(task)}
                  className="p-1 text-gray-400 hover:text-gray-600"
                  title="Edit"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onDelete(task._id)}
                  className="p-1 text-gray-400 hover:text-red-600"
                  title="Delete"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
