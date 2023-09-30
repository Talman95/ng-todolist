import { TaskStatus } from '../enums/task-status.enum';

export interface Task {
  description: string;
  title: string;
  completed: boolean;
  status: TaskStatus;
  priority: number;
  startDate: number;
  deadline: number;
  id: string;
  todoListId: string;
  order: number;
  addedDate: number;
}

export interface TasksState {
  [key: string]: Task[];
}

export interface GetTaskResponse {
  items: Task[];
  totalCount: number;
  error: string[];
}
