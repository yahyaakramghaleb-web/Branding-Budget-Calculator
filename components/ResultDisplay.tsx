
import React from 'react';
import { Source } from '../types';

interface ResultDisplayProps {
  result: string;
  sources: Source[];
}

// A simple markdown-to-HTML parser for this specific use case
const SimpleMarkdown: React.FC<{ text: string }> = ({ text }) => {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    return (
        <>
            {lines.map((line, index) => {
                if (line.startsWith('###') || line.startsWith('##') || line.startsWith('#')) {
                    const headingText = line.replace(/#/g, '').trim();
                    return <h3 key={index} className="text-2xl font-bold text-cyan-400 mt-4 mb-2">{headingText}</h3>;
                }
                if (line.startsWith('* ') || line.startsWith('- ')) {
                    return <li key={index} className="ml-5 text-gray-300">{line.substring(2)}</li>;
                }
                return <p key={index} className="text-gray-300 my-2">{line}</p>;
            })}
        </>
    );
};


const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, sources }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h3 className="text-xl font-semibold mb-2 text-gray-200">AI-Generated Estimate</h3>
        <div className="prose prose-invert max-w-none bg-gray-900/50 p-4 rounded-lg">
            <SimpleMarkdown text={result} />
        </div>
      </div>

      {sources.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold text-gray-300 mb-2">Sources</h4>
          <ul className="space-y-2">
            {sources.map((source, index) => (
              source.web && (
                <li key={index} className="flex items-start space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                    </svg>
                  <a
                    href={source.web.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 transition-colors break-all"
                  >
                    {source.web.title}
                  </a>
                </li>
              )
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;
