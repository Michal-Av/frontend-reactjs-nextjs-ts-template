//Todo model

export type Status = 'Open' | 'In Progress' | 'Done';
export type Flag = 'Red' | 'Orange' | 'Green';

export interface Todo {
  _id: string;
  title: string;
  description?: string;
  status: Status;
  flag?: Flag;
}
