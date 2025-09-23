import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { PersonalityType } from '@/types/quiz';

interface EmailCollectionProps {
  personalityType: PersonalityType;
  onEmailSubmit: (email: string) => void;
}

export default function EmailCollection({ personalityType, onEmailSubmit }: EmailCollectionProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/submit-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          personalityType,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit quiz');
      }

      onEmailSubmit(email);
    } catch (error) {
      console.error('Error submitting quiz:', error);
      // Still proceed to show results even if email fails
      onEmailSubmit(email);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-orange-50 to-amber-50">
      <Card className="w-full max-w-lg mx-auto text-center shadow-xl">
        <CardHeader className="pb-4">
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🎉</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Quiz Complete!
            </h1>
            <p className="text-lg text-gray-600">
              You&apos;re <span className="text-orange-600 font-semibold">{personalityType.name}</span>
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="bg-orange-50 p-4 rounded-xl">
            <p className="text-gray-700 text-sm md:text-base">
              Get your personalized macro recommendations and discover how Alma can help you achieve your goals.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-left">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Enter your email to discover your food personality
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="text-base py-3"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={!isValidEmail(email) || isSubmitting}
              className="w-full text-lg py-6 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-lg transition-all duration-200"
            >
              {isSubmitting ? 'Sending...' : 'Get My Results'}
            </Button>
          </form>

          <p className="text-xs text-gray-500">
            We&apos;ll send you your personalized results and macro recommendations. No spam, ever.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}