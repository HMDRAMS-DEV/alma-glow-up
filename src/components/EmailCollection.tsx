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
              <span className="text-2xl">✨</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-4">
              You&apos;re {personalityType.name}!
            </h1>

            {/* Preview of their macro split */}
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-xl mb-4">
              <p className="text-sm font-body text-gray-600 mb-3">Your ideal macro balance:</p>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-xl font-heading font-bold text-orange-600">{personalityType.macroSplit.protein}%</div>
                  <div className="text-xs font-body text-gray-600">Protein</div>
                </div>
                <div>
                  <div className="text-xl font-heading font-bold text-green-600">{personalityType.macroSplit.carbs}%</div>
                  <div className="text-xs font-body text-gray-600">Carbs</div>
                </div>
                <div>
                  <div className="text-xl font-heading font-bold text-blue-600">{personalityType.macroSplit.fat}%</div>
                  <div className="text-xs font-body text-gray-600">Fat</div>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-gray-700 text-sm md:text-base font-body mb-2">
              <strong>But here&apos;s the real question:</strong>
            </p>
            <p className="text-gray-800 text-base md:text-lg font-body leading-relaxed">
              How do you turn this knowledge into effortless daily habits that actually stick?
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-left">
              <label htmlFor="email" className="block text-sm font-body font-medium text-gray-700 mb-2">
                Get your complete {personalityType.name} nutrition blueprint
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
              className="w-full text-lg py-6 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-heading font-semibold rounded-xl shadow-lg transition-all duration-200"
            >
              {isSubmitting ? 'Unlocking Your Blueprint...' : 'Unlock My Perfect Macro Split'}
            </Button>
          </form>

          <div className="text-center space-y-2">
            <p className="text-xs text-gray-600 font-body">
              ✓ Your personalized meal timing strategy<br/>
              ✓ Exact protein targets for your goals<br/>
              ✓ How to track without obsessing
            </p>
            <p className="text-xs text-gray-500 font-body">
              No spam. Just your results, delivered instantly.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}