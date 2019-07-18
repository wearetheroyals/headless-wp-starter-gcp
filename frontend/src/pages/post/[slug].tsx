import React from 'react';
import Error from 'next/error';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { NextFunctionComponent, NextContext } from '../../next.d';

import Layout from '../../layout';

import './_post.scss';

const POST_QUERY = gql`
  query PostQuery($filter: String!) {
    postBy(slug: $filter) {
      title
      content
      author {
        nickname
      }
    }
  }
`;
interface PostQueryResult {
  data: {
    postBy: {
      title: string;
      content: string;
      author: {
        nickname: string;
      };
    };
  };
}

interface Props {
  slug: string | string[] | undefined;
}

const Post: NextFunctionComponent<Props> = ({ slug }) => {
  if (!slug) {
    return <Error title="Unable to find post" statusCode={404} />;
  }

  return (
    <Query query={POST_QUERY} variables={{ filter: slug }}>
      {(x: PostQueryResult) => {
        const { data } = x;
        console.log('thishere', x);
        if (!data || !data.postBy || !data.postBy.title) {
          return <Error title="Unable to find post" statusCode={404} />;
        }

        return (
          <Layout>
            <section className="post">
              <h1>{data.postBy.title}</h1>
              <div
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: data.postBy.content,
                }}
              />
            </section>
          </Layout>
        );
      }}
    </Query>
  );
};

Post.getInitialProps = async (ctx: NextContext): Promise<Props> => {
  if (!ctx.query) {
    return {
      slug: '',
    };
  }

  return {
    slug: ctx.query && ctx.query.slug,
  };
};

export default Post;
