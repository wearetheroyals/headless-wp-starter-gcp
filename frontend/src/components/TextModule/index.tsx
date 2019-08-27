import React from 'react';

import TextModuleCTA from './CTA';
import TextModuleCentered from './Centered';
import TextModuleLong from './Long';

import './style.scss';

interface Props {
  title: string;
  type: string;
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

const TextModule: React.SFC<Props> = ({ type, ...props }) => {
  const ModuleMap = {
    cta: () => <TextModuleCTA {...props} />,
    long: () => <TextModuleLong {...props} />,
    centered: () => <TextModuleCentered {...props} />,
  };

  if (ModuleMap[type]) {
    return ModuleMap[type]();
  }

  return null;
};

export default TextModule;
