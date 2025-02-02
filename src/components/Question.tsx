import React from 'react';
import type { Question as QuestionType, Option } from '../types';

interface QuestionProps {
  question: QuestionType;
  currentQuestion: number;
  totalQuestions: number;
  selectedOption: number | null;
  onSelectOption: (optionId: number) => void;
}

export const Question: React.FC<QuestionProps> = ({
  question,
  currentQuestion,
  totalQuestions,
  selectedOption,
  onSelectOption,
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-gray-500">
            Question {currentQuestion + 1} of {totalQuestions}
          </span>
          <div className="w-64 h-2 bg-gray-200 rounded-full">
            <div
              className="h-full bg-indigo-600 rounded-full transition-all duration-300"
              style={{
                width: `${((currentQuestion + 1) / totalQuestions) * 100}%`,
              }}
            />
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-800 mb-6">
          {question.description}
        </h3>
        
        <div className="space-y-4">
          {question.options.map((option: Option) => (
            <button
              key={option.id}
              onClick={() => onSelectOption(option.id)}
              className={`w-full p-4 text-left rounded-lg border-2 transition duration-200
                ${
                  selectedOption === option.id
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-gray-200 hover:border-indigo-200'
                }`}
            >
              {option.description}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};