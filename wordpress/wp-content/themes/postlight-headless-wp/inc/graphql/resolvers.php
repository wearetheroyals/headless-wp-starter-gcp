<?php
/**
 * Add GraphQL resolvers
 *
 * @package  TheRoyals_Headless_WP
 */

// check if WPGraphQL plugin is active.
if ( function_exists( 'register_graphql_field' ) ) {
	// Add header menu resolver.
	require_once 'resolvers/header-menu.php';
}
