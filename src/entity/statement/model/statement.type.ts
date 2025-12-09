export type StatementStatus = 'Виконано' | 'Відхилено' | 'В обробці';

export interface Statement {
  id: number;
  type: string;
  status: StatementStatus;
  createdAt: string;
}

export interface AdminStatementItem {
  id: number;
  type: string;
  status: StatementStatus;
  createdAt: string;
  firstName: string;
  lastName: string;
}

export interface AdminStatement {
  result: AdminStatementItem[];
  time: number;
  operations: number;
}
