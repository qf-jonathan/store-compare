export interface TaskType {
  uuid: string;
  description: string;
  isDone: boolean;
}

export interface StatsType {
  total: number;
  completed: number;
  remaining: number;
}
