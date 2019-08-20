import React from 'react';
import { domToReact } from 'html-react-parser';

// import Button from '../Button';

import './style.scss';

interface Props {
  chd: Array<any>;
  title: string;
  backgroundImage: string;
}

const Banner: React.SFC<Props> = ({ title, chd = [], backgroundImage }) => {
  return (
    <section id="hero-banner" className="major">
      <img className="desktop-bg-img" src={backgroundImage} />

      <div className="inner">
        <header className="major">
          <h1>{title}</h1>
        </header>
        <div className="content">{domToReact(chd)}</div>
      </div>
    </section>
  );
};

export default Banner;
