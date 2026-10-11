"use client";

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { EmployeeFilters } from '../components/EmployeeFilters';
import { EmployeeStats } from '../components/EmployeeStats';
import { EmployeeTable } from '../components/EmployeeTable';
import { PageHeader } from '../components/PageHeader';
import { deleteEmployee, getEmployees } from '../lib/api';
import { Employee } from '../types/employee';

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('');
  const [status, setStatus] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadEmployees = async () => {
    try {
      setLoading(true);
      const response = await getEmployees();
      setEmployees(response.data);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load employees.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const departments = useMemo(
    () => [...new Set(employees.map((employee) => employee.department))].sort(),
    [employees],
  );

  const filteredEmployees = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    const filtered = employees.filter((employee) => {
      const matchesSearch =
        !normalizedSearch ||
        employee.name.toLowerCase().includes(normalizedSearch) ||
        employee.email.toLowerCase().includes(normalizedSearch) ||
        employee.position.toLowerCase().includes(normalizedSearch);
      const matchesDepartment = !department || employee.department === department;
      const matchesStatus = !status || employee.status === status;

      return matchesSearch && matchesDepartment && matchesStatus;
    });

    return filtered.sort((a, b) => {
      if (sortBy === 'salary') return b.salary - a.salary;
      if (sortBy === 'department') return a.department.localeCompare(b.department);
      return a.name.localeCompare(b.name);
    });
  }, [department, employees, search, sortBy, status]);

  const handleDelete = async (id: string) => {
    try {
      await deleteEmployee(id);
      setEmployees((current) => current.filter((employee) => employee.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed.');
    }
  };

  return (
    <main className="container">
      <PageHeader
        title="Employees"
        primaryAction={
          <Link href="/employees/create" className="primary-btn">
            Add employee
          </Link>
        }
      />

      {error ? <div className="error-state">{error}</div> : null}

      {!loading && !error ? <EmployeeStats employees={employees} /> : null}

      <EmployeeFilters
        search={search}
        department={department}
        status={status}
        sortBy={sortBy}
        onSearchChange={setSearch}
        onDepartmentChange={setDepartment}
        onStatusChange={setStatus}
        onSortChange={setSortBy}
        departments={departments}
      />

      {loading ? <div className="loading-state">Loading employees...</div> : null}

      {!loading && !error ? <EmployeeTable employees={filteredEmployees} onDelete={handleDelete} /> : null}
    </main>
  );
}
