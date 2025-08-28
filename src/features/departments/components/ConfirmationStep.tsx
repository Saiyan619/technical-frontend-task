import React from 'react';
import  Button  from  '../../../components/Button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface ConfirmationStepProps {
  formData: {
    name: string;
    description: string;
    selectedRoles: { id: number; name: string }[];
  };
  onBack: () => void;
  onFinish: () => void;
  isLoading: boolean;
}

const ConfirmationStep: React.FC<ConfirmationStepProps> = ({ formData, onBack, onFinish, isLoading }) => {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-6">Confirmation</h3>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Department Name</label>
          <p className="text-gray-900">{formData.name}</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Department Info</label>
          <p className="text-gray-600 leading-relaxed">{formData.description}</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Team Roles</label>
          <div className="space-y-1">
            {formData.selectedRoles.map(role => (
              <p key={role.id} className="text-gray-900">{role.name}</p>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-10">
        <Button variant="secondary" onClick={onBack} disabled={isLoading}>
          <ArrowLeft size={16} className="mr-2" />
          BACK
        </Button>
        <Button className='mt-2' onClick={onFinish} disabled={isLoading}>
          {isLoading ? 'Creating...' : 'FINISH'}
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationStep;