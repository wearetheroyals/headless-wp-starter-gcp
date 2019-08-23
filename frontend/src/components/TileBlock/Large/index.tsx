import React from 'react';

import LinkHOC from '../../../lib/linkHOC';

import './style.scss';

interface Props {
  tiles: Array<{
    title: string;
    subtitle?: string;
    linkReference?: string;
    content?: string;
    backgroundImage?: string;
    heroImage?: string;
  }>;
  basePath?: string;
}

const LargeTileBlock: React.SFC<Props> = ({ tiles = [], basePath = '' }) => {
  if (!Array.isArray(tiles)) {
    return null;
  }

  return (
    <section className="large-tile-block">
      {Array.isArray(tiles) &&
        tiles.map(tile => (
          <section key={tile.linkReference} className="tile">
            <LinkHOC linkReference={tile.linkReference} addtlClass="image">
              {tile.backgroundImage && (
                <img src={tile.backgroundImage} alt={tile.title} />
              )}
              {tile.heroImage && <img src={tile.heroImage} alt={tile.title} />}
            </LinkHOC>
            <div className="content">
              <div className="inner">
                <header className="major">
                  <h3>{tile.title}</h3>
                  {tile.subtitle && <span>{tile.subtitle}</span>}
                </header>
                {tile.content && (
                  <span
                    dangerouslySetInnerHTML={{ __html: tile.content }}
                  ></span>
                )}
                <ul className="actions">
                  <li>
                    <LinkHOC
                      linkReference={tile.linkReference}
                      addtlClass="button"
                    >
                      Read more
                    </LinkHOC>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        ))}
    </section>
  );
};

export default LargeTileBlock;
