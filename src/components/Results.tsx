import React from 'react';
import { Trophy, Target, XCircle } from 'lucide-react';

interface ResultsProps {
  correctAnswers: number;
  totalQuestions: number;
  score: number;
  onRetry: () => void;
}

export const Results: React.FC<ResultsProps> = ({
  correctAnswers,
  totalQuestions,
  score,
  onRetry,
}) => {
  const percentage = (correctAnswers / totalQuestions) * 100;
  
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="text-center">
        <div className="mb-6">
          <Trophy className="w-16 h-16 mx-auto text-yellow-500" />
        </div>
        
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Quiz Complete!</h2>
        
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Target className="w-5 h-5 text-green-500 mr-2" />
              <span>Correct Answers</span>
            </div>
            <span className="font-semibold">{correctAnswers}/{totalQuestions}</span>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <XCircle className="w-5 h-5 text-red-500 mr-2" />
              <span>Wrong Answers</span>
            </div>
            <span className="font-semibold">{totalQuestions - correctAnswers}/{totalQuestions}</span>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <span>Total Score</span>
            <span className="font-semibold">{score} points</span>
          </div>
        </div>
        
        <div className="mb-8">
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                  Performance
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-indigo-600">
                  {percentage.toFixed(1)}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
              <div
                style={{ width: `${percentage}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600 transition-all duration-500"
              />
            </div>
          </div>
        </div>
        
        <button
          onClick={onRetry}
          className="bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold
                   hover:bg-indigo-700 transition duration-200"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};