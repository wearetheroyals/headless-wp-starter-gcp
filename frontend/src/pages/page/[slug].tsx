import React from 'react';
import Error from 'next/error';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { NextFunctionComponent, NextContext } from '../../next.d';

import Layout from '../../layout';

import './_page.scss';

const PAGE_QUERY = gql`
  query PageQuery($uri: String!) {
    pageBy(uri: $uri) {
      title
      content
    }
  }
`;
interface PageQueryResult {
  data: {
    pageBy: {
      title: string;
      content: string;
    };
  };
}

interface Props {
  slug: string | string[] | undefined;
}

const Page: NextFunctionComponent<Props> = ({ slug }) => {
  if (!slug) {
    return <Error title="Unable to find page" statusCode={404} />;
  }

  return (
    <Query query={PAGE_QUERY} variables={{ uri: slug }}>
      {({ data }: PageQueryResult) => {
        if (!data || !data.pageBy || !data.pageBy.title) {
          return <Error title="Unable to find page" statusCode={404} />;
        }

        return (
          <Layout>
            <section className="page">
              <h1>{data.pageBy.title}</h1>
              <div
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: data.pageBy.content,
                }}
              />
            </section>
          </Layout>
        );
      }}
    </Query>
  );
};

Page.getInitialProps = async ({ query }: NextContext): Promise<Props> => {
  if (!query) {
    return {
      slug: '',
    };
  }

  return {
    slug: query.slug,
  };
};

export default Page;
