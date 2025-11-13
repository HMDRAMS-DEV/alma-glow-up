'use client';

import { useState } from 'react';
import ImageUpload from './ImageUpload';
import ProcessingScreen from './ProcessingScreen';
import MealGlowUpResult from './MealGlowUpResult';

type Step = 'upload' | 'processing' | 'result';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function MealGlowUp() {
  const [currentStep, setCurrentStep] = useState<Step>('upload');
  const [originalImage, setOriginalImage] = useState<string>('');
  const [transformedImage, setTransformedImage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = async (imageUrl: string) => {
    setOriginalImage(imageUrl);
    setCurrentStep('processing');
    setError(null);

    try {
      // Create prediction
      const response = await fetch('/api/predictions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageUrl: imageUrl,
        }),
      });

      let prediction = await response.json();

      if (response.status !== 201) {
        setError(prediction.detail || 'Failed to start transformation');
        setCurrentStep('upload');
        return;
      }

      // Poll for completion
      while (
        prediction.status !== 'succeeded' &&
        prediction.status !== 'failed'
      ) {
        await sleep(1000);
        const statusResponse = await fetch(`/api/predictions/${prediction.id}`);
        prediction = await statusResponse.json();

        if (statusResponse.status !== 200) {
          setError(prediction.detail || 'Failed to get prediction status');
          setCurrentStep('upload');
          return;
        }

        console.log({ prediction });
      }

      if (prediction.status === 'failed') {
        setError('Transformation failed. Please try again with a different image.');
        setCurrentStep('upload');
        return;
      }

      // Get the output image URL
      const outputUrl = Array.isArray(prediction.output)
        ? prediction.output[0]
        : prediction.output;

      setTransformedImage(outputUrl);
      setCurrentStep('result');

    } catch (err) {
      console.error('Error:', err);
      setError('Something went wrong. Please try again.');
      setCurrentStep('upload');
    }
  };

  const handleTryAnother = () => {
    setOriginalImage('');
    setTransformedImage('');
    setError(null);
    setCurrentStep('upload');
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={handleTryAnother}
            className="px-4 py-2 bg-orange-500 text-white rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  switch (currentStep) {
    case 'upload':
      return <ImageUpload onImageSelect={handleImageSelect} />;

    case 'processing':
      return <ProcessingScreen originalImage={originalImage} />;

    case 'result':
      return (
        <MealGlowUpResult
          originalImage={originalImage}
          transformedImage={transformedImage}
          onTryAnother={handleTryAnother}
        />
      );

    default:
      return <ImageUpload onImageSelect={handleImageSelect} />;
  }
}
