import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Link from 'next/link';

import './style.scss';

const MenuItem = ({ onToggleMenu, url, label, type }) => {
  if (type === 'external') {
    return (
      <li onClick={onToggleMenu}>
        <a className="" href={url} target="_blank" rel="noopener noreferrer">
          {label}
        </a>
      </li>
    );
  }

  return (
    <li onClick={onToggleMenu}>
      <Link href={url}>{label}</Link>
    </li>
  );
};

const MENU_QUERY = gql`
  query MenuQuery {
    headerMenu {
      url
      label
      type
    }
  }
`;
interface MenuQueryResult {
  data: {
    headerMenu: {
      url: string;
      label: string;
      type: string;
    };
  };
}

const Menu = ({ onToggleMenu }) => {
  return (
    <Query query={MENU_QUERY}>
      {({ data }: MenuQueryResult) => {
        if (!data || !data.headerMenu) {
          return null;
        }

        const { headerMenu } = data;

        return (
          <nav id="menu">
            <div className="inner">
              <ul className="links">
                {Array.isArray(headerMenu) &&
                  headerMenu.map(item => (
                    <MenuItem
                      {...item}
                      key={item.url}
                      onToggleMenu={onToggleMenu}
                    />
                  ))}
              </ul>
            </div>
            <a className="close" onClick={onToggleMenu} href="javascript:;">
              Close
            </a>
          </nav>
        );
      }}
    </Query>
  );
};

export default Menu;
