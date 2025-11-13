'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Image from 'next/image';

interface MealGlowUpResultProps {
  originalImage: string;
  transformedImage: string;
  onTryAnother: () => void;
}

export default function MealGlowUpResult({
  originalImage,
  transformedImage,
  onTryAnother
}: MealGlowUpResultProps) {
  const [watermarkedImageUrl, setWatermarkedImageUrl] = useState<string | null>(null);
  const [showSaveHint, setShowSaveHint] = useState(false);

  // Generate watermarked image on mount
  useEffect(() => {
    createWatermarkedImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transformedImage]);

  const createWatermarkedImage = async () => {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // First, fetch the image through a proxy to avoid CORS
      const response = await fetch(transformedImage);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      // Load the transformed image
      const img = await loadImage(blobUrl);
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the main image
      ctx.drawImage(img, 0, 0);

      // Load and draw watermark
      const watermark = await loadImage('/images/watermark.png');
      const watermarkHeight = img.height * 0.08; // 8% of image height (15% bigger than before)
      const watermarkWidth = (watermark.width / watermark.height) * watermarkHeight;
      const paddingX = img.width * 0.04; // 4% padding from right edge (more space)
      const paddingY = img.height * 0.04; // 4% padding from bottom edge (more space)

      // Draw watermark in bottom right with slight transparency
      ctx.globalAlpha = 0.85;
      ctx.drawImage(
        watermark,
        img.width - watermarkWidth - paddingX,
        img.height - watermarkHeight - paddingY,
        watermarkWidth,
        watermarkHeight
      );

      // Convert to data URL for display and download
      const watermarkedUrl = canvas.toDataURL('image/jpeg', 0.95);
      setWatermarkedImageUrl(watermarkedUrl);

      // Clean up blob URL
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Error creating watermarked image:', error);
      // Fallback to original image
      setWatermarkedImageUrl(transformedImage);
    }
  };

  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  };

  const createWatermarkedBlob = async (): Promise<Blob> => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get canvas context');

    // Load the original transformed image (not the preview)
    const response = await fetch(transformedImage);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    const img = await loadImage(blobUrl);

    // Set canvas to actual image dimensions
    canvas.width = img.width;
    canvas.height = img.height;

    // Draw the main image
    ctx.drawImage(img, 0, 0);

    // Load and draw watermark
    const watermark = await loadImage('/images/watermark.png');
    const watermarkHeight = img.height * 0.08;
    const watermarkWidth = (watermark.width / watermark.height) * watermarkHeight;
    const paddingX = img.width * 0.04;
    const paddingY = img.height * 0.04;

    ctx.globalAlpha = 0.85;
    ctx.drawImage(
      watermark,
      img.width - watermarkWidth - paddingX,
      img.height - watermarkHeight - paddingY,
      watermarkWidth,
      watermarkHeight
    );

    // Clean up
    URL.revokeObjectURL(blobUrl);

    // Return as blob
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Failed to create blob'));
      }, 'image/jpeg', 0.95);
    });
  };

  const handleSaveImage = async () => {
    try {
      // Show hint for iOS users
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      if (isIOS) {
        setShowSaveHint(true);
        setTimeout(() => setShowSaveHint(false), 4000);
      }

      // Create watermarked blob from original full-res image
      const blob = await createWatermarkedBlob();
      const file = new File([blob], 'meal-glow-up.jpg', { type: 'image/jpeg' });

      // On mobile, always use share API (iOS Safari, Android Chrome)
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Meal Glow Up'
        });
      } else {
        // Desktop fallback: download
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'meal-glow-up.jpg';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.log('Save failed:', error);
      setShowSaveHint(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-orange-50 to-amber-50">
      <Card className="w-full max-w-2xl mx-auto text-center shadow-xl">
        <CardHeader className="pb-6">
          <div className="space-y-4">
            <div className="w-20 h-20 mx-auto bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-4xl">✨</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900">
              Your Meal Got a Glow Up! 🌟
            </h1>
            <p className="text-lg md:text-xl text-gray-600 font-body font-medium">
              From home cooking to 5-star restaurant quality
            </p>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <p className="text-sm font-body font-semibold text-gray-500 uppercase tracking-wide">
                Before
              </p>
              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-50">
                <Image
                  src={originalImage}
                  alt="Original meal"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-body font-semibold text-orange-600 uppercase tracking-wide">
                After ✨
              </p>
              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border-2 border-orange-400 shadow-lg bg-gray-50">
                {watermarkedImageUrl ? (
                  <Image
                    src={watermarkedImageUrl}
                    alt="Transformed meal"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <p className="text-gray-500">Processing...</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {showSaveHint && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800 font-body">
                💡 Tap &quot;Save Image&quot; in the share menu to add to Photos
              </div>
            )}

            <Button
              onClick={handleSaveImage}
              variant="orange"
              size="lg"
              className="w-full text-lg font-body font-semibold"
              disabled={!watermarkedImageUrl}
            >
              💾 Save Image
            </Button>

            <Button
              onClick={async () => {
                try {
                  // Create watermarked blob from original full-res image
                  const blob = await createWatermarkedBlob();
                  const file = new File([blob], 'meal-glow-up.jpg', { type: 'image/jpeg' });

                  if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
                    await navigator.share({
                      files: [file],
                      title: 'Meal Glow Up',
                      text: 'Check out my meal transformation! 🌟'
                    });
                  } else if (navigator.share) {
                    // Share without files (some browsers don't support file sharing)
                    await navigator.share({
                      title: 'Meal Glow Up',
                      text: 'Check out my meal transformation! 🌟',
                      url: window.location.origin
                    });
                  } else {
                    // Fallback: copy link
                    await navigator.clipboard.writeText(window.location.origin);
                    alert('Link copied to clipboard!');
                  }
                } catch (error) {
                  console.log('Share cancelled or failed:', error);
                }
              }}
              variant="outline"
              size="lg"
              className="w-full text-lg font-body font-semibold"
            >
              📤 Share with Friends
            </Button>

            <Button
              onClick={onTryAnother}
              variant="outline"
              size="lg"
              className="w-full text-lg font-body font-semibold"
            >
              🔄 Try Another Meal
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
