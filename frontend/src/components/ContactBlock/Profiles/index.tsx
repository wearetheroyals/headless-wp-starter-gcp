import React from 'react';
import TrackVisibility from 'react-on-screen';

import ContactCard from '../../ContactCard';

import { Person } from '../../../types';

interface Props {
  contacts: Array<Person>;
  title?: string;
  subtitle?: string;
}

const ProfilesContact: React.SFC<Props> = ({
  contacts = [],
  title = '',
  subtitle,
}) => {
  return (
    <TrackVisibility partialVisibility className="container">
      {({ isVisible }) => {
        return (
          <div className={`inner ${isVisible ? 'visible' : ''}`}>
            <div className="row">
              <div className="col-12 fade-in-1">
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
            </div>
            <div className="row">
              {Array.isArray(contacts) &&
                contacts.map((contact, idx) => (
                  <ContactCard
                    key={contact.name}
                    card={contact}
                    type="profile"
                    num={idx + 2}
                  />
                ))}
            </div>
          </div>
        );
      }}
    </TrackVisibility>
  );
};

export default ProfilesContact;
