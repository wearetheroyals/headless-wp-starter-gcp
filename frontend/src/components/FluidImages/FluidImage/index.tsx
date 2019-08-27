import React from 'react';

import Link from 'next/link';

import './style.scss';

interface Props {
  type: string;
  linkReference: string;
  content: string;
  style: string;
  backgroundImage: string;
}

const FluidImage: React.SFC<Props> = ({
  content,
  type,
  style,
  linkReference,
  backgroundImage,
}) => {
  return (
    <Link key={linkReference} href={linkReference}>
      <a className={`image-link ${style}`}>
        <img className={`background ${type}`} src={backgroundImage} />
        {content && (
          <div
            className="content"
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          ></div>
        )}
      </a>
    </Link>
  );
};

export default FluidImage;
