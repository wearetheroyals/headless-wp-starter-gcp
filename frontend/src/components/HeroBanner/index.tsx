import React from 'react';

import Button from '../Button';

import './style.scss';

interface Props {
  title: string;
  subtitle: string;
  backgroundImage: string;
  buttonOne: {
    text: string;
    style: string;
    linkReference: string;
  };
  buttonTwo: {
    text: string;
    style: string;
    linkReference: string;
  };
}

const Banner: React.SFC<Props> = ({
  title,
  subtitle,
  backgroundImage,
  buttonOne,
  buttonTwo,
}) => {
  return (
    <section id="hero-banner" className="major">
      <img className="desktop-bg-img" src={backgroundImage} />

      <div className="inner">
        <header className="major">
          <h1>{title}</h1>
        </header>
        <div className="content">
          <p>{subtitle}</p>
          <div className="actions">
            {buttonOne && <Button {...buttonOne}></Button>}
            {buttonTwo && <Button {...buttonTwo}></Button>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
