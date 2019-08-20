import React from 'react';
import Link from 'next/link';

import './style.scss';

export interface ButtonProps {
  style?: string;
  children: any;
}

const Button: React.SFC<ButtonProps> = ({ style = 'light', children }) => {
  if (!children) {
    return null;
  }

  return <button className={`button ${style}`}>{children}</button>;
};

export default Button;
