/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import Error from 'next/error';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import lodashGet from 'lodash.get';
import { NextFunctionComponent, NextContext } from '../../next.d';

import Layout from '../../layout';

const CATEGORY_PAGE_QUERY = gql`
  query CategoryQuery($slug: [String]) {
    categories(where: { slug: $slug }) {
      edges {
        node {
          description
          name
          posts {
            edges {
              node {
                title
                slug
              }
            }
          }
        }
      }
    }
  }
`;
interface CategoryQueryResult {
  data: {
    categories: {
      edges: Array<{
        node: {
          description: string;
          name: string;
          posts: {
            edges: Array<{
              node: {
                title: string;
                slug: string;
              };
            }>;
          };
        };
      }>;
    };
  };
}

interface Props {
  slug: string | string[] | undefined;
}

const Category: NextFunctionComponent<Props> = ({ slug }) => {
  if (!slug) {
    return <Error title="Unable to find category" statusCode={404} />;
  }

  return (
    <Query query={CATEGORY_PAGE_QUERY} variables={{ slug: [slug] }}>
      {({ data }: CategoryQueryResult) => {
        const category = lodashGet(data, 'categories.edges[0].node');
        if (!category) {
          return <Error title="Unable to find category" statusCode={404} />;
        }

        const posts = lodashGet(category, 'posts.edges');

        return (
          <Layout>
            <section className="category">
              <h1>{category.name} Posts</h1>
              {Array.isArray(posts) &&
                posts.map(({ node }) => {
                  return (
                    <ul key={node.slug}>
                      <li>
                        <Link
                          as={`/post/${node.slug}`}
                          href={`/post?slug=${node.slug}`}
                        >
                          <a>{node.title}</a>
                        </Link>
                      </li>
                    </ul>
                  );
                })}
            </section>
          </Layout>
        );
      }}
    </Query>
  );
};

Category.getInitialProps = async ({ query }: NextContext): Promise<Props> => {
  if (!query) {
    return {
      slug: '',
    };
  }

  return {
    slug: query.slug,
  };
};

export default Category;
