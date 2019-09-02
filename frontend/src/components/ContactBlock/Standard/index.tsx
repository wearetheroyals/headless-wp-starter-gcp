import React from 'react';
import TrackVisibility from 'react-on-screen';

import ContactCard from '../../ContactCard';

import { Person } from '../../../types';

interface Props {
  contacts: Array<Person>;
  title?: string;
  subtitle?: string;
  isVisible?: boolean;
}

const StandardContact: React.SFC<Props> = ({
  contacts = [],
  title = '',
  subtitle,
}) => {
  return (
    <TrackVisibility partialVisibility className="container">
      {({ isVisible }) => {
        return (
          <div className={`inner ${isVisible ? 'visible' : ''}`}>
            <div className="container">
              {title && <h2 className="title">{title}</h2>}
              {subtitle && (
                <p
                  className="subtitle"
                  dangerouslySetInnerHTML={{
                    __html: subtitle,
                  }}
                ></p>
              )}
            </div>
            {Array.isArray(contacts) &&
              contacts.map((contact, index) => {
                const isOddNumber = index % 2;
                // Staggers transition when text module layout is alternated
                const imageFadeIn = isOddNumber ? index * 2 + 2 : index * 2 + 1;
                const textFadeIn = isOddNumber ? index * 2 + 1 : index * 2 + 2;

                return (
                  <ContactCard
                    key={contact.name}
                    card={contact}
                    imageFadeIn={imageFadeIn}
                    textFadeIn={textFadeIn}
                    type="standard"
                  />
                );
              })}
          </div>
        );
      }}
    </TrackVisibility>
  );
};

export default StandardContact;
