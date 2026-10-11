import { Employee } from '../types/employee';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Request failed.');
  }

  return response.json() as Promise<T>;
}

export function getEmployees() {
  return fetchJson<{ success: boolean; count: number; data: Employee[] }>(`/employees`);
}

export function getEmployeeById(id: string) {
  return fetchJson<{ success: boolean; data: Employee }>(`/employees/${id}`);
}

export function createEmployee(payload: Partial<Employee>) {
  return fetchJson<{ success: boolean; data: Employee }>(`/employees`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function updateEmployee(id: string, payload: Partial<Employee>) {
  return fetchJson<{ success: boolean; data: Employee }>(`/employees/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export function deleteEmployee(id: string) {
  return fetchJson<{ success: boolean; data: Employee; message: string }>(`/employees/${id}`, {
    method: 'DELETE',
  });
}
