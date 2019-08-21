import React, { useState } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Head from 'next/head';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Menu from '../components/Menu';

import { NextFunctionComponent } from '../next.d';

import './style.scss';

interface Props {
  children: any;
  pageTitle?: string;
  pageDescription?: string;
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

const Layout: NextFunctionComponent<Props> = ({
  children,
  pageTitle = '',
  pageDescription = '',
}) => {
  const [menuVisible, toggleMenu] = useState(false);

  const handleToggleMenu = () => toggleMenu(!menuVisible);

  return (
    <Query query={SETTINGS_QUERY}>
      {({ data: { allSettings = {} } }: any) => {
        return (
          <main className={`layout ${menuVisible ? 'is-menu-visible' : ''}`}>
            <Head>
              <title>
                {pageTitle && `${pageTitle} | `}
                {allSettings.generalSettingsTitle}
              </title>
              <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
              />
              <meta
                name="description"
                content={
                  pageDescription
                    ? pageDescription
                    : allSettings.generalSettingsDescription
                }
              />
            </Head>
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
