"use client";

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { EmployeeForm } from '../../components/EmployeeForm';
import { createEmployee, getEmployeeById, updateEmployee } from '../../lib/api';
import { Employee } from '../../types/employee';

export default function CreateEmployeePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const employeeId = searchParams.get('id');
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(Boolean(employeeId));
  const [error, setError] = useState('');

  useEffect(() => {
    if (!employeeId) {
      setLoading(false);
      return;
    }

    const loadEmployee = async () => {
      try {
        const response = await getEmployeeById(employeeId);
        setEmployee(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Could not load employee.');
      } finally {
        setLoading(false);
      }
    };

    loadEmployee();
  }, [employeeId]);

  const handleSubmit = async (payload: Partial<Employee>) => {
    try {
      if (employeeId) {
        await updateEmployee(employeeId, payload);
      } else {
        await createEmployee(payload);
      }

      router.push('/employees');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed.');
    }
  };

  return (
    <main className="container">
      <div className="page-header">
        <h1>{employeeId ? 'Edit employee' : 'Add employee'}</h1>
        <div className="header-actions">
          <Link href="/employees" className="secondary-btn">
            Back to list
          </Link>
        </div>
      </div>

      {error ? <div className="error-state">{error}</div> : null}
      {loading ? <div className="loading-state">Loading employee details...</div> : null}

      {!loading && !error ? (
        <EmployeeForm
          initialValues={employee || undefined}
          submitText={employeeId ? 'Update employee' : 'Create employee'}
          onSubmit={handleSubmit}
        />
      ) : null}
    </main>
  );
}
