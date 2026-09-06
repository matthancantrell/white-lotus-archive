'use client';

import { useState } from 'react';
import Image, { type ImageProps } from 'next/image';

// Wraps next/image with a pulsing skeleton shown in its place until the image finishes
// loading, instead of a blank gap or a sudden pop-in once the network request resolves.
// `wrapperClassName` sizes/positions the box (skeleton + image both fill it); `className`
// is passed straight through to the <Image>.
export default function ImageWithSkeleton({
  wrapperClassName,
  wrapperStyle,
  className,
  onLoad,
  ...props
}: ImageProps & { wrapperClassName?: string; wrapperStyle?: React.CSSProperties }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={wrapperClassName} style={wrapperStyle}>
      {!loaded && <div className="absolute inset-0 animate-pulse bg-white/8" />}
      <Image
        {...props}
        className={`${className ?? ''} transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
      />
    </div>
  );
}
