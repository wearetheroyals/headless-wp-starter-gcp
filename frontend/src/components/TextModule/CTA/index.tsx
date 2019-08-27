import React from 'react';

import Button, { ButtonProps } from '../../Button';

import './style.scss';

interface Props {
  title: string;
  style?: string;
  content: string;
  buttonOne: {
    text: string;
    style?: string;
    linkReference: string;
  };
  buttonTwo: {
    text: string;
    style?: string;
    linkReference: string;
  };
}

const TextModuleCta: React.SFC<Props> = ({
  title,
  content,
  buttonOne,
  buttonTwo,
  style,
}) => {
  return (
    <section className={`textmodulecta ${style}`}>
      <div className="container">
        <div className="inner">
          {title && <h2>{title}</h2>}
          {content && (
            <div
              className="content-body"
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            />
          )}
          {buttonOne && <Button {...buttonOne}></Button>}
          {buttonTwo && <Button {...buttonTwo}></Button>}
        </div>
      </div>
    </section>
  );
};

export default TextModuleCta;
