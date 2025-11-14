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

    // Create preview and compress
    const reader = new FileReader();
    reader.onload = async (e) => {
      const originalDataUrl = e.target?.result as string;
      const compressedDataUrl = await compressImage(originalDataUrl);
      setPreview(compressedDataUrl);
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

  const compressImage = (dataUrl: string, maxWidth: number = 1200, maxHeight: number = 1200, quality: number = 0.7): Promise<string> => {
    return new Promise((resolve) => {
      if (typeof window === 'undefined') {
        resolve(dataUrl);
        return;
      }

      const img = document.createElement('img') as HTMLImageElement;
      img.src = dataUrl;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Calculate new dimensions maintaining aspect ratio
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedDataUrl);
        } else {
          resolve(dataUrl);
        }
      };
      img.onerror = () => resolve(dataUrl);
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

  const capturePhoto = async () => {
    if (!videoRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0);
      const imageData = canvas.toDataURL('image/jpeg');

      // Compress the captured image
      const compressedImageData = await compressImage(imageData);
      setPreview(compressedImageData);

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
