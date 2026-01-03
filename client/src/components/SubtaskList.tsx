import React, { useState, useEffect } from 'react';
import { Subtask } from '../types';
import api from '../utils/api';
import { PlusIcon, TrashIcon, CheckIcon } from '@heroicons/react/24/outline';

interface SubtaskListProps {
  taskId: string;
}

const SubtaskList: React.FC<SubtaskListProps> = ({ taskId }) => {
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubtasks();
  }, [taskId]);

  const fetchSubtasks = async () => {
    try {
      const response = await api.get(`/subtasks/task/${taskId}`);
      setSubtasks(response.data.data);
    } catch (error) {
      console.error('Error fetching subtasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSubtask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubtaskTitle.trim()) return;

    try {
      const response = await api.post('/subtasks', {
        title: newSubtaskTitle,
        task: taskId,
      });
      setSubtasks([...subtasks, response.data.data]);
      setNewSubtaskTitle('');
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding subtask:', error);
    }
  };

  const handleToggleSubtask = async (subtaskId: string, completed: boolean) => {
    try {
      await api.put(`/subtasks/${subtaskId}`, { completed: !completed });
      setSubtasks(subtasks.map(subtask => 
        subtask._id === subtaskId 
          ? { ...subtask, completed: !completed }
          : subtask
      ));
    } catch (error) {
      console.error('Error updating subtask:', error);
    }
  };

  const handleDeleteSubtask = async (subtaskId: string) => {
    try {
      await api.delete(`/subtasks/${subtaskId}`);
      setSubtasks(subtasks.filter(subtask => subtask._id !== subtaskId));
    } catch (error) {
      console.error('Error deleting subtask:', error);
    }
  };

  if (loading) {
    return <div className="text-sm text-gray-500">Loading subtasks...</div>;
  }

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-medium text-gray-900">Subtasks</h4>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800"
        >
          <PlusIcon className="h-4 w-4" />
          <span>Add Subtask</span>
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddSubtask} className="mb-3">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newSubtaskTitle}
              onChange={(e) => setNewSubtaskTitle(e.target.value)}
              placeholder="Enter subtask title"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <button
              type="submit"
              className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {subtasks.length === 0 ? (
        <div className="text-sm text-gray-500 italic">No subtasks yet. Add one above!</div>
      ) : (
        <div className="space-y-2">
          {subtasks.map((subtask) => (
            <div
              key={subtask._id}
              className="flex items-center space-x-3 p-2 bg-gray-50 rounded-md"
            >
              <button
                onClick={() => handleToggleSubtask(subtask._id, subtask.completed)}
                className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center ${
                  subtask.completed
                    ? 'bg-blue-600 border-blue-600'
                    : 'border-gray-300 hover:border-blue-600'
                }`}
              >
                {subtask.completed && (
                  <CheckIcon className="h-3 w-3 text-white" />
                )}
              </button>
              <span
                className={`flex-1 text-sm ${
                  subtask.completed ? 'line-through text-gray-500' : 'text-gray-900'
                }`}
              >
                {subtask.title}
              </span>
              <button
                onClick={() => handleDeleteSubtask(subtask._id)}
                className="text-gray-400 hover:text-red-600"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubtaskList;
