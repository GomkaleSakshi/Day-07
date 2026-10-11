import { NextFunction, Request, Response } from 'express';

const validStatuses = ['Active', 'On Leave', 'Inactive'];

export function validateEmployee(req: Request, res: Response, next: NextFunction) {
  const { name, email, department, position, status, salary } = req.body ?? {};

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return res.status(400).json({ success: false, message: 'Name is required and must be at least 2 characters long.' });
  }

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
  }

  if (!department || typeof department !== 'string' || department.trim().length < 2) {
    return res.status(400).json({ success: false, message: 'Department is required.' });
  }

  if (!position || typeof position !== 'string' || position.trim().length < 2) {
    return res.status(400).json({ success: false, message: 'Position is required.' });
  }

  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({ success: false, message: 'Status must be one of: Active, On Leave, Inactive.' });
  }

  if (salary === undefined || salary === null || Number(salary) <= 0) {
    return res.status(400).json({ success: false, message: 'Salary must be a positive number.' });
  }

  req.body = {
    name: name.trim(),
    email: email.trim(),
    department: department.trim(),
    position: position.trim(),
    status,
    salary: Number(salary),
  };

  return next();
}
