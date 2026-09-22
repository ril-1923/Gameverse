import { useState, type ImgHTMLAttributes } from 'react';

interface SafeImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

export default function SafeImage({ src, alt, className, ...rest }: SafeImageProps) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div className={`safe-image-fallback d-flex align-items-center justify-content-center ${className ?? ''}`} role="img" aria-label={alt}>
        <i className="bi bi-controller" aria-hidden="true" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setErrored(true)}
      {...rest}
    />
  );
}
