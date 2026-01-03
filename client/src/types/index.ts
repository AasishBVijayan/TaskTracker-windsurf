export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'To-Do' | 'In Progress' | 'Completed';
  priority: 'Low' | 'Medium' | 'High';
  dueDate: string;
  user: string;
  createdAt: string;
}

export interface Subtask {
  _id: string;
  title: string;
  completed: boolean;
  task: string;
  user: string;
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
}

export interface TaskResponse {
  success: boolean;
  data: Task | Task[];
  count?: number;
}

export interface SubtaskResponse {
  success: boolean;
  data: Subtask | Subtask[];
  count?: number;
}
