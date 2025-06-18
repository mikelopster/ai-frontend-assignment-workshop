
export interface User {
  name: string;
  payTag: string;
}

export interface Transaction {
  id: string;
  type: 'incoming' | 'outgoing';
  amount: number;
  recipient?: User;
  sender?: User;
  memo?: string;
  date: Date;
  status: 'pending' | 'completed' | 'failed';
}
