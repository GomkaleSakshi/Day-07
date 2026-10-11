export type EmployeeStatus = 'Active' | 'On Leave' | 'Inactive';

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  status: EmployeeStatus;
  salary: number;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  count?: number;
  data: T;
  message?: string;
}
