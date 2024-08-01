import React, { FC, MouseEvent } from 'react';
import Image, { StaticImageData } from 'next/image';

interface NjImageProps {
  src: string | StaticImageData;
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
  ref?: (node: HTMLElement | null) => void;
  onClick?: (e: MouseEvent) => void;
}

const NjImage: FC<NjImageProps> = ({
  ref,
  src,
  alt,
  className,
  width,
  height,
  sizes,
  priority,
  onClick,
}) => {
  const validSrc =
    typeof src === 'string' && !src.startsWith('/') ? `/${src}` : src;

  return (
    <Image
      ref={ref}
      onClick={onClick}
      src={validSrc}
      alt={alt}
      className={className}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
    />
  );
};

export default NjImage;
