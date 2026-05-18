export type TicketStatus = 'SUCCESS' | 'REJECT' | 'PENDING';

export interface Ticket {
  id: number;
  type: string;
  status: TicketStatus;
  createdAt: string;
}

export interface AdminStatementItem extends Ticket {
  firstName: string;
  lastName: string;
  user: {
    firstName: string;
    lastName: string;
  };
}
