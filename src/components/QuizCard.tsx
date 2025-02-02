import React from 'react';
import { Timer, Award, AlertCircle } from 'lucide-react';

interface QuizCardProps {
  title: string;
  questionsCount: number;
  duration: number;
  marks: string;
  onStart: () => void;
}

export const QuizCard: React.FC<QuizCardProps> = ({
  title,
  questionsCount,
  duration,
  marks,
  onStart,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
      
      <div className="space-y-4 mb-6">
        <div className="flex items-center text-gray-600">
          <AlertCircle className="w-5 h-5 mr-2" />
          <span>{questionsCount} Questions</span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <Timer className="w-5 h-5 mr-2" />
          <span>{duration} Minutes</span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <Award className="w-5 h-5 mr-2" />
          <span>{marks} marks per correct answer</span>
        </div>
      </div>
      
      <button
        onClick={onStart}
        className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold
                 hover:bg-indigo-700 transition duration-200 flex items-center justify-center"
      >
        Start Quiz
      </button>
    </div>
  );
};