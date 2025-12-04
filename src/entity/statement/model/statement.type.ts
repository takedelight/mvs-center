export interface Statement {
  id: number;
  type: string;
  status: 'Виконано' | 'Відхилено' | 'В процесі';
  createdAt: string;
}

export interface AdminStatement extends Statement {
  firstName: string;
  lastName?: string;
}
