import Image from 'next/image';

export default function FloatingCarousel() {
  const reelImages = [
    '/images/reel/R3.jpg',
    '/images/reel/R3-1.jpg',
    '/images/reel/R3-2.jpg',
    '/images/reel/R3-3.jpg'
  ];

  // Create multiple copies of images for seamless scrolling
  const createImageRow = (images: string[], count: number = 6) => {
    const repeatedImages = [];
    for (let i = 0; i < count; i++) {
      repeatedImages.push(...images);
    }
    return repeatedImages;
  };

  return (
    <div className="floating-carousel">
      {/* Row 1 */}
      <div className="carousel-row">
        {createImageRow(reelImages).map((src, index) => (
          <Image
            key={`row1-${index}`}
            src={src}
            alt="Food reel"
            width={120}
            height={120}
            className="carousel-image object-cover"
          />
        ))}
      </div>

      {/* Row 2 - offset and different speed */}
      <div className="carousel-row">
        {createImageRow([...reelImages].reverse()).map((src, index) => (
          <Image
            key={`row2-${index}`}
            src={src}
            alt="Food reel"
            width={100}
            height={100}
            className="carousel-image object-cover"
          />
        ))}
      </div>

      {/* Row 3 */}
      <div className="carousel-row">
        {createImageRow(reelImages).map((src, index) => (
          <Image
            key={`row3-${index}`}
            src={src}
            alt="Food reel"
            width={140}
            height={140}
            className="carousel-image object-cover"
          />
        ))}
      </div>
    </div>
  );
}