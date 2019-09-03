<?php
/**
 * Theme for the The Royals Headless WordPress Starter Kit.
 *
 * Read more about this project at https://postlight.com/trackchanges/introducing-postlights-wordpress-react-starter-kit.
 *
 * @package  TheRoyals_Headless_WP
 */

// Frontend origin.
require_once 'inc/frontend-origin.php';

// ACF commands.
require_once 'inc/class-acf-commands.php';

// Logging functions.
require_once 'inc/log.php';

// CORS handling.
require_once 'inc/cors.php';

// Admin modifications.
require_once 'inc/admin.php';

// Add Menus.
require_once 'inc/menus.php';

// Add Headless Settings area.
require_once 'inc/acf-options.php';

// Add GraphQL resolvers.
require_once 'inc/graphql/resolvers.php';

/**
 * Sets up theme defaults and registers support for various WordPress features.
 */
function theme_setup() {
	// Add support for editor styles.
		add_theme_support( 'editor-styles' );
		add_editor_style( 'css/style-editor.css' );
}
add_action( 'after_setup_theme', 'theme_setup' );

// Add general global settings menu
function display_site_author()
{
	$site_author = get_option( 'site_author' );
	?>
	<input type='text' name='site_author' value='<?= $site_author; ?>'>
	<?php
}

function display_palette_color_0()
{
	$palette_col0 = get_option( 'palette_color_0' );
	?>
	<input type='text' name='palette_color_0' value='<?= $palette_col0; ?>'>
	<?php
}

function display_contact_address()
{
	$contact_address = get_option( 'contact_address' );
	wp_editor( $contact_address, 'contact_address', array('media_buttons'=>false)  );
}

function display_contact_email()
{
	$contact_email = get_option( 'contact_email' );
	wp_editor( $contact_email, 'contact_email', array('textarea_rows'=>5, 'teeny'=>true, 'media_buttons'=>false) );
}

function display_menu_items()
{
	$menu_items = get_option( 'menu_items' );
	?>
	<p>Create a new line for each menu item</p>
	<p>Add in the format; Name : Link</p>
	<p>External link eg. <code>Google : https://google.com</code></p>
	<p>Internal link eg. <code>Blog : /blog</code></p>
	<p>Maximum 6 links for this design</p>

	<textarea type='text' name='menu_items' rows='7' cols='50' value='<?= $menu_items; ?>'><?= $menu_items; ?></textarea>

	<?php
}



function register_settings() {

    $args = array(
        'type' => 'string',
        'sanitize_callback' => NULL,
        // 'sanitize_callback' => 'sanitize_text_field',
        'default' => NULL,
        'show_in_graphql' => true,
    );

		register_setting("general", "site_author", $args);

		register_setting("navbar", "menu_items", $args);

		register_setting("palette", "palette_color_0", $args);

    register_setting("footer", "contact_address", $args);
    register_setting("footer", "contact_email", $args);

}

function register_settings_groups() {

    add_settings_section("general", "General", null, "theroyals_headless_wp_general");
    add_settings_field("site_author", "Site Author", "display_site_author", "theroyals_headless_wp_general", "general");

    add_settings_section("navbar", "Navbar", null, "theroyals_headless_wp_navbar");
    add_settings_field("menu_items", "Menu Items", "display_menu_items", "theroyals_headless_wp_navbar", "navbar");

    add_settings_section("palette", "Palette", null, "theroyals_headless_wp_palette");
    add_settings_field("palette_color_0", "Palette Colour 0", "display_palette_color_0", "theroyals_headless_wp_palette", "palette");

    add_settings_section("footer", "Footer", null, "theroyals_headless_wp_footer");
    add_settings_field("contact_address", "Contact Address", "display_contact_address", "theroyals_headless_wp_footer", "footer");
    add_settings_field("contact_email", "Contact Email", "display_contact_email", "theroyals_headless_wp_footer", "footer");
}



function theme_settings_page()
{
	?>
	<div class="wrap">

			<div id="icon-themes" class="icon32"></div>
			<h2>The Royals Theme Headless WordPress - Settings</h2>

			<?php
					if( isset( $_GET[ 'tab' ] ) ) {
						$active_tab = $_GET[ 'tab' ];
					} else {
						$active_tab = 'general';
					}
			?>

			<h2 class="nav-tab-wrapper">
					<a href="?page=the_royals_headless_theme_settings&tab=general" class="nav-tab <?php echo $active_tab == 'general' ? 'nav-tab-active' : ''; ?>">General</a>
					<a href="?page=the_royals_headless_theme_settings&tab=navbar" class="nav-tab <?php echo $active_tab == 'navbar' ? 'nav-tab-active' : ''; ?>">Navbar</a>
					<a href="?page=the_royals_headless_theme_settings&tab=palette" class="nav-tab <?php echo $active_tab == 'palette' ? 'nav-tab-active' : ''; ?>">Palette</a>
					<a href="?page=the_royals_headless_theme_settings&tab=footer" class="nav-tab <?php echo $active_tab == 'footer' ? 'nav-tab-active' : ''; ?>">Footer</a>
			</h2>

			<form method="post" action="options.php">

			<?php

				if( $active_tab == 'general' ) {
					settings_fields( 'general' );
					do_settings_sections( 'theroyals_headless_wp_general' );
				} else if( $active_tab == 'navbar' ) {
					settings_fields( 'navbar' );
					do_settings_sections( 'theroyals_headless_wp_navbar' );
				} else if( $active_tab == 'palette' ) {
					settings_fields( 'palette' );
					do_settings_sections( 'theroyals_headless_wp_palette' );
				}else if( $active_tab == 'footer' ) {
					settings_fields( 'footer' );
					do_settings_sections( 'theroyals_headless_wp_footer' );
				}



				 submit_button();

		 ?>

			</form>

	</div><!-- /.wrap -->
<?php
}


function add_theme_options_item()
{
	add_options_page( 'The Royals Headless Theme Settings', 'The Royals Headless Theme Settings', 'manage_options', 'the_royals_headless_theme_settings', 'theme_settings_page' );
}

add_action("admin_menu", "add_theme_options_item");
add_action("init", "register_settings");
add_action("admin_init", "register_settings_groups");