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
              src="/alma-logo.png"
              alt="Alma"
              width={120}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
            Discover Your Food Personality
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-body">
            (and Ideal Macro Balance)
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <p className="text-gray-700 text-base md:text-lg leading-relaxed font-body">
            Answer a few quick questions and find out the eating style that fits you best.
          </p>

          <div className="space-y-4 text-sm md:text-base text-gray-600 font-body">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
              <span>5 quick questions</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
              <span>Personalized macro recommendations</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
              <span>Takes less than 2 minutes</span>
            </div>
          </div>

          <Button
            onClick={onStart}
            className="w-full text-lg py-6 bg-orange-600 hover:bg-orange-700 text-white font-heading font-semibold rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            Start Your Food Personality Quiz
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}