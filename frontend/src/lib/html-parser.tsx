import React from 'react';
import HTMLReactParser, { domToReact } from 'html-react-parser';

import ArticleBlock from '../components/ArticleBlock';
import HeroBanner from '../components/HeroBanner';
import Button from '../components/Button';
import TileBlock from '../components/TileBlock';
import TextModule from '../components/TextModule';
import VideoModal from '../components/VideoModal';
import FluidImages from '../components/FluidImages';
import FluidImage from '../components/FluidImages/FluidImage';

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

const CreateFluidImageBlock = (elems = []) => {
  if (!Array.isArray(elems) || elems.length === 0) {
    return null;
  }

  const fluidImages = elems
    .map(ele => {
      if (!ele.attribs) {
        return null;
      }

      return {
        type: ele.attribs['data-type'],
        backgroundImage: ele.attribs['data-background-image'],
        content: ele.attribs['data-content'],
        style: ele.attribs['data-style'],
        linkReference: ele.attribs['data-link-reference'],
      };
    })
    .filter(Boolean);

  return <FluidImages fluidImages={fluidImages}></FluidImages>;
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

  if (target.includes('wp-block-fluid-image')) {
    return CreateFluidImageBlock(elems);
  }

  return null;
};

export const parseContentComponent = ({ content = '', title = '' }) => {
  const HTMLReplacer = ({ name, attribs, children }) => {
    if (!attribs || !name || name === 'style') {
      return <React.Fragment></React.Fragment>;
    }

    if (attribs.class && attribs.class.includes('wp-block-hero-banner')) {
      return (
        <HeroBanner
          title={attribs['data-title']}
          subtitle={attribs['data-subtitle']}
          buttonOne={{
            text: attribs['data-button-one-text'],
            style: attribs['data-button-one-style'],
            linkReference: attribs['data-button-one-linkref'],
          }}
          buttonTwo={{
            text: attribs['data-button-two-text'],
            style: attribs['data-button-two-style'],
            linkReference: attribs['data-button-two-linkref'],
          }}
          backgroundImage={attribs['data-background-image']}
        />
      );
    }

    if (attribs.class && attribs.class.includes('wp-block-text-module')) {
      return (
        <TextModule
          title={attribs['data-title']}
          type={attribs['data-type']}
          style={attribs['data-style']}
          content={attribs['data-content']}
          buttonOne={{
            text: attribs['data-button-one-text'],
            style: attribs['data-button-one-style'],
            linkReference: attribs['data-button-one-linkref'],
          }}
          buttonTwo={{
            text: attribs['data-button-two-text'],
            style: attribs['data-button-two-style'],
            linkReference: attribs['data-button-two-linkref'],
          }}
        />
      );
    }

    if (attribs.class && attribs.class.includes('wp-block-fluid-image')) {
      return (
        <FluidImage
          type={attribs['data-type']}
          content={attribs['data-content']}
          linkReference={attribs['data-linkref']}
          style={attribs['data-style']}
          backgroundImage={attribs['data-background-image']}
        />
      );
    }

    if (attribs.class && attribs.class.includes('wp-block-button')) {
      return <ArticleBlock>{domToReact(children)}</ArticleBlock>;
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

    if (['p', 'h2', 'h3', 'h4'].includes(name)) {
      return (
        <ArticleBlock>
          {React.createElement(name, {}, domToReact(children))}
        </ArticleBlock>
      );
    }

    // Final fallback, render section wrapped with a class.
    // The style on these elements that don't fall into a designated
    // component to be defined at the page template level
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
