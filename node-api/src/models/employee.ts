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

export type EmployeeInput = Omit<Employee, 'id' | 'createdAt'>;
