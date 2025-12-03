export interface Statement {
  id: number;
  type: string;
  isComplete: boolean;
  completedAt?: string;
  createdAt: string;
}
