import React, { useState } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Link from 'next/link';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Menu from '../components/Menu';

import { NextFunctionComponent } from '../next.d';

import './style.scss';

interface Props {
  children: any;
}

const SETTINGS_QUERY = gql`
  query SettingsQuery {
    allSettings {
      generalSettingsTitle
      generalSettingsUrl
      generalSettingsDescription
    }
  }
`;

const Layout: NextFunctionComponent<Props> = ({ children }) => {
  const [menuVisible, toggleMenu] = useState(false);

  const handleToggleMenu = () => toggleMenu(!menuVisible);

  return (
    <Query query={SETTINGS_QUERY}>
      {({ data }: any) => {
        const { allSettings } = data;
        return (
          <main className={`layout ${menuVisible ? 'is-menu-visible' : ''}`}>
            <Header
              siteTitle={allSettings.generalSettingsTitle}
              siteAuthor="The Royals"
              onToggleMenu={handleToggleMenu}
            />
            <Menu onToggleMenu={handleToggleMenu} />
            {children}
            <Footer />
          </main>
        );
      }}
    </Query>
  );
};

export default Layout;
