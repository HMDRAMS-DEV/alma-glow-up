'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Image from 'next/image';

interface ProcessingScreenProps {
  originalImage: string;
}

const funMessages = [
  "👨‍🍳 Calling our AI chef...",
  "🎨 Adding artistic plating techniques...",
  "✨ Sprinkling some Michelin magic...",
  "🍽️ Perfecting the presentation...",
  "📸 Adjusting the lighting like a pro...",
  "🌟 Making it Instagram-worthy...",
  "👔 Dressing up your dish...",
  "🎭 Adding that wow factor...",
  "🏆 Giving it the 5-star treatment...",
  "💎 Polishing to perfection..."
];

export default function ProcessingScreen({ originalImage }: ProcessingScreenProps) {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Cycle through messages
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % funMessages.length);
    }, 2000);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 10;
      });
    }, 500);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-orange-50 to-amber-50">
      <Card className="w-full max-w-lg mx-auto text-center shadow-xl">
        <CardHeader className="pb-4">
          <div className="mb-6">
            <Image
              src="/images/logo.png"
              alt="Alma"
              width={120}
              height={40}
              className="h-8 w-auto mx-auto mb-6"
            />
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              Creating Magic... ✨
            </h1>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-6">
            <Image
              src={originalImage}
              alt="Processing"
              fill
              className="object-cover opacity-50 blur-sm"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl animate-pulse">
                👨‍🍳
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Progress value={progress} className="h-3" />

            <p className="text-xl font-body font-medium text-gray-700 animate-fade-in">
              {funMessages[currentMessage]}
            </p>

            <p className="text-sm text-gray-500 font-body">
              This usually takes 10-20 seconds
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
