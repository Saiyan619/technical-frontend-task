import React, { useState } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import Button from '../../../components/Button';
import Table from '../../../components/Table';

interface Department {
  id: number;
  name: string;
  description: string;
  roles: number;
  members: number;
}

interface DepartmentTableProps {
  departments: Department[];
  onManage: (department: Department) => void;
}

const DepartmentTable: React.FC<DepartmentTableProps> = ({ departments, onManage }) => {
  const [sortField, setSortField] = useState<keyof Department | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: keyof Department) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedDepartments = [...departments].sort((a, b) => {
    if (!sortField) return 0;

    const aValue = a[sortField];
    const bValue = b[sortField];

    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const SortIcon = ({ field }: { field: keyof Department }) => {
    if (sortField !== field) return <ChevronDown size={16} className="text-gray-400" />;
    return sortDirection === 'asc' ? (
      <ChevronUp size={16} className="text-gray-700" />
    ) : (
      <ChevronDown size={16} className="text-gray-700" />
    );
  };

  return (
    <Table>
      <thead>
        <tr className="border-b border-gray-200">
          <th className="text-left py-3 px-4">
            <button
              className="flex items-center space-x-1 font-medium text-gray-700 hover:text-gray-900"
              onClick={() => handleSort('name')}
            >
              <span>Name</span>
              <SortIcon field="name" />
            </button>
          </th>
          <th className="text-left py-3 px-4">
            <button
              className="flex items-center space-x-1 font-medium text-gray-700 hover:text-gray-900"
              onClick={() => handleSort('description')}
            >
              <span>Department Info</span>
              <SortIcon field="description" />
            </button>
          </th>
          <th className="text-left py-3 px-4">
            <button
              className="flex items-center space-x-1 font-medium text-gray-700 hover:text-gray-900"
              onClick={() => handleSort('roles')}
            >
              <span>Roles</span>
              <SortIcon field="roles" />
            </button>
          </th>
          <th className="text-left py-3 px-4">
            <button
              className="flex items-center space-x-1 font-medium text-gray-700 hover:text-gray-900"
              onClick={() => handleSort('members')}
            >
              <span>Members</span>
              <SortIcon field="members" />
            </button>
          </th>
          <th className="text-left py-3 px-4">Action</th>
        </tr>
      </thead>
      <tbody>
        {sortedDepartments.map((dept, index) => (
          <tr key={dept.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
            <td className="py-3 px-4 font-medium text-gray-900">{dept.name}</td>
            <td className="py-3 px-4 text-gray-600 max-w-md">
              <p className="truncate">{dept.description}</p>
            </td>
            <td className="py-3 px-4 text-gray-900">{dept.roles}</td>
            <td className="py-3 px-4 text-gray-900">{dept.members}</td>
            <td className="py-3 px-4">
              <Button variant="primary" size="sm" onClick={() => onManage(dept)}>
                MANAGE
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DepartmentTable;