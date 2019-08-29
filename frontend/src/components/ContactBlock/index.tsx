import React from 'react';

import StandardContact from './Standard';
import GridContact from './Grid';
import ProfilesContact from './Profiles';

import './style.scss';

import { Person } from '../../types';

interface Props {
  contacts: Array<Person>;
  title?: string;
  type?: string;
  subtitle?: string;
}

const ContactBlock: React.SFC<Props> = ({ type, ...props }) => {
  const contactJSX = {
    standard: () => <StandardContact {...props} />,
    grid: () => <GridContact {...props} />,
    profile: () => <ProfilesContact {...props} />,
  };

  if (contactJSX[type]) {
    return (
      <section className={`contact-block ${type}`}>
        {contactJSX[type]()}
      </section>
    );
  }

  console.warn(
    'A ContactBlock type element was found, but not rendered for type ',
    type,
  );
  return null;
};

export default ContactBlock;
