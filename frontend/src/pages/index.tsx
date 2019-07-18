import React from 'react';
import Link from 'next/link';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { NextFunctionComponent } from '../next.d';

import Layout from '../layout';

import './_index.scss';

const headerImageStyle = {
  marginTop: 50,
  marginBottom: 50,
};

const INDEX_PAGE_QUERY = gql`
  query PagesAndPostsQuery {
    posts {
      edges {
        node {
          title
          slug
        }
      }
    }
    pages {
      edges {
        node {
          title
          slug
        }
      }
    }
  }
`;
interface IndexPageQueryResult {
  data: {
    posts: {
      edges: Array<{
        node: {
          title: string;
          slug: string;
        };
      }>;
    };
    pages: {
      edges: Array<{
        node: {
          title: string;
          slug: string;
        };
      }>;
    };
  };
}

const Index: NextFunctionComponent = () => {
  return (
    <Query query={INDEX_PAGE_QUERY}>
      {({ data }: IndexPageQueryResult) => {
        if (!data || !data.pages || !data.posts) {
          return null;
        }

        const { posts, pages } = data;

        return (
          <Layout>
            <section className="index">
              <img
                src="/static/images/wordpress-plus-react-header.png"
                width="815"
                alt="logo"
                style={headerImageStyle}
              />
              <h2>Posts</h2>
              {Array.isArray(posts.edges) &&
                posts.edges.map(({ node }) => {
                  return (
                    <ul key={node.slug}>
                      <li>
                        <Link as={`/post/${node.slug}`} href={`/post/[slug]`}>
                          <a>{node.title}</a>
                        </Link>
                      </li>
                    </ul>
                  );
                })}
              <h2>Pages</h2>
              {Array.isArray(pages.edges) &&
                pages.edges.map(({ node }) => {
                  return (
                    <ul key={node.slug}>
                      <li>
                        <Link as={`/page/${node.slug}`} href={`/page/[slug]`}>
                          <a>{node.title}</a>
                        </Link>
                      </li>
                    </ul>
                  );
                })}

              <h2>Where You're At</h2>
              <p>
                You are looking at the WordPress GraphQL-powered NextJS frontend
              </p>
            </section>
          </Layout>
        );
      }}
    </Query>
  );
};

export default Index;
