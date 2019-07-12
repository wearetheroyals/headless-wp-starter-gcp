# WordPress + Next.js Starter Kit for GCP

## Work in progress!

Headless WordPress + Next.js Starter Kit for GCP is for setting up a local project with easy deployment to Google Cloud Platform (GCP)

1.  A WordPress backend that serves its data via the [WP REST API](https://developer.wordpress.org/rest-api/) and [GraphQL](http://graphql.org/), which supports posts, pages, categories, menus, search, and user sign-in.
2.  A sample Next.js frontend fed by the [WP GraphQL API](https://www.wpgraphql.com/).
3.  CloudSQL Proxy to connect to a real GCP SQL database

## Dependencies

- Docker (I'm using 18.09 with compose 1.23)
- A Google Cloud Platform (GCP) account
- The [gcloud CLI](https://cloud.google.com/sdk/docs/#install_the_latest_cloud_sdk_version)

## Before Setting Out

Applications will be running in GCP AppEngine (GAE) with CloudSQL for DB. These services aren't free, but are low cost at low scale.
If it's your first time with GCP, you can start out on GCP with a \$300AUD credit or whatever the value provided for your locale.

This architecture on GAE is well suited to blogs, landing pages and other content driven sites. I wouldn't necessarily recommend this for
sites that require lots of user interaction/authentication or super high/enterprise level load.

**What's inside?**

- An automated installer which bootstraps a core WordPress installation that provides an established, stable REST API.
- A plugin which exposes a newer, in-progress [GraphQL API for WordPress](https://wpgraphql.com/).
- The WordPress plugins you need to set up custom post types and custom fields ([Advanced Custom Fields](https://www.advancedcustomfields.com/) and [Custom Post Type UI](https://wordpress.org/plugins/custom-post-type-ui/)).
- Plugins which expose those custom fields and WordPress menus in the [WP REST API](https://developer.wordpress.org/rest-api/) ([ACF to WP API](https://wordpress.org/plugins/acf-to-wp-api/) and [WP-REST-API V2 Menus](https://wordpress.org/plugins/wp-rest-api-v2-menus/)).
- JWT authentication plugins: [JWT WP REST](https://wordpress.org/plugins/jwt-authentication-for-wp-rest-api/) and [JWT WP GraphQL](https://github.com/wp-graphql/wp-graphql-jwt-authentication).
- All the starter WordPress theme code and settings headless requires, including pretty permalinks, CORS `Allow-Origin` headers, and useful logging functions for easy debugging.
- A mechanism for easily importing data from an existing WordPress installation anywhere on the web using [WP Migrate DB Pro](https://deliciousbrains.com/wp-migrate-db-pro/) and its accompanying plugins (license required).
- A sample, starter frontend Next.js app powered by [GraphQL](http://graphql.org/).
- Another sample, starter frontend React app, server-side rendered via [Next.js](https://learnnextjs.com/), powered by WP GraphQL.
- [Docker](https://www.docker.com/) containers and scripts to manage them, for easily running the frontend React apps and backend locally or deploying it to any hosting provider with Docker support.
- CloudSQL Proxy for local connection to your remote SQL database

**What's changed?**

Huge thanks to the team at [Postlight Labs](https://postlight.com) for open sourcing their [original starter](https://github.com/postlight/headless-wp-starter). It was such an excellent starting point, it inspired us to create this fork that's been amended to fit our coding practice at The Royals

- The Next.js application now uses TypeScript instead of plain JavaScript
- The JSON API connection for Next.js has been replaced with GraphQL
- Majority of the components have been rewritten from class style to functional
- The plain React frontend has been removed
- Easy deploy path to GCP

Let's get started.

## Setup GCP and CloudSQL Proxy

A guide on setting up this service can be found [here](https://cloud.google.com/sql/docs/mysql/sql-proxy) and [here](https://cloud.google.com/sql/docs/mysql/quickstart-proxy-test)for reference, however I will be running through
the steps here to cover how it related to me when setting up this specific project

1. [Create a new Project](https://cloud.google.com/resource-manager/docs/creating-managing-projects). If you already have a project to which you'd like to apply this application, this can be skipped of course.

The project name is the context in which we'll be working under for all deployments of the application. In this case I'll call it `nextjs-wp`, the screenshots should reflect this too.

2. Enable the Cloud SQL Admin API

Follow [this link](https://console.cloud.google.com/flows/enableapi?apiid=sqladmin&redirect=https://console.cloud.google.com&_ga=2.18385849.-1683934798.1557445097) and ensure you're in the correct account context

[Enable an API](!./docs/enable-api.png)

Select the appropriate project and click 'Continue', then 'Continue' again on the next page which returns you to GCP home.

3. Generate and store on the local fs, a set of GCP authentication credentials

Go to the [service accounts page](https://console.cloud.google.com/iam-admin/serviceaccounts/?_ga=2.21211963.-1683934798.1557445097) for GCP and click 'CREATE SERVICE ACCOUNT'
[Service Accounts Page](!./docs/service-accounts-page.png)

Fill in the form with the appropriate values (note that these credentials should be generated for each user of the proxy service)
[Service Account Form](!./docs/service-accounts-form.png)

Select one of these roles

- Cloud SQL > Cloud SQL Client
- Cloud SQL > Cloud SQL Editor
- Cloud SQL > Cloud SQL Admin
  For this demonstration, I chose the admin role.

[Service Account Role](!./docs/service-accounts-role.png)

Now let's create and download the key file, and click 'DONE' to finish

[Service Account Key1](!./docs/service-account-key1.png)
[Service Account Key2](!./docs/service-account-key2.png)

The key should come out as `nextjs-wp-[hash].json`.

We're going to store that in a hidden folder in `~` then mount the folder into the cloud proxy container

`mkdir ~/.gcloud/nextjs-wp`
`mv path-to-downloaded-credentials/nextjs-wp-[hash].json ~/.gcloud/nextjs-wp/nextjs-wp-[hash].json

Finally, you'll need to modify docker-compose.yml to mount and reference the correct directory/file

```yml
cloud-sql-proxy:
  image: gcr.io/cloudsql-docker/gce-proxy:1.14
  command: /cloud_sql_proxy -instances=spotify-student-wp-staging:australia-southeast1:wp=tcp:0.0.0.0:3306 -credential_file=/root/.config/nextjs-wp-[hash].json # Change the credential path, replacing [hash]
  volumes:
    - ~/.gcloud/nextjs-wp:/root/.config # Change the volume mount
  ports:
    - 3306:3306
```

4. Create a new CloudSQL instance

5. Configure WordPress with your connection data

## Install

_Prerequisite:_ Before you begin, you need [Docker](https://www.docker.com) installed. On Linux, you might need to install [docker-compose](https://docs.docker.com/compose/install/#install-compose) separately.

Docker Compose builds and starts three containers by default: `cloud-sql-proxy`, `wordpress-522`, `nextjs-9`:

    docker-compose up -d

**Wait a few minutes** for Docker to build the services for the first time. After the initial build, startup should only take a few seconds.

You can follow the Docker output to see build progress and logs:

    docker-compose logs -f

Alternatively, you can use some useful Docker tools like Kitematic and/or VSCode Docker plugin to follow logs, start / stop / remove containers and images.

_Optional:_ you can run the frontend locally while WordPress still runs on Docker:

    docker-compose up -d wordpress-522
    cd frontend && yarn && yarn start

Once the containers are running, you can visit the Next.js frontend and backend WordPress admin in your browser.

## Frontend

This starter kit provides one "frontend" container:

- `nextjs-9` container powered by WP GRAPHQL is server-side rendered using Next.js, and exposed on port `3000`: [http://localhost:3000](http://localhost:3000)

You can follow the `yarn start` output by running docker-compose `logs` command followed by the container name. For example:

    docker-compose logs -f nextjs-9

If you need to restart that process, restart the container:

    docker-compose restart nextjs-9

**PS:** Browsing the Next.js frontend in development mode is relatively slow due to the fact that pages are being built on demand. In a production environment, there would be a significant improvement in page load.

## Backend

The `wordpress-522` container exposes Apache on host port `8080`:

- Dashboard: [http://localhost:8080/wp-admin](http://localhost:8080/wp-admin) (default credentials `nedstark`/`winteriscoming`)
- REST API: [http://localhost:8080/wp-json](http://localhost:8080/wp-json)
- GraphQL API: [http://localhost:8080/graphql](http://localhost:8080/graphql)

This container includes some development tools:

    docker exec wordpress-522 composer --help
    docker exec wordpress-522 phpcbf --help
    docker exec wordpress-522 phpcs --help
    docker exec wordpress-522 phpunit --help
    docker exec wordpress-522 wp --info

Apache/PHP logs are available via `docker-compose logs -f wordpress-522`.

## Reinstall

To reinstall WordPress from scratch, run:

    docker exec wordpress-522 wp db reset --yes && docker exec wordpress-522 install_wordpress

## Import Data from Another WordPress Installation

You can use a plugin called [WP Migrate DB Pro](https://deliciousbrains.com/wp-migrate-db-pro/) to connect to another WordPress installation and import data from it. (A Pro license will be required.)

To do so, first set `MIGRATEDB_LICENSE` & `MIGRATEDB_FROM` in `.env` and recreate containers to enact the changes.

    docker-compose up -d

Then run the import script:

    docker exec wordpress-522 migratedb_import

If you need more advanced functionality check out the available WP-CLI commands:

    docker exec wordpress-522 wp help migratedb

## Extend the REST and GraphQL APIs

At this point you can start setting up custom fields in the WordPress admin, and if necessary, creating [custom REST API endpoints](https://developer.wordpress.org/rest-api/extending-the-rest-api/adding-custom-endpoints/) in the Postlight Headless WordPress Starter theme.

The primary theme code is located in `wordpress/wp-content/themes/postlight-headless-wp`.

You can also [modify and extend the GraphQL API](https://wpgraphql.com/docs/getting-started/about), An example of creating a Custom Type and registering a Resolver is located in: `wordpress/wp-content/themes/postlight-headless-wp/inc/graphql`.

## REST & GraphQL JWT Authentication

To give WordPress users the ability to sign in via the frontend app, use something like the [WordPress Salt generator](https://api.wordpress.org/secret-key/1.1/salt/) to generate a secret for JWT, then define it in `wp-config.php`

For the REST API:

    define('JWT_AUTH_SECRET_KEY', 'your-secret-here');

For the GraphQL API:

    define( 'GRAPHQL_JWT_AUTH_SECRET_KEY', 'your-secret-here');

Make sure to read the [JWT REST](https://github.com/Tmeister/wp-api-jwt-auth) and [JWT GraphQL](https://github.com/wp-graphql/wp-graphql-jwt-authentication) documentation for more info.

## Linting

Remember to lint your code as you go.

To lint WordPress theme modifications, you can use [PHP_CodeSniffer](https://github.com/squizlabs/PHP_CodeSniffer) like this:

    docker exec -w /var/www/html/wp-content/themes/postlight-headless-wp wordpress-522 phpcs

You may also attempt to autofix PHPCS errors:

    docker exec -w /var/www/html/wp-content/themes/postlight-headless-wp wordpress-522 phpcbf

To lint and format the JavaScript apps, both [Prettier](https://prettier.io/) and [ESLint](https://eslint.org/) configuration files are included.

## Deployment to GCP

## Troubleshooting Common Errors

**Breaking Change Alert - Docker**

If you had the project already setup and then updated to a commit newer than `99b4d7b`, you will need to go through the installation process again because the project was migrated to Docker.
You will need to also migrate MySQL data to the new MySQL db container.

**Docker Caching**

In some cases, you need to delete the `wordpress-522` and `frontend` images (not only the container) and rebuild it.

**CORS errors**

If you have deployed your WordPress install and are having CORS issues be sure to update `/wordpress/wp-content/themes/postlight-headless-wp/inc/frontend-origin.php` with your frontend origin URL.

See anything else you'd like to add here? Please send a pull request!

---

This project won't register as a fork in GitHub, the organisation this was created under _already_ has a fork of the original project from the team at [Postlight](https://postlight.com). Unfortunately you can only have one fork per repo in GH land.

🔬 A project from [The Royals](https://theroyals.com.au). Originally forked from the team at [Postlight](https://postlight.com). Happy coding!
