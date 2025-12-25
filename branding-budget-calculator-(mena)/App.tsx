
import React, { useState, useCallback } from 'react';
import { FormData, Source } from './types';
import { calculateBrandingBudget } from './services/geminiService';
import CalculatorForm from './components/CalculatorForm';
import ResultDisplay from './components/ResultDisplay';
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    scope: {
      logo: true,
      guidelines: false,
      stationery: false,
      social: false,
      website: false,
    },
    businessSize: 'Startup',
    complexity: 'Moderate',
    timeline: 'Standard',
    experience: 'Mid-level',
    region: 'Egypt',
  });
  const [result, setResult] = useState<string | null>(null);
  const [sources, setSources] = useState<Source[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    setSources([]);
    try {
      const response = await calculateBrandingBudget(formData);
      setResult(response.text);
      setSources(response.sources);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(`Failed to calculate budget. ${err.message}`);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [formData]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <Header />
        <main className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <CalculatorForm
              formData={formData}
              setFormData={setFormData}
              onCalculate={handleCalculate}
              isLoading={isLoading}
            />
            <div className="bg-gray-800 rounded-xl shadow-lg p-6 min-h-[300px] flex flex-col justify-center">
              {isLoading && <LoadingSpinner />}
              {error && <p className="text-red-400 text-center">{error}</p>}
              {!isLoading && !error && result && (
                <ResultDisplay result={result} sources={sources} />
              )}
              {!isLoading && !error && !result && (
                <div className="text-center text-gray-400">
                  <h3 className="text-xl font-semibold mb-2 text-gray-200">Your Estimate Awaits</h3>
                  <p>Fill out the form to get a real-time, AI-powered budget estimate for your branding project.</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
