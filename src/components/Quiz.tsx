'use client';

import { useState } from 'react';
import { QuizStep, QuizState } from '@/types/quiz';
import { quizQuestions, calculatePersonalityType } from '@/data/quiz';
import WelcomeScreen from '@/components/WelcomeScreen';
import QuizQuestion from '@/components/QuizQuestion';
import EmailCollection from '@/components/EmailCollection';
import ResultScreen from '@/components/ResultScreen';

export default function Quiz() {
  const [currentStep, setCurrentStep] = useState<QuizStep>('welcome');
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    answers: {},
    isComplete: false
  });

  const handleStartQuiz = () => {
    setCurrentStep('quiz');
  };

  const handleAnswer = (questionId: string, answerId: string) => {
    const newAnswers = { ...quizState.answers, [questionId]: answerId };
    const newQuestionIndex = quizState.currentQuestion + 1;

    if (newQuestionIndex >= quizQuestions.length) {
      // Quiz complete, calculate result
      const result = calculatePersonalityType(newAnswers);
      setQuizState({
        ...quizState,
        answers: newAnswers,
        isComplete: true,
        result
      });
      setCurrentStep('email');
    } else {
      // Next question
      setQuizState({
        ...quizState,
        answers: newAnswers,
        currentQuestion: newQuestionIndex
      });
    }
  };

  const handleEmailSubmit = (email: string) => {
    // TODO: Send email via Loops API
    console.log('Email submitted:', email, 'Result:', quizState.result);
    setCurrentStep('result');
  };

  const handleRestart = () => {
    setQuizState({
      currentQuestion: 0,
      answers: {},
      isComplete: false
    });
    setCurrentStep('welcome');
  };

  switch (currentStep) {
    case 'welcome':
      return <WelcomeScreen onStart={handleStartQuiz} />;

    case 'quiz':
      return (
        <QuizQuestion
          question={quizQuestions[quizState.currentQuestion]}
          questionNumber={quizState.currentQuestion + 1}
          totalQuestions={quizQuestions.length}
          onAnswer={handleAnswer}
        />
      );

    case 'email':
      return (
        <EmailCollection
          personalityType={quizState.result!}
          onEmailSubmit={handleEmailSubmit}
        />
      );

    case 'result':
      return (
        <ResultScreen
          personalityType={quizState.result!}
          onRestart={handleRestart}
        />
      );

    default:
      return <WelcomeScreen onStart={handleStartQuiz} />;
  }
}