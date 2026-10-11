import { FormEvent, useState } from 'react';
import { Employee, EmployeeStatus } from '../types/employee';

type Props = {
  initialValues?: Partial<Employee>;
  submitText: string;
  onSubmit: (payload: Partial<Employee>) => Promise<void>;
};

const defaultValues: Partial<Employee> = {
  name: '',
  email: '',
  department: 'Engineering',
  position: '',
  status: 'Active',
  salary: 60000,
};

export function EmployeeForm({ initialValues = {}, submitText, onSubmit }: Props) {
  const [form, setForm] = useState<Partial<Employee>>({ ...defaultValues, ...initialValues });
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (field: keyof Employee, value: string | number) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSaving(true);
    await onSubmit(form);
    setIsSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="card form-card">
      <div className="form-grid">
        <div className="form-field">
          <label>Name</label>
          <input
            value={form.name || ''}
            onChange={(event) => handleChange('name', event.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label>Email</label>
          <input
            type="email"
            value={form.email || ''}
            onChange={(event) => handleChange('email', event.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label>Department</label>
          <input
            value={form.department || ''}
            onChange={(event) => handleChange('department', event.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label>Position</label>
          <input
            value={form.position || ''}
            onChange={(event) => handleChange('position', event.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label>Status</label>
          <select
            value={form.status || 'Active'}
            onChange={(event) => handleChange('status', event.target.value as EmployeeStatus)}
          >
            <option value="Active">Active</option>
            <option value="On Leave">On Leave</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="form-field">
          <label>Salary</label>
          <input
            type="number"
            min="1"
            value={form.salary || 60000}
            onChange={(event) => handleChange('salary', Number(event.target.value))}
            required
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="primary-btn" disabled={isSaving}>
          {isSaving ? 'Saving...' : submitText}
        </button>
      </div>
    </form>
  );
}
