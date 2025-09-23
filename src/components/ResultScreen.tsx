import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { PersonalityType } from '@/types/quiz';
import Image from 'next/image';

interface ResultScreenProps {
  personalityType: PersonalityType;
  onRestart: () => void;
}

export default function ResultScreen({ personalityType, onRestart }: ResultScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-orange-50 to-amber-50">
      <Card className="w-full max-w-lg mx-auto text-center shadow-xl">
        <CardHeader className="pb-4">
          <div className="mb-6">
            <div className="w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-4xl">✅</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              Great job!
            </h1>
            <p className="text-lg md:text-xl text-gray-600 font-body font-medium">
              Check your email for your complete personalized nutrition blueprint.
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Button
              onClick={(e) => {
                navigator.clipboard.writeText(window.location.origin);
                (e.target as HTMLElement).textContent = '✅ Link Copied!';
              }}
              variant="orange"
              size="lg"
              className="w-full text-lg font-body font-semibold"
            >
              📤 Share This Quiz with a Friend
            </Button>
          </div>

          <div className="pt-4 border-t border-orange-100">
            <Image
              src="/images/logo.png"
              alt="Alma"
              width={80}
              height={27}
              className="h-6 w-auto mx-auto mb-2"
            />
            <p className="text-sm text-gray-600 font-body">
              Your nutrition coach is finally here
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}