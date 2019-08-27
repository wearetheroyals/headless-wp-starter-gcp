import React from 'react';

import './style.scss';

interface Props {
  children: any;
}

const ArticleBlock: React.SFC<Props> = ({ children }) => {
  return (
    <article className="article-block">
      <div className="container">{children}</div>
    </article>
  );
};

export default ArticleBlock;
