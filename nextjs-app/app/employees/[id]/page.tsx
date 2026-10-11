"use client";

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { deleteEmployee, getEmployeeById } from '../../lib/api';
import { Employee } from '../../types/employee';

export default function EmployeeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const employeeId = Array.isArray(params.id) ? params.id[0] : params.id;
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadEmployee = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getEmployeeById(employeeId);
      setEmployee(response.data);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load employee.');
    } finally {
      setLoading(false);
    }
  }, [employeeId]);

  useEffect(() => {
    if (employeeId) {
      loadEmployee();
    }
  }, [employeeId, loadEmployee]);

  const handleDelete = async () => {
    try {
      await deleteEmployee(employeeId);
      router.push('/employees');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed.');
    }
  };

  if (loading) {
    return (
      <main className="container">
        <div className="loading-state">Loading employee profile...</div>
      </main>
    );
  }

  if (error || !employee) {
    return (
      <main className="container">
        <div className="error-state">{error || 'Employee not found.'}</div>
      </main>
    );
  }

  return (
    <main className="container">
      <div className="page-header">
        <h1>{employee.name}</h1>
        <div className="header-actions">
          <Link href="/employees" className="secondary-btn">
            Back to list
          </Link>
          <Link href={`/employees/create?id=${employee.id}`} className="primary-btn">
            Edit employee
          </Link>
          <button className="danger-btn" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>

      <div className="card detail-card">
        <span className={`badge ${employee.status.toLowerCase().replace(/\s+/g, '-')}`}>{employee.status}</span>

        <div className="detail-grid">
          <div className="detail-block">
            <span>Email</span>
            {employee.email}
          </div>
          <div className="detail-block">
            <span>Department</span>
            {employee.department}
          </div>
          <div className="detail-block">
            <span>Position</span>
            {employee.position}
          </div>
          <div className="detail-block">
            <span>Salary</span>
            ${employee.salary.toLocaleString()}
          </div>
          <div className="detail-block">
            <span>Joined</span>
            {new Date(employee.createdAt).toLocaleDateString()}
          </div>
          <div className="detail-block">
            <span>ID</span>
            {employee.id}
          </div>
        </div>
      </div>
    </main>
  );
}
