import React, { useState, useEffect } from 'react';
import { X, Plus, FileText, } from 'lucide-react';
import DepartmentTable from './components/DepartmentTable';
import CreateDepartmentWizard from './components/CreateDepartmentWizard';
import { mockDepartments } from '../../data/mockDepartments';

const DepartmentManagementDashboard: React.FC = () => {
  const [departments, setDepartments] = useState(mockDepartments);
  const [filteredDepartments, setFilteredDepartments] = useState(mockDepartments);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let filtered = departments;

    if (searchTerm) {
      filtered = filtered.filter(dept =>
        dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dept.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterValue) {
      filtered = filtered.filter(dept => dept.name.includes(filterValue));
    }

    setFilteredDepartments(filtered);
  }, [departments, searchTerm, filterValue]);

  const handleCreateDepartment = async (formData: any) => {
    setLoading(true);
    try {
      const newDepartment = {
        id: departments.length + 1,
        name: formData.name,
        description: formData.description,
        roles: formData.selectedRoles.length,
        members: Math.floor(Math.random() * 20) + 1
      };

      setDepartments([...departments, newDepartment]);
    } catch (error) {
      console.error('Error creating department:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleManage = (department: any) => {
    console.log('Managing department:', department);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setFilterValue('');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-4 items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Department Management</h1>
          <button onClick={() => setIsCreateModalOpen(true)} className="bg-blue-600 flex items-center text-white px-4 py-2 rounded-md">
            <Plus size={16} className="mr-2" />
            ADD DEPARTMENT
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <button onClick={resetFilters} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              RESET FILTERS
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : filteredDepartments.length > 0 ? (
            <DepartmentTable
              departments={filteredDepartments}
              onManage={handleManage}
            />
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-gray-500">
              <FileText size={64} className="mb-4" />
              <p>No departments found</p>
            </div>
          )}
        </div>

        <CreateDepartmentWizard
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateDepartment}
        />
      </div>
    </div>
  );
};

export default DepartmentManagementDashboard;