import React from 'react';

import StandardCard from './Standard';
import GridCard from './Grid';
import ProfileCard from './Profile';

import { Person } from '../../types';

interface Props {
  card: Person;
  type: string;
  imageFadeIn?: number;
  textFadeIn?: number;
  num?: number;
}

const ContactCard: React.SFC<Props> = ({
  card,
  type = 'standard',
  imageFadeIn,
  textFadeIn,
  num,
}) => {
  if (!card) {
    return null;
  }

  const contactCardJSX = {
    standard: () => (
      <StandardCard
        card={card}
        imageFadeIn={imageFadeIn}
        textFadeIn={textFadeIn}
      />
    ),
    grid: () => <GridCard card={card} num={num} />,
    profile: () => <ProfileCard card={card} num={num} />,
  };

  if (contactCardJSX[type]) {
    return contactCardJSX[type]();
  }

  return null;
};

export default ContactCard;
