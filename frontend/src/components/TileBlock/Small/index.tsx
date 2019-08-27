import React from 'react';

import LinkHOC from '../../../lib/linkHOC';

import './style.scss';

interface Props {
  tiles: Array<{
    title: string;
    slug?: string;
    linkReference?: string;
    backgroundImage?: string;
    heroImage?: string;
  }>;
  basePath?: string;
}

const SmallTileBlock: React.SFC<Props> = ({ tiles = [], basePath = '' }) => {
  if (!Array.isArray(tiles)) {
    return null;
  }

  return (
    <section className="small-tile-block">
      {tiles.map((t, i) => (
        <LinkHOC
          key={`{${t.linkReference}-${i}`}
          linkReference={t.linkReference}
          addtlClass="tile"
        >
          <div className="image-wrapper">
            {/* Empty styled div for height control */}
            <div />
            {t.backgroundImage && <img src={t.backgroundImage} alt={t.title} />}
            {t.heroImage && <img src={t.heroImage} alt={t.title} />}
          </div>
          <div className="content">
            <div className="inner">
              <h3>{t.title}</h3>
            </div>
          </div>
        </LinkHOC>
      ))}
    </section>
  );
};

export default SmallTileBlock;
