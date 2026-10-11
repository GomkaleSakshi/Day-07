type Props = {
  search: string;
  department: string;
  status: string;
  sortBy: string;
  onSearchChange: (value: string) => void;
  onDepartmentChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onSortChange: (value: string) => void;
  departments: string[];
};

export function EmployeeFilters({
  search,
  department,
  status,
  sortBy,
  onSearchChange,
  onDepartmentChange,
  onStatusChange,
  onSortChange,
  departments,
}: Props) {
  return (
    <div className="toolbar">
      <div className="search-box">
        <input
          type="text"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search employees..."
        />
      </div>

      <div className="filter-box">
        <select value={department} onChange={(event) => onDepartmentChange(event.target.value)}>
          <option value="">All departments</option>
          {departments.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-box">
        <select value={status} onChange={(event) => onStatusChange(event.target.value)}>
          <option value="">All statuses</option>
          <option value="Active">Active</option>
          <option value="On Leave">On Leave</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <div className="filter-box">
        <select value={sortBy} onChange={(event) => onSortChange(event.target.value)}>
          <option value="name">Sort by name</option>
          <option value="salary">Sort by salary</option>
          <option value="department">Sort by department</option>
        </select>
      </div>
    </div>
  );
}
