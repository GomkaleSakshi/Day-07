import { Router } from 'express';
import { employeeController } from '../controllers/employeeController.js';
import { validateEmployee } from '../middleware/validateEmployee.js';

const router = Router();

router.get('/', employeeController.getEmployees);
router.get('/:id', employeeController.getEmployeeById);
router.post('/', validateEmployee, employeeController.createEmployee);
router.put('/:id', validateEmployee, employeeController.updateEmployee);
router.delete('/:id', employeeController.deleteEmployee);

export default router;
