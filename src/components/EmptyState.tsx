import React from 'react';

interface EmptyStateProps {
  icon: React.ElementType;
  message: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ icon: Icon, message }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-gray-500">
      <Icon size={64} className="mb-4" />
      <p className="text-sm">{message}</p>
    </div>
  );
};

export default EmptyState;