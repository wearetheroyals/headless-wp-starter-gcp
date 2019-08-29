import React from 'react';

import './style.scss';

import { Person } from '../../../types';

interface Props {
  card: Person;
  imageFadeIn?: number;
  textFadeIn?: number;
}

const StandardCard: React.SFC<Props> = ({ card, imageFadeIn, textFadeIn }) => {
  if (!card) {
    return null;
  }

  return (
    <article className="contact-card">
      <div className={`image fade-in-${imageFadeIn}`}>
        {card.image && <img src={card.image} alt="" />}
      </div>
      <div className={`content fade-in-${textFadeIn}`}>
        <div className="inner">
          <header className="major">
            <h3>{card.name}</h3>
            {card.title && <span>{card.title}</span>}
          </header>
          {card.shortBio && (
            <p
              dangerouslySetInnerHTML={{
                __html: card.shortBio,
              }}
            ></p>
          )}
          <ul className="actions">
            <li>
              <a href={`mailto:${card.email}`}>{card.email}</a>
            </li>
            <li>
              <a href={`tel:${card.phone}`}>{card.phone}</a>
            </li>
            <li>
              <a href={`https://twitter.com/${card.twitter}`}>
                @{card.twitter}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </article>
  );
};

export default StandardCard;
