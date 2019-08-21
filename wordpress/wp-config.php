<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// $onGae is true on production.
if (isset($_SERVER['GAE_ENV'])) {
    $onGae = true;
} else {
    $onGae = false;
}

// Cache settings
// Disable cache for now, as this does not work on App Engine for PHP 7.2
define('WP_CACHE', false);

// Disable pseudo cron behavior
define('DISABLE_WP_CRON', true);

// Determine HTTP or HTTPS, then set WP_SITEURL and WP_HOME
if ((isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
    || (isset($_SERVER['SERVER_PORT']) && $_SERVER['SERVER_PORT'] == 443)) {
    $protocol_to_use = 'https://';
} else {
    $protocol_to_use = 'http://';
}
if (isset($_SERVER['HTTP_HOST'])) {
    define('HTTP_HOST', $_SERVER['HTTP_HOST']);
} else {
    define('HTTP_HOST', 'localhost');
}

// ** MySQL settings - You can get this info from your web host ** //
$db_pass = ($_ENV["WORDPRESS_DB_PASSWORD"] ?: $_SERVER["WORDPRESS_DB_PASSWORD"]);
if ($onGae) {
    /** The name of the Cloud SQL database for WordPress */
    define('DB_NAME', 'wordpress');
    /** Production login info */
    define('DB_HOST', ':/cloudsql/nextjs-wp:australia-southeast1:wp');
    define('DB_USER', 'wp_user');
    define('DB_PASSWORD', $db_pass);
    define('WP_SITEURL', $protocol_to_use . HTTP_HOST);
    define('WP_HOME', $protocol_to_use . HTTP_HOST);
} else {
    /** The name of the local database for WordPress */
    define('DB_NAME', 'wp_headless');
    /** Local environment MySQL login info */
    define('DB_HOST', 'mariadb');
    define('DB_USER', 'wp_headless');
    define('DB_PASSWORD', 'wp_headless');
    define( 'WP_HOME', 'http://localhost:8080' );
    define( 'WP_SITEURL', 'http://localhost:8080' );
}

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'ouGO9xr04ya3nwGBo5c4DH59+VI7SrZoJh3xiwBI6j2owPJaiTuLkd+uoJkI26nhpRx1z4OZC+tlzQU3');
define('SECURE_AUTH_KEY',  'Zrqa5/Z/NRFrCX7bpKBiXiOwgDaLKPFD8zqFzqouF23iLSbJaoyAyHfh1xCY0x6TCJ5odWgF7mVEs0jY');
define('LOGGED_IN_KEY',    '6TDtQv+Sa1cU04zEj7BFgl6kPfy+972JMEDis0hfSlTokMX5q3A/OsFW2WTMWANK07ZFvXyaxZGuxmSW');
define('NONCE_KEY',        'lL08UR/PmR2BxrGfAFL71ijtpUJ5mnsq6hBFMk16AiCzx/FseiTRff9Jr55EEt3Nh8m/aVCVpYsSRDzu');
define('AUTH_SALT',        'RhSn1Dvh5lNjCoujLKkkJHhTa8GMS88wL/e7GmF6bRbLXTiMiKY+qtmqMIMs01UjmZ80mft7uOWTCUTw');
define('SECURE_AUTH_SALT', 'UcGMW+eMIGhe3OvrzcjfqPgOOr9I9tb8IyOX1Jvy0ct5RyAgd/3+afs+hBUjAVi3ZRIio144Gfjy/CtT');
define('LOGGED_IN_SALT',   'e6Gr56QBvS4iCbJ87SLSFET080lAeQeH81NwNUlwAljISG1jri0KO887PJ3YvJEiKnAHfzAJLYxTpciX');
define('NONCE_SALT',       '+Kyt9AOXsOHbJgfUjstA1dnvfrZFsASqZSwxHhMNr8ldzDLNZGL47QAk3R34NZFV4kXjbpGFiiudwl/7');

/**#@-*/
/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define('WPLANG', '');

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define( 'WP_DEBUG', true );
define( 'WP_DEBUG_LOG', true );  // Turn logging to wp-content/debug.log ON
define( 'WP_DEBUG_DISPLAY', false ); // Keep JSON response valid
// @ini_set( 'display_errors', 0 ); // Keep JSON responses valid
//Enable error logging.
@ini_set('log_errors', 'On');
@ini_set('error_log', '/var/www/html/wp-content/elm-error-logs/php-errors.log');

@ini_set( 'upload_max_filesize' , '128M' );
@ini_set( 'post_max_size', '128M');
@ini_set( 'memory_limit', '256M' );
@ini_set( 'max_execution_time', '300' );
@ini_set( 'max_input_time', '300' );

/* That's all, stop editing! Happy blogging. */
/** Absolute path to the WordPress directory. */
if (!defined('ABSPATH')) {
    define('ABSPATH', dirname(__FILE__) . '/wordpress/');
}

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
