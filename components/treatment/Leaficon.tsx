import React from 'react';

interface LeafIconProps {
  className?: string;
  src?: string; // optional custom image source
  alt?: string; // optional alt text
}

const LeafIcon: React.FC<LeafIconProps> = ({ className, src, alt }) => (
  <img
    src={src || 'image/treatment/icons/wellness.png'} // default image path
    alt={alt || 'Leaf Icon'}
    className={className}
  />
);

export default LeafIcon;
