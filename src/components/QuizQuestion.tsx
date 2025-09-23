import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { QuizQuestion as QuizQuestionType } from '@/types/quiz';

interface QuizQuestionProps {
  question: QuizQuestionType;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (questionId: string, answerId: string) => void;
}

export default function QuizQuestion({
  question,
  questionNumber,
  totalQuestions,
  onAnswer
}: QuizQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const progress = (questionNumber / totalQuestions) * 100;

  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswer(answerId);
  };

  const handleSubmit = () => {
    if (selectedAnswer) {
      onAnswer(question.id, selectedAnswer);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-orange-50 to-amber-50">
      <Card className="w-full max-w-2xl mx-auto shadow-xl">
        <CardHeader className="pb-4">
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>Question {questionNumber} of {totalQuestions}</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 text-center leading-tight">
            {question.question}
          </h2>

          <div className="space-y-3">
            {question.answers.map((answer) => (
              <button
                key={answer.id}
                onClick={() => handleAnswerSelect(answer.id)}
                className={`w-full p-4 md:p-6 text-left rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
                  selectedAnswer === answer.id
                    ? 'border-orange-500 bg-orange-50 text-orange-800'
                    : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex-shrink-0 ${
                      selectedAnswer === answer.id
                        ? 'border-orange-500 bg-orange-500'
                        : 'border-gray-300'
                    }`}
                  >
                    {selectedAnswer === answer.id && (
                      <div className="w-full h-full rounded-full bg-white scale-50"></div>
                    )}
                  </div>
                  <span className="text-base md:text-lg font-body font-medium">
                    {answer.text}
                  </span>
                </div>
              </button>
            ))}
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!selectedAnswer}
            variant="orange"
            size="lg"
            className="w-full text-lg font-body font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {questionNumber === totalQuestions ? 'Finish Quiz' : 'Next Question'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}