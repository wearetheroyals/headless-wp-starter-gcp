import React from 'react';

import './style.scss';

import { Person } from '../../../types';

interface Props {
  card: Person;
  num: number;
}

const ProfileCard: React.SFC<Props> = ({ card, num }) => {
  if (!card) {
    return null;
  }

  return (
    <div className={`col-4 col-12-small fade-in-${num}`}>
      <div className="contact-card contact-method">
        <div className="icon">
          {card.image && (
            <img src={card.image} style={{ position: 'relative' }} alt="" />
          )}
        </div>
        <div className="content">
          <div className="inner">
            {card.title && <span>{card.title}</span>}
            <h5>{card.name}</h5>
            {card.shortBio && (
              <p
                dangerouslySetInnerHTML={{
                  __html: card.shortBio,
                }}
              ></p>
            )}
            <ul className="actions">
              {card.email && (
                <li>
                  <a href={`mailto:${card.email}`}>{card.email}</a>
                </li>
              )}
              {card.phone && (
                <li>
                  <a href={`tel:${card.phone}`}>{card.phone}</a>
                </li>
              )}
              {card.twitter && (
                <li>
                  <a href={`https://twitter.com/${card.twitter}`}>
                    @{card.twitter}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
