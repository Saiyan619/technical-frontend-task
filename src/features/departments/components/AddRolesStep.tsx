/* src/components/department/AddRolesStep.tsx */
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Search, FileText, X } from 'lucide-react';
import Button from '../../../components/Button';
import EmptyState from '../../../components/EmptyState';
import { FormData } from '@/types/Role';
import { Role } from '@/types/Role';

interface AddRolesStepProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onNext: () => void;
  onBack: () => void;
  roles: Role[];
}

const AddRolesStep: React.FC<AddRolesStepProps> = ({
  formData,
  setFormData,
  onNext,
  onBack,
  roles,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');

  const availableRoles = roles.filter(
    (role) => !formData.selectedRoles.some((selected) => selected.id === role.id)
  );

  const filteredAvailableRoles = availableRoles.filter((role) => {
    const matchesSearch = role.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = !filterDepartment || role.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  const departments = [...new Set(roles.map((role) => role.department))];

  const addRole = (role: Role) => {
    setFormData({
      ...formData,
      selectedRoles: [...formData.selectedRoles, role],
    });
  };

  const removeRole = (roleId: number) => {
    setFormData({
      ...formData,
      selectedRoles: formData.selectedRoles.filter((role) => role.id !== roleId),
    });
  };

  const resetFilters = () => {
    setSearchTerm('');
    setFilterDepartment('');
  };

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-6">Add Roles</h3>
      <div className="grid grid-cols-2 gap-8">
        {/* Available Roles */}
        <div>
          <div className="mb-4">
            <div className="flex items-center space-x-4 mb-4">
              <div className="relative flex-1">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <select
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Filter</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
              <button
                onClick={resetFilters}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                RESET FILTERS
              </button>
            </div>
          </div>
          <div className="border rounded-lg">
            <div className="bg-gray-50 px-4 py-3 border-b">
              <h4 className="font-medium text-gray-900">
                Available
                <span className="text-gray-500 ml-2">
                  ({filteredAvailableRoles.length} Role{filteredAvailableRoles.length !== 1 ? 's' : ''})
                </span>
              </h4>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {filteredAvailableRoles.length > 0 ? (
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left py-2 px-4 text-sm font-medium text-gray-700">Role</th>
                      <th className="text-left py-2 px-4 text-sm font-medium text-gray-700">
                        On Department(s)
                      </th>
                      <th className="w-16"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAvailableRoles.map((role, index) => (
                      <tr key={role.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="py-2 px-4 text-sm text-gray-900">{role.name}</td>
                        <td className="py-2 px-4 text-sm text-gray-600">{role.department}</td>
                        <td className="py-2 px-4">
                          <Button size="sm" onClick={() => addRole(role)}>
                            ADD
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <EmptyState
                  icon={Search}
                  message="No roles found"
                />
              )}
            </div>
          </div>
        </div>
        {/* Selected Roles */}
        <div>
          <div className="border rounded-lg">
            <div className="bg-gray-50 px-4 py-3 border-b">
              <h4 className="font-medium text-gray-900">
                In {formData.name || 'New Department'}
                <span className="text-gray-500 ml-2">
                  ({formData.selectedRoles.length} Role{formData.selectedRoles.length !== 1 ? 's' : ''})
                </span>
              </h4>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {formData.selectedRoles.length > 0 ? (
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left py-2 px-4 text-sm font-medium text-gray-700">Name</th>
                      <th className="text-left py-2 px-4 text-sm font-medium text-gray-700">
                        On Department(s)
                      </th>
                      <th className="w-8"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.selectedRoles.map((role, index) => (
                      <tr key={role.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="py-2 px-4 text-sm text-gray-900">{role.name}</td>
                        <td className="py-2 px-4 text-sm text-gray-600">-</td>
                        <td className="py-2 px-4">
                          <button
                            onClick={() => removeRole(role.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <EmptyState
                  icon={FileText}
                  message="You currently don't have any roles in the Department"
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mt-8">
        <Button variant="secondary" onClick={onBack}>
          <ArrowLeft size={16} className="mr-2" />
          BACK
        </Button>
        <Button onClick={onNext}>
          NEXT
          <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default AddRolesStep;