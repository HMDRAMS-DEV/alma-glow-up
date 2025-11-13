'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Image from 'next/image';

interface ImageUploadProps {
  onImageSelect: (imageUrl: string) => void;
}

export default function ImageUpload({ onImageSelect }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
      setIsLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please try uploading a photo instead.');
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0);
      const imageData = canvas.toDataURL('image/jpeg');
      setPreview(imageData);

      // Stop camera
      const stream = videoRef.current.srcObject as MediaStream;
      stream?.getTracks().forEach(track => track.stop());
      setIsCameraActive(false);
    }
  };

  const handleSubmit = () => {
    if (preview) {
      onImageSelect(preview);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-orange-50 to-amber-50">
      <Card className="w-full max-w-lg mx-auto text-center shadow-xl">
        <CardHeader className="pb-6">
          <div className="space-y-4">
            <Image
              src="/images/logo.png"
              alt="Alma"
              width={120}
              height={40}
              className="h-8 w-auto mx-auto"
            />
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900">
              Meal Glow Up ✨
            </h1>
            <p className="text-lg md:text-xl text-gray-600 font-body">
              Transform your meal into a 5-star restaurant masterpiece
            </p>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          {!preview && !isCameraActive && (
            <div className="space-y-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />

              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="orange"
                size="lg"
                className="w-full text-lg font-body font-semibold"
                disabled={isLoading}
              >
                📸 Choose a Photo
              </Button>
            </div>
          )}

          {isCameraActive && (
            <div className="space-y-4">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full rounded-lg"
              />
              <Button
                onClick={capturePhoto}
                variant="orange"
                size="lg"
                className="w-full text-lg font-body font-semibold"
              >
                📸 Capture
              </Button>
            </div>
          )}

          {isLoading && (
            <div className="space-y-4">
              <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-3"></div>
                  <p className="text-gray-600 font-body">Loading your photo...</p>
                </div>
              </div>
            </div>
          )}

          {preview && !isLoading && (
            <div className="space-y-4">
              <div className="relative w-full aspect-square rounded-lg overflow-hidden">
                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => {
                    setPreview(null);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = '';
                    }
                  }}
                  variant="outline"
                  size="lg"
                  className="flex-1"
                >
                  Try Again
                </Button>

                <Button
                  onClick={handleSubmit}
                  variant="orange"
                  size="lg"
                  className="flex-1"
                >
                  Glow It Up! ✨
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
