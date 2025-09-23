import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Image from 'next/image';

interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-orange-50 to-amber-50">
      <Card className="w-full max-w-lg mx-auto text-center shadow-xl">
        <CardHeader className="pb-4">
          <div className="flex justify-center mb-6">
            <Image
              src="/images/logo.png"
              alt="Alma"
              width={120}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-2">
            Discover Your Food Personality
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-body">
            (and Ideal Macro Balance)
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <p className="text-gray-700 text-base md:text-lg leading-relaxed font-body mb-6">
            Answer a few quick questions and find out the eating style that fits you best.
          </p>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200 mb-6">
            <p className="text-green-800 font-semibold text-base mb-1">🎁 BONUS: Win $200 in Healthy Treats!</p>
            <p className="text-green-700 text-sm">
              Get entered automatically when you complete the quiz
            </p>
          </div>

          <Button
            onClick={onStart}
            variant="orange"
            size="lg"
            className="w-full text-lg font-body font-semibold"
          >
            Start Your Food Personality Quiz
          </Button>

          <p className="text-sm text-gray-500 font-body text-center mt-2">
            Takes less than 2 minutes
          </p>
        </CardContent>
      </Card>
    </div>
  );
}