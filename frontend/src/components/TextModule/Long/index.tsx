import React from 'react';

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

const TextModuleLong: React.SFC<Props> = ({ title, content, style }) => {
  return (
    <section className={`textmodulelong ${style}`}>
      <div className="container">
        <h2 className="headline">{title}</h2>
        {content && (
          <div
            className="subline"
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          />
        )}
      </div>
    </section>
  );
};

export default TextModuleLong;
