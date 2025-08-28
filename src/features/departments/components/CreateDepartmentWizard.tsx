/* src/components/department/CreateDepartmentWizard.tsx */
import React, { useState } from 'react';
import Modal from '../../../components/Modal';
import StepIndicator from './StepIndicator';
import NameDescriptionStep from './NameDescriptionStep';
import AddRolesStep from './AddRolesStep';
import ConfirmationStep from './ConfirmationStep';
import { FormData } from '@/types/Role';
import { mockRoles } from '../../../data/mockRoles';


interface CreateDepartmentWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => Promise<void>;
}

const CreateDepartmentWizard: React.FC<CreateDepartmentWizardProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    selectedRoles: [],
  });

  const steps = ['Name & Description', 'Add Roles', 'Confirmation'];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = async () => {
    setIsLoading(true);
    try {
      await onSubmit(formData);
      onClose();
      setFormData({ name: '', description: '', selectedRoles: [] });
      setCurrentStep(0);
    } catch (error) {
      console.error('Error creating department:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
      setFormData({ name: '', description: '', selectedRoles: [] });
      setCurrentStep(0);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create Department" className="max-w-6xl max-h-full">
      <StepIndicator steps={steps} currentStep={currentStep} />
      {currentStep === 0 && (
        <NameDescriptionStep
          formData={formData}
          setFormData={setFormData}
          onNext={handleNext}
          onBack={handleClose}
        />
      )}
      {currentStep === 1 && (
        <AddRolesStep
          formData={formData}
          setFormData={setFormData}
          onNext={handleNext}
          onBack={handleBack}
          roles={mockRoles} 
        />
      )}
      {currentStep === 2 && (
        <ConfirmationStep
          formData={formData}
          onBack={handleBack}
          onFinish={handleFinish}
          isLoading={isLoading}
        />
      )}
    </Modal>
  );
};

export default CreateDepartmentWizard;