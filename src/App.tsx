import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { fetchQuizData } from './api';
import { Question } from './components/Question';
import { QuizCard } from './components/QuizCard';
import { Results } from './components/Results';
import type { Question as QuestionType, Quiz } from './types';

function App() {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, number>>({});
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    loadQuiz();
  }, []);

  const loadQuiz = async () => {
    try {
      setLoading(true);
      const data = await fetchQuizData();
      setQuiz(data);
    } catch (err) {
      setError('Failed to load quiz. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleStart = () => {
    setStarted(true);
    setCurrentQuestion(0);
    setSelectedOptions({});
    setCompleted(false);
  };

  const handleSelectOption = (optionId: number) => {
    if (!quiz) return;
    
    setSelectedOptions(prev => ({
      ...prev,
      [quiz.questions[currentQuestion].id]: optionId
    }));

    // Auto-advance to next question after a brief delay
    setTimeout(() => {
      if (currentQuestion < quiz.questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
      } else {
        setCompleted(true);
      }
    }, 500);
  };

  const calculateResults = () => {
    if (!quiz) return { correctAnswers: 0, score: 0 };

    let correct = 0;
    quiz.questions.forEach((question: QuestionType) => {
      const selectedOption = selectedOptions[question.id];
      const correctOption = question.options.find(opt => opt.is_correct);
      
      if (selectedOption && correctOption && selectedOption === correctOption.id) {
        correct++;
      }
    });

    const score = (correct * parseFloat(quiz.correct_answer_marks)) -
                 ((quiz.questions.length - correct) * parseFloat(quiz.negative_marks));

    return {
      correctAnswers: correct,
      score: Math.max(0, score)
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={loadQuiz}
            className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <QuizCard
          title={quiz.title}
          questionsCount={quiz.questions_count}
          duration={quiz.duration}
          marks={quiz.correct_answer_marks}
          onStart={handleStart}
        />
      </div>
    );
  }

  if (completed) {
    const { correctAnswers, score } = calculateResults();
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <Results
          correctAnswers={correctAnswers}
          totalQuestions={quiz.questions.length}
          score={score}
          onRetry={handleStart}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <Question
        question={quiz.questions[currentQuestion]}
        currentQuestion={currentQuestion}
        totalQuestions={quiz.questions.length}
        selectedOption={selectedOptions[quiz.questions[currentQuestion].id] || null}
        onSelectOption={handleSelectOption}
      />
    </div>
  );
}

export default App;