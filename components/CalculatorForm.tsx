
import React from 'react';
import { FormData } from '../types';

interface CalculatorFormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onCalculate: () => void;
  isLoading: boolean;
}

const CalculatorForm: React.FC<CalculatorFormProps> = ({
  formData,
  setFormData,
  onCalculate,
  isLoading,
}) => {
  const handleScopeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      scope: { ...prev.scope, [name]: checked },
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const hasSelectedScope = Object.values(formData.scope).some(v => v);

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg p-6 space-y-6">
      <h2 className="text-2xl font-bold text-white">Project Details</h2>

      {/* Scope of Work */}
      <div>
        <label className="block text-md font-semibold text-gray-300 mb-2">Scope of Work</label>
        <div className="grid grid-cols-2 gap-3">
          {Object.keys(formData.scope).map((key) => (
            <label key={key} className="flex items-center space-x-2 bg-gray-700 p-3 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors">
              <input
                type="checkbox"
                name={key}
                checked={formData.scope[key as keyof typeof formData.scope]}
                onChange={handleScopeChange}
                className="h-5 w-5 rounded bg-gray-900 border-gray-600 text-purple-500 focus:ring-purple-600"
              />
              <span className="capitalize text-gray-200">{key.replace('guidelines', 'Brand Guidelines')}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Other Parameters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SelectInput label="Business Size" name="businessSize" value={formData.businessSize} onChange={handleSelectChange} options={['Startup', 'Small Business', 'Established Corporation']} />
        <SelectInput label="Project Complexity" name="complexity" value={formData.complexity} onChange={handleSelectChange} options={['Simple', 'Moderate', 'Complex']} />
        <SelectInput label="Project Timeline" name="timeline" value={formData.timeline} onChange={handleSelectChange} options={['Standard', 'Rush']} />
        <SelectInput label="Designer's Experience" name="experience" value={formData.experience} onChange={handleSelectChange} options={['Junior', 'Mid-level', 'Senior']} />
      </div>
      
      {/* Region */}
       <div>
        <SelectInput label="Region" name="region" value={formData.region} onChange={handleSelectChange} options={['Egypt', 'UAE', 'Saudi Arabia', 'Other MENA']} />
      </div>

      <button
        onClick={onCalculate}
        disabled={isLoading || !hasSelectedScope}
        className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-bold py-3 px-4 rounded-lg hover:from-purple-600 hover:to-cyan-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Calculating...</span>
          </>
        ) : (
          'Calculate Budget'
        )}
      </button>
       {!hasSelectedScope && <p className="text-center text-sm text-yellow-400">Please select at least one scope item.</p>}
    </div>
  );
};

interface SelectInputProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: string[];
}

const SelectInput: React.FC<SelectInputProps> = ({ label, name, value, onChange, options }) => (
    <div>
        <label htmlFor={name} className="block text-md font-semibold text-gray-300 mb-2">{label}</label>
        <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg p-3 focus:ring-purple-500 focus:border-purple-500"
        >
            {options.map(option => <option key={option} value={option}>{option}</option>)}
        </select>
    </div>
);


export default CalculatorForm;
