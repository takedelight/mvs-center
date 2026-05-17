export type TicketStatus = 'Виконано' | 'Відхилено' | 'В обробці';

export interface Ticket {
  id: number;
  type: string;
  status: TicketStatus;
  createdAt: string;
}

export interface AdminStatementItem extends Ticket {
  firstName: string;
  lastName: string;
}
