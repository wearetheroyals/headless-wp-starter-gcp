import React from 'react';

import TileBlockSmall from './Small';
import TileBlockLarge from './Large';

import './style.scss';

interface Props {
  type: string;
  tiles: Array<{
    title: string;
    subtitle?: string;
    slug?: string;
    linkReference?: string;
    backgroundImage?: string;
    heroImage?: string;
  }>;
  basePath?: string;
}

const TileBlock: React.SFC<Props> = ({ type, ...props }) => {
  const BlockMap = {
    small: () => <TileBlockSmall {...props} />,
    large: () => <TileBlockLarge {...props} />,
  };

  if (BlockMap[type]) {
    return BlockMap[type]();
  }

  return null;
};

export default TileBlock;
