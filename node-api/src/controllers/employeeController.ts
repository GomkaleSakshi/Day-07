import { Request, Response } from 'express';
import { employeeService } from '../services/employeeService.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const employeeController = {
  getEmployees: asyncHandler(async (_req: Request, res: Response) => {
    const employees = employeeService.getAll();
    res.status(200).json({ success: true, count: employees.length, data: employees });
  }),

  getEmployeeById: asyncHandler(async (req: Request, res: Response) => {
    const employee = employeeService.getById(req.params.id);

    if (!employee) {
      res.status(404).json({ success: false, message: 'Employee not found.' });
      return;
    }

    res.status(200).json({ success: true, data: employee });
  }),

  createEmployee: asyncHandler(async (req: Request, res: Response) => {
    const employee = employeeService.create(req.body);
    res.status(201).json({ success: true, data: employee });
  }),

  updateEmployee: asyncHandler(async (req: Request, res: Response) => {
    const employee = employeeService.update(req.params.id, req.body);

    if (!employee) {
      res.status(404).json({ success: false, message: 'Employee not found.' });
      return;
    }

    res.status(200).json({ success: true, data: employee });
  }),

  deleteEmployee: asyncHandler(async (req: Request, res: Response) => {
    const employee = employeeService.remove(req.params.id);

    if (!employee) {
      res.status(404).json({ success: false, message: 'Employee not found.' });
      return;
    }

    res.status(200).json({ success: true, data: employee, message: 'Employee deleted successfully.' });
  }),
};
