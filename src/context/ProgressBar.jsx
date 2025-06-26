import React from 'react';
import { useSelector } from 'react-redux';
import '../styles/context/_progress.scss';

const ProgressBar = () => {
  const { steps, currentStep } = useSelector((state) => state.progress);

  const stepLabels = [
    { id: 1, label: 'Upload Docs' },
    { id: 2, label: 'Add Recipients' },
    { id: 3, label: 'Place Fields' },
    { id: 4, label: 'Email Subject' },
    { id: 5, label: 'Review & Send' },
  ];

  return (
    <div className="progress-vertical-container">
      <div className="progress-stepper">
        {stepLabels.map((step, idx) => {
          const stepData = steps[step.id];
          const isActive = stepData.active;
          const isCompleted = stepData.completed;
          const isCurrent = currentStep === step.id;
          
          return (
            <div className="progress-step-wrapper" key={step.id}>
              {idx !== 0 && (
                <div className={`progress-line ${isCompleted ? 'completed' : ''}`} />
              )}
              <div 
                className={`progress-step-circle ${
                  isCompleted ? 'completed' : isActive ? 'active' : ''
                }`}
                data-step={step.id}
              > 
              </div>
              <span className="step-label">{step.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;