const StepIndicator: React.FC<{ steps: string[]; currentStep: number }> = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center mb-8">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
            index < currentStep ? 'bg-blue-600 text-white' :
            index === currentStep ? 'bg-blue-600 text-white' :
            'bg-gray-200 text-gray-600'
          }`}>
            {index + 1}
          </div>
          {index < steps.length - 1 && (
            <div className={`w-12 h-0.5 mx-2 ${
              index < currentStep ? 'bg-blue-600' : 'bg-gray-200'
            }`} />
          )}
          <span className={`ml-2 text-sm font-medium ${
            index <= currentStep ? 'text-gray-900' : 'text-gray-500'
          }`}>
            {step}
          </span>
          {index < steps.length - 1 && <div className="w-4" />}
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;