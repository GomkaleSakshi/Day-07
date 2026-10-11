import { Employee } from '../types/employee';

export function EmployeeStats({ employees }: { employees: Employee[] }) {
  const activeCount = employees.filter((employee) => employee.status === 'Active').length;
  const onLeaveCount = employees.filter((employee) => employee.status === 'On Leave').length;
  const totalSalary = employees.reduce((sum, employee) => sum + employee.salary, 0);

  return (
    <div className="dashboard-grid">
      <div className="card stat-card">
        <span className="stat-label">Total employees</span>
        <div className="stat-value">{employees.length}</div>
      </div>
      <div className="card stat-card">
        <span className="stat-label">Active</span>
        <div className="stat-value">{activeCount}</div>
      </div>
      <div className="card stat-card">
        <span className="stat-label">On leave</span>
        <div className="stat-value">{onLeaveCount}</div>
      </div>
      <div className="card stat-card">
        <span className="stat-label">Payroll</span>
        <div className="stat-value">${totalSalary.toLocaleString()}</div>
      </div>
    </div>
  );
}
