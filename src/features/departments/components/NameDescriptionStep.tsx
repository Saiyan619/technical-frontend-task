/* src/components/department/NameDescriptionStep.tsx */
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { FormData } from '@/types/Role';
import Input from '../../../components/Input';
import Textarea from '../../../components/Textarea';
import Button from '../../../components/Button';


interface NameDescriptionStepProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onNext: () => void;
  onBack: () => void;
}

const NameDescriptionStep: React.FC<NameDescriptionStepProps> = ({
  formData,
  setFormData,
  onNext,
  onBack,
}) => {
  const [errors, setErrors] = useState<{ name?: string; description?: string }>({});

  const validate = () => {
    const newErrors: { name?: string; description?: string } = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Department name is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Department description is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      onNext();
    }
  };

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-6">Name & Description</h3>
      <div className="space-y-4">
        <Input
          label="Department Name"
          placeholder="Department Name"
          value={formData.name}
          onChange={(e:any) => setFormData({ ...formData, name: e.target.value })}
          className={errors.name ? 'border-red-500' : ''}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        <Textarea
          label="Department Info"
          placeholder="Department Info"
          value={formData.description}
          onChange={(e:any) => setFormData({ ...formData, description: e.target.value })}
          rows={6}
          maxLength={500}
          className={errors.description ? 'border-red-500' : ''}
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
      </div>
      <div className="flex justify-between mt-8">
        <Button variant="secondary" onClick={onBack}>
          <ArrowLeft size={16} className="mr-2" />
          BACK
        </Button>
        <Button onClick={handleNext}>
          NEXT
          <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default NameDescriptionStep;