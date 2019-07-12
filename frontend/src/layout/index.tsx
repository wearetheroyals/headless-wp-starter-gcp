import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Menu from '../components/Menu';
import { NextFunctionComponent } from '../next.d';

import './style.scss';

interface Props {
  children: any;
}

const Layout: NextFunctionComponent<Props> = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <Menu></Menu>
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
