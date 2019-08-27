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

const TextModuleCentered: React.SFC<Props> = ({ title, content, style }) => {
  return (
    <section className={`textmodulecentered ${style}`}>
      <div className="text">
        <h2>{title}</h2>
        {content && (
          <div
            className="markdown"
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          />
        )}
      </div>
    </section>
  );
};

export default TextModuleCentered;
