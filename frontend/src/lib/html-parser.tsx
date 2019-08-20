import React from 'react';
import HTMLReactParser, { domToReact } from 'html-react-parser';

import HeroBanner from '../components/HeroBanner';
import Button from '../components/Button';

export const parseContentComponent = ({ content = '', title = '' }) =>
  HTMLReactParser(content, {
    replace: ({ name, attribs, children }) => {
      if (!attribs) {
        return null;
      }

      if (attribs.class && attribs.class.includes('wp-block-cover')) {
        const img =
          attribs.style && attribs.style.split('url(')[1].replace(')', '');

        return (
          <HeroBanner backgroundImage={img} title={title} chd={children} />
        );
      }

      if (attribs.class && attribs.class.includes('wp-block-button')) {
        return <Button>{domToReact(children)}</Button>;
      }

      // Final fallback, render section wrapped with a class.
      // The style on these elements that don't fall into a designated
      // component to be defined at the page template level
      if (!name) {
        return null;
      }

      return (
        <section className="no-component">
          {React.createElement(name, {}, domToReact(children))}
        </section>
      );
    },
  });
