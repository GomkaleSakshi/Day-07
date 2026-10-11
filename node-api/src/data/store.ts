import { Employee, EmployeeInput } from '../models/employee.js';
import { generateId } from '../utils/id.js';

const initialEmployees: Employee[] = [
  {
    id: 'emp-1',
    name: 'Ava Patel',
    email: 'ava.patel@company.com',
    department: 'Engineering',
    position: 'Frontend Developer',
    status: 'Active',
    salary: 95000,
    createdAt: '2024-01-05T09:00:00.000Z',
  },
  {
    id: 'emp-2',
    name: 'Noah Kim',
    email: 'noah.kim@company.com',
    department: 'Design',
    position: 'Product Designer',
    status: 'On Leave',
    salary: 82000,
    createdAt: '2024-02-15T11:15:00.000Z',
  },
  {
    id: 'emp-3',
    name: 'Mia Rodriguez',
    email: 'mia.rodriguez@company.com',
    department: 'Operations',
    position: 'Operations Manager',
    status: 'Active',
    salary: 105000,
    createdAt: '2024-03-12T15:20:00.000Z',
  },
];

let employees: Employee[] = initialEmployees.map((employee) => ({ ...employee }));

export function listEmployees(): Employee[] {
  return [...employees];
}

export function getEmployeeById(id: string): Employee | null {
  return employees.find((employee) => employee.id === id) || null;
}

export function createEmployee(input: EmployeeInput): Employee {
  const employee: Employee = {
    ...input,
    id: generateId(),
    createdAt: new Date().toISOString(),
  };

  employees = [employee, ...employees];
  return employee;
}

export function updateEmployee(id: string, updates: Partial<EmployeeInput>): Employee | null {
  const index = employees.findIndex((employee) => employee.id === id);

  if (index === -1) {
    return null;
  }

  employees[index] = {
    ...employees[index],
    ...updates,
  };

  return employees[index];
}

export function deleteEmployee(id: string): Employee | null {
  const index = employees.findIndex((employee) => employee.id === id);

  if (index === -1) {
    return null;
  }

  const [removedEmployee] = employees.splice(index, 1);
  return removedEmployee;
}
