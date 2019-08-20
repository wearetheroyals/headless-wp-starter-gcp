import React from 'react';
import Link from 'next/link';

import './style.scss';

interface Props {
  onToggleMenu: () => void;
  siteTitle?: string;
  siteAuthor?: string;
}

const Header: React.SFC<Props> = ({
  onToggleMenu,
  siteTitle = '',
  siteAuthor = '',
}) => (
  <header id="header" className="alt">
    <Link href="/">
      <a className="logo">
        <strong>{siteTitle}</strong> <span>by {siteAuthor}</span>
      </a>
    </Link>
    <nav>
      <a className="menu-link" onClick={onToggleMenu} href="javascript:;">
        Menu
      </a>
    </nav>
  </header>
);

export default Header;
