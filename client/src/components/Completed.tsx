import React, { useState, useEffect } from 'react';
import { Task } from '../types';
import api from '../utils/api';
import TaskList from './TaskList';
import TaskModal from './TaskModal';

const Completed: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    fetchCompletedTasks();
  }, []);

  const fetchCompletedTasks = async () => {
    try {
      const response = await api.get('/tasks?status=Completed');
      setTasks(response.data.data);
    } catch (error) {
      console.error('Error fetching completed tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const handleDeleteTask = async (taskId: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await api.delete(`/tasks/${taskId}`);
        fetchCompletedTasks();
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const handleTaskSaved = () => {
    setShowModal(false);
    setEditingTask(null);
    fetchCompletedTasks();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="px-8 py-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Completed Tasks</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <TaskList
          tasks={tasks}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
        />
      </div>

      {showModal && (
        <TaskModal
          task={editingTask}
          onClose={() => setShowModal(false)}
          onSave={handleTaskSaved}
        />
      )}
    </div>
  );
};

export default Completed;
