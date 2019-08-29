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

const GridContact: React.SFC<Props> = ({
  contacts = [],
  title = '',
  subtitle,
  isVisible = false,
}) => {
  return (
    <TrackVisibility partialVisibility className="container">
      {({ isVisible }) => {
        return (
          <div className={`inner ${isVisible ? 'visible' : ''}`}>
            <div className="row">
              <div className="col-6 col-12-small fade-in-1">
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
              <div className="col-6 col-12-small">
                <div className="row">
                  {Array.isArray(contacts) &&
                    contacts.map((contact, idx) => {
                      return (
                        <ContactCard
                          key={contact.name}
                          card={contact}
                          type="grid"
                          num={idx + 2}
                        />
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </TrackVisibility>
  );
};

export default GridContact;
