import React from 'react';
import { Task } from '../types';
import { PencilIcon, TrashIcon, CalendarIcon } from '@heroicons/react/24/outline';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'To-Do':
        return 'bg-blue-100 text-blue-800';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Low':
        return 'bg-gray-100 text-gray-800';
      case 'Medium':
        return 'bg-orange-100 text-orange-800';
      case 'High':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'Completed';

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex-1 mr-2">{task.title}</h3>
        <div className="flex space-x-1">
          <button
            onClick={() => onEdit(task)}
            className="p-1 text-gray-400 hover:text-indigo-600 transition-colors"
          >
            <PencilIcon className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{task.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
          {task.status}
        </span>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
          {task.priority}
        </span>
      </div>

      <div className="flex items-center text-sm text-gray-500">
        <CalendarIcon className="h-4 w-4 mr-1" />
        <span className={isOverdue ? 'text-red-600 font-medium' : ''}>
          {new Date(task.dueDate).toLocaleDateString()}
          {isOverdue && ' (Overdue)'}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;
