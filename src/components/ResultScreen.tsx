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
      <Card className="w-full max-w-2xl mx-auto text-center shadow-xl">
        <CardHeader className="pb-4">
          <div className="mb-6">
            <div className="w-24 h-24 mx-auto mb-6 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-4xl">✨</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              You&apos;re {personalityType.name}!
            </h1>
            <p className="text-lg md:text-xl text-gray-600 font-body font-medium">
              {personalityType.description}
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          <div className="bg-white p-6 rounded-xl border border-orange-100">
            <h3 className="text-xl font-heading font-bold text-gray-900 mb-4">
              Your Ideal Macro Balance
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-1">
                  {personalityType.macroSplit.protein}%
                </div>
                <div className="text-sm font-body font-medium text-gray-600">Protein</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">
                  {personalityType.macroSplit.carbs}%
                </div>
                <div className="text-sm font-body font-medium text-gray-600">Carbs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {personalityType.macroSplit.fat}%
                </div>
                <div className="text-sm font-body font-medium text-gray-600">Fat</div>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 p-6 rounded-xl">
            <p className="text-gray-700 text-base md:text-lg leading-relaxed font-body">
              {personalityType.message}
            </p>
          </div>

          <div className="space-y-4">
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Check your email for your complete personalized nutrition guide!
              </p>
            </div>

            <Button
              onClick={onRestart}
              variant="outline"
              className="w-full text-lg py-6 border-2 border-orange-200 text-orange-700 hover:bg-orange-50 font-heading font-semibold rounded-xl transition-all duration-200"
            >
              Take Quiz Again
            </Button>
          </div>

          <div className="pt-4 border-t border-orange-100">
            <Image
              src="/alma-logo.png"
              alt="Alma"
              width={80}
              height={27}
              className="h-6 w-auto mx-auto mb-2"
            />
            <p className="text-sm text-gray-600 font-body">
              Personalized nutrition made simple
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}