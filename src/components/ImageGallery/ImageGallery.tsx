'use client';

import type React from 'react';
import { useState, useCallback } from 'react';
import Image from 'next/image';
import type { GalleryImage } from '@/data/gallery-images';
import styles from './ImageGallery.module.css';

interface ImageGalleryProps {
  images: GalleryImage[];
  initialIndex?: number;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  initialIndex = 0,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const getPrevIndex = useCallback(
    (index: number) => {
      return index === 0 ? images.length - 1 : index - 1;
    },
    [images.length]
  );

  const getNextIndex = useCallback(
    (index: number) => {
      return index === images.length - 1 ? 0 : index + 1;
    },
    [images.length]
  );

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => getPrevIndex(prevIndex));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => getNextIndex(prevIndex));
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  if (images.length === 0) {
    return (
      <div className={styles.noImages}>Немає зображень для відображення</div>
    );
  }

  const prevIndex = getPrevIndex(currentIndex);
  const nextIndex = getNextIndex(currentIndex);

  return (
    <div className={styles.galleryContainer}>
      <div className={styles.mainGallery}>
        <button
          className={`${styles.navButton} ${styles.prevButton}`}
          onClick={goToPrevious}
          aria-label="Попереднє зображення"
        >
          &#10094;
        </button>

        <div className={styles.imagesContainer}>
          <div className={`${styles.imageWrapper} ${styles.prevImage}`}>
            <div className={styles.imageContainer}>
              <Image
                src={images[prevIndex].src || '/placeholder.svg'}
                alt={images[prevIndex].alt}
                width={800}
                height={500}
                className={styles.galleryImage}
              />
            </div>
          </div>

          <div className={`${styles.imageWrapper} ${styles.activeImage}`}>
            <div className={styles.imageContainer}>
              <Image
                src={images[currentIndex].src || '/placeholder.svg'}
                alt={images[currentIndex].alt}
                width={800}
                height={500}
                className={styles.galleryImage}
                priority
              />
            </div>
          </div>

          <div className={`${styles.imageWrapper} ${styles.nextImage}`}>
            <div className={styles.imageContainer}>
              <Image
                src={images[nextIndex].src || '/placeholder.svg'}
                alt={images[nextIndex].alt}
                width={800}
                height={500}
                className={styles.galleryImage}
              />
            </div>
          </div>
        </div>

        <button
          className={`${styles.navButton} ${styles.nextButton}`}
          onClick={goToNext}
          aria-label="Наступне зображення"
        >
          &#10095;
        </button>
      </div>

      <div className={styles.thumbnailsContainer}>
        <div className={styles.thumbnailsScroll}>
          {images.map((image, index) => (
            <div
              key={image.id}
              className={`${styles.thumbnail} ${index === currentIndex ? styles.activeThumbnail : ''}`}
              onClick={() => goToImage(index)}
            >
              <Image
                src={image.thumbnail || '/placeholder.svg'}
                alt={`Мініатюра: ${image.alt}`}
                width={100}
                height={100}
                className={styles.thumbnailImage}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
