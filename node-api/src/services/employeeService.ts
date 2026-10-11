import {
  createEmployee,
  deleteEmployee,
  getEmployeeById,
  listEmployees,
  updateEmployee,
} from '../data/store.js';
import { EmployeeInput } from '../models/employee.js';

export const employeeService = {
  getAll: () => listEmployees(),
  getById: (id: string) => getEmployeeById(id),
  create: (input: EmployeeInput) => createEmployee(input),
  update: (id: string, input: Partial<EmployeeInput>) => updateEmployee(id, input),
  remove: (id: string) => deleteEmployee(id),
};
