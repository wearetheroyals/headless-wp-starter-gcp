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
	$value = get_option( 'site_author' );
	?>
	<input type='text' name='site_author' value='<?php echo $value; ?>'>
	<?php
}

function display_palette_color_0()
{
	$value = get_option( 'palette_color_0' );
	?>
	<input type='text' name='palette_color_0' value='<?php echo $value; ?>'>
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
    register_setting("palette", "palette_color_0", $args);

}

function register_settings_groups() {

    add_settings_section("general", "General", null, "theroyals_headless_wp");
    add_settings_field("site_author", "Site Author", "display_site_author", "theroyals_headless_wp", "general");

    add_settings_section("palette", "Palette", null, "theroyals_headless_wp");
    add_settings_field("palette_color_0", "Palette Colour 0", "display_palette_color_0", "theroyals_headless_wp", "palette");

}



function theme_settings_page()
{
    ?>
	    <div class="wrap">

        <h1>The Royals Theme Headless WordPress - Settings</h1>

	    <form method="post" action="options.php">

            <?php
	            settings_fields("general");
	            settings_fields("palette");
	            do_settings_sections("theroyals_headless_wp");
	            submit_button();
	        ?>
	    </form>
		</div>
	<?php
}


function add_theme_options_item()
{
	// add_menu_page("project", "project", "manage_options", "theme-panel", "theme_settings_page", null, 99);
	add_options_page( 'The Royals Headless Theme Settings', 'The Royals Headless Theme Settings', 'manage_options', 'the_royals_headless_theme_settings', 'theme_settings_page' );
}

add_action("admin_menu", "add_theme_options_item");
add_action("init", "register_settings");
add_action("admin_init", "register_settings_groups");