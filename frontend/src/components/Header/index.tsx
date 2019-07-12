import React from 'react';
import Head from 'next/head';
import { NextFunctionComponent } from '../../next.d';

const Header: NextFunctionComponent<{}> = () => (
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charSet="utf-8" />
    <title>WordPress + Next.js Starter Kit Frontend by The Royals</title>
  </Head>
);

export default Header;
