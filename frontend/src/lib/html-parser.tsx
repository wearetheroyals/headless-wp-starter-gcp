import React from 'react';
import HTMLReactParser, { domToReact } from 'html-react-parser';

import HeroBanner from '../components/HeroBanner';
import Button from '../components/Button';
import TileBlock from '../components/TileBlock';
import VideoModal from '../components/VideoModal';

const CreateTileBlocks = (elems = []) => {
  if (!Array.isArray(elems) || elems.length === 0) {
    return null;
  }

  const tiles = elems
    .map(ele => {
      if (!ele.attribs) {
        return null;
      }

      return {
        type: ele.attribs['data-type'],
        title: ele.attribs['data-title'],
        subtitle: ele.attribs['data-subtitle'],
        content: ele.attribs['data-content'],
        heroImage: ele.attribs['data-hero-image'],
        linkReference: ele.attribs['data-link-reference'],
      };
    })
    .filter(Boolean);

  return <TileBlock type={tiles[0].type} tiles={tiles}></TileBlock>;
};

const MapBlockGroups = (childArr = []) => {
  if (!Array.isArray(childArr)) {
    return null;
  }

  // The child array includes all non-element primitives as a 'text' type.
  // This includes newlines and style tags. This function strips them.
  const elems = childArr.filter(c => c.attribs && c.attribs.class);
  if (elems.length === 0) {
    return null;
  }

  // The target component is defined by the first applicable class in the array
  const target = elems[0].attribs && elems[0].attribs.class;
  if (!target) {
    return null;
  }

  if (target.includes('wp-block-tile-block')) {
    return CreateTileBlocks(elems);
  }

  return null;
};

export const parseContentComponent = ({ content = '', title = '' }) => {
  const HTMLReplacer = a => {
    const { name, attribs, children } = a;
    if (!attribs) {
      return null;
    }

    if (attribs.class && attribs.class.includes('wp-block-cover')) {
      const img =
        attribs.style && attribs.style.split('url(')[1].replace(')', '');

      return <HeroBanner backgroundImage={img} title={title} chd={children} />;
    }

    if (attribs.class && attribs.class.includes('wp-block-button')) {
      return <Button>{domToReact(children)}</Button>;
    }

    if (attribs.class && attribs.class.includes('wp-block-vimeo-modal')) {
      return (
        <VideoModal
          videoId={attribs['data-video-id']}
          videoName={attribs['data-video-name']}
          placeholderImage={attribs['data-video-placeholder']}
        />
      );
    }

    if (attribs.class && attribs.class.includes('wp-block-tile-block')) {
      return (
        <TileBlock
          type="large"
          tiles={[{ title: attribs['data-title'] }]}
          // placeholderImage={attribs['data-video-placeholder']}
        />
      );
    }

    // Group block handler this may affect rendering, please avoid amending
    // unless full testing/QA is going to be carried out
    if (
      attribs.class &&
      attribs.class.includes('wp-block-group__inner-container')
    ) {
      if (!children) {
        return null;
      }

      return MapBlockGroups(children);
    }

    if (attribs.class && attribs.class.includes('wp-block-group')) {
      return null;
    }

    // Final fallback, render section wrapped with a class.
    // The style on these elements that don't fall into a designated
    // component to be defined at the page template level
    if (!name) {
      return null;
    }

    return (
      <section className="raw-block">
        {React.createElement(name, {}, domToReact(children))}
      </section>
    );
  };

  return HTMLReactParser(content, {
    replace: HTMLReplacer,
  });
};
