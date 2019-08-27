import React from 'react';
import Link from 'next/link';

import './style.scss';
import LinkHOC from '../../lib/linkHOC';

export interface ButtonProps {
  text?: string;
  style?: string;
  linkReference?: string;
  children?: any;
}

const Button: React.SFC<ButtonProps> = ({
  style = 'light',
  text,
  linkReference,
  children,
}) => {
  if (!children && !text) {
    return null;
  }

  return (
    <button className={`button ${style}`}>
      <LinkHOC linkReference={linkReference}>{children || text}</LinkHOC>
    </button>
  );
};

export default Button;
