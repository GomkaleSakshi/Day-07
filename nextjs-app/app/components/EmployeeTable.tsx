import Link from 'next/link';
import { Employee } from '../types/employee';

type Props = {
  employees: Employee[];
  onDelete: (id: string) => void;
};

export function EmployeeTable({ employees, onDelete }: Props) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Position</th>
            <th>Status</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan={6}>
                <div className="empty-state">No employees match your filters.</div>
              </td>
            </tr>
          ) : (
            employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.name}</td>
                <td>{employee.department}</td>
                <td>{employee.position}</td>
                <td>
                  <span className={`badge ${employee.status.toLowerCase().replace(/\s+/g, '-')}`}>
                    {employee.status}
                  </span>
                </td>
                <td>${employee.salary.toLocaleString()}</td>
                <td>
                  <div className="action-row">
                    <Link href={`/employees/${employee.id}`} className="action-link">
                      View
                    </Link>
                    <button className="secondary-btn" onClick={() => onDelete(employee.id)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
