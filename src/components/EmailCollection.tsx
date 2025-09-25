import { useState, useEffect } from 'react';
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
  const [showEmojiShower, setShowEmojiShower] = useState(false);

  const foodEmojis = ['🍎', '🥑', '🥕', '🍌', '🫐', '🍓', '🥒', '🍊', '🥬', '🍇', '🍅', '🥝', '🍑', '🥦', '🌽', '🍒', '🥭', '🍍'];

  const createEmojiShower = () => {
    setShowEmojiShower(true);

    // Create multiple emoji elements
    for (let i = 0; i < 20; i++) {
      const emoji = document.createElement('div');
      const randomEmoji = foodEmojis[Math.floor(Math.random() * foodEmojis.length)];

      emoji.textContent = randomEmoji;
      emoji.className = 'food-emoji-fall';
      emoji.style.left = Math.random() * 100 + '%';
      emoji.style.animationDelay = Math.random() * 2 + 's';
      emoji.style.animationDuration = (3 + Math.random() * 2) + 's';
      emoji.style.fontSize = (20 + Math.random() * 20) + 'px';

      document.body.appendChild(emoji);

      // Remove emoji after animation completes
      setTimeout(() => {
        emoji.remove();
      }, 5000);
    }

    // Hide shower after animation
    setTimeout(() => {
      setShowEmojiShower(false);
    }, 5000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);

    // Trigger emoji shower immediately
    createEmojiShower();

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

      // Wait a bit to show the emoji shower before transitioning
      setTimeout(() => {
        onEmailSubmit(email);
      }, 2000);
    } catch (error) {
      console.error('Error submitting quiz:', error);
      // Still proceed to show results even if email fails
      setTimeout(() => {
        onEmailSubmit(email);
      }, 2000);
    } finally {
      setTimeout(() => {
        setIsSubmitting(false);
      }, 2000);
    }
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const getPersonalityEmoji = (personalityId: string) => {
    const emojiMap: Record<string, string> = {
      'builder': '💪',
      'lean-seeker': '🎯',
      'energizer': '⚡',
      'harmonizer': '⚖️'
    };
    return emojiMap[personalityId] || '✨';
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-orange-50 to-amber-50">
      <Card className="w-full max-w-lg mx-auto text-center shadow-xl">
        <CardHeader className="pb-6">
          <div className="mb-8 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">{getPersonalityEmoji(personalityType.id)}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-3">
              You&apos;re {personalityType.name}!
            </h1>
            <p className="text-gray-700 text-lg font-body leading-relaxed">
              {personalityType.description}
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Personality Summary */}
          <div className="bg-orange-50 p-6 rounded-xl">
            <p className="text-gray-700 text-base font-body leading-relaxed">
              {personalityType.message}
            </p>
          </div>

          {/* Blurred macro balance teaser */}
          <div className="relative bg-white p-8 rounded-xl border border-gray-200 min-h-[160px] flex flex-col justify-center">
            <h3 className="text-xl font-heading font-bold text-gray-900 mb-6 text-center">
              Your Personalized Macro Balance
            </h3>
            <div className="grid grid-cols-3 gap-6 blur-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600 mb-2">
                  {personalityType.macroSplit.protein}%
                </div>
                <div className="text-sm font-body font-medium text-gray-600">Protein</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">
                  {personalityType.macroSplit.carbs}%
                </div>
                <div className="text-sm font-body font-medium text-gray-600">Carbs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  {personalityType.macroSplit.fat}%
                </div>
                <div className="text-sm font-body font-medium text-gray-600">Fat</div>
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white px-4 py-2 rounded-full shadow-sm border">
                <span className="text-sm font-body font-medium text-gray-600">📧 Enter email below</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-xl border border-green-200 text-center">
            <div className="text-5xl mb-6">🎁</div>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-green-800 mb-4">
              Win $200 Gift Voucher
            </h2>
            <p className="text-green-700 text-lg">
              Automatic entry when you get your results
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="avocado.toast@gmail.com"
              className="text-center text-xl py-6 border-2 rounded-xl"
              required
            />

            <Button
              type="submit"
              disabled={!isValidEmail(email) || isSubmitting}
              variant="orange"
              size="lg"
              className="w-full text-xl font-heading font-semibold disabled:opacity-50 disabled:cursor-not-allowed py-4 rounded-xl"
            >
              {isSubmitting ? 'Unlocking Results...' : 'Get My Results'}
            </Button>
          </form>

          <p className="text-sm text-gray-400 font-body text-center pt-2">
            No spam. Results delivered instantly.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}