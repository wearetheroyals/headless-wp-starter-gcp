import React, { useState } from 'react';

import LinkHOC from '../../lib/linkHOC';

import './style.scss';

interface Props {
  items: Array<CarouselItem>;
  type: string;
}
interface CarouselItem {
  linkReference: string;
  content?: string;
  style?: string;
  desktopImage?: string;
  mobileImage?: string;
}

const Carousel: React.SFC<Props> = ({ items = [], type }) => {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  const [slideIdx, setSlideIdx] = useState(0);
  const length = items.length;

  const handleNext = () =>
    slideIdx === length - 1 ? setSlideIdx(0) : setSlideIdx(slideIdx + 1);
  const handlePrevious = () =>
    slideIdx === 0 ? setSlideIdx(length - 1) : setSlideIdx(slideIdx - 1);

  const linkInner = (item: CarouselItem) => (
    <React.Fragment>
      {item.desktopImage && <img src={item.desktopImage} />}
      {item.content && (
        <div
          className="carousel-text"
          dangerouslySetInnerHTML={{
            __html: item.content,
          }}
        />
      )}
    </React.Fragment>
  );

  return (
    <section className="carousel">
      {Array.isArray(items) &&
        items.map((item, index) => (
          <div
            key={`${item.linkReference}-${index}`}
            className={`carousel-item ${index === slideIdx ? 'active' : ''}`}
          >
            <LinkHOC linkReference={item.linkReference}>
              {linkInner(item)}
            </LinkHOC>
          </div>
        ))}
      <div className="arrow previous" onClick={handlePrevious}>
        <img src="/static/vector/icon-previous.svg" alt="previous" />
      </div>
      <div className="arrow next" onClick={handleNext}>
        <img src="/static/vector/icon-next.svg" alt="next" />
      </div>
    </section>
  );
};

export default Carousel;
