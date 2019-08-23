import React from 'react';
import Link from 'next/link';

interface Props {
  children: any;
  linkReference: string;
  addtlClass?: string;
  targetBlank?: boolean;
}

const LinkHOC: React.SFC<Props> = ({
  linkReference = '',
  addtlClass = '',
  targetBlank = true,
  children,
}) => {
  if (/^http/.test(linkReference)) {
    return (
      <a
        className={addtlClass}
        href={linkReference}
        target={targetBlank ? '_blank' : ''}
        rel={targetBlank ? 'noopener noreferrer' : ''}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={linkReference}>
      <a className={addtlClass}>{children}</a>
    </Link>
  );
};

export default LinkHOC;
