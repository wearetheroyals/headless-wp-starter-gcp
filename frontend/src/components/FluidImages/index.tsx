import React from 'react';

import FluidImage from './FluidImage';

import './style.scss';

interface Props {
  fluidImages: Array<{
    type: string;
    linkReference: string;
    style: string;
    content: string;
    backgroundImage: string;
  }>;
}

const FluidImages: React.SFC<Props> = ({ fluidImages = [] }) => {
  return (
    <section className="image-links">
      {Array.isArray(fluidImages) &&
        fluidImages.map(({ linkReference, ...props }) => {
          return (
            <FluidImage
              key={linkReference}
              linkReference={linkReference}
              {...props}
            ></FluidImage>
          );
        })}
    </section>
  );
};

export default FluidImages;
