<?php
/*
 * Plugin Name:       Airtable-WP
 * Description:       Create forms that integrate with Airtable.
 * Plugin URI:        https://github.com/msamricth/airtable-WP
 * Version:           1.0
 * Author:            Emm Talarico
 * Author URI:        https://github.com/msamricth
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       Airtable-WP
 */

 function airtable_wp_enqueue_block_editor_assets() {
    $options = get_option('airtable_WP_options');
    $apiKey = isset($options['api_key']) ? $options['api_key'] : '';
    $baseId = isset($options['base_id']) ? $options['base_id'] : '';
    $tableName = isset($options['table_name']) ? $options['table_name'] : '';
  
    wp_enqueue_script(
        'airtable-wp-block-editor-script', // Handle
        plugins_url('build/index.js', __FILE__), // Script URL
        array('wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-data'), // Dependencies
        filemtime(plugin_dir_path(__FILE__) . 'build/index.js') // Version (filemtime to ensure cache busting)
    );

    wp_localize_script('airtable-wp-block-editor-script', 'airtableWpSettingsObject', array(
        'apiKey' => $apiKey,
        'baseId' => $baseId,
        'tableName' => $tableName
    ));
}
add_action('enqueue_block_editor_assets', 'airtable_wp_enqueue_block_editor_assets');
function enqueue_airtable_block_styles() {
    // Enqueue your block's stylesheet
    wp_enqueue_style(
        'airtable-block-styles', // Handle
        plugins_url('style.css', __FILE__), // URL to your stylesheet
        array(), // Dependencies, if any
        filemtime( plugin_dir_path( __FILE__ ) . 'style.css' ) // Version to prevent caching
    );
}
add_action('enqueue_block_editor_assets', 'enqueue_airtable_block_styles');

function airtable_WP_menu() {
    add_options_page(
        'Airtable WP Settings',
        'Airtable WP',
        'manage_options',
        'airtable-wp-settings',
        'airtable_WP_settings_page'
    );
}
add_action('admin_menu', 'airtable_WP_menu');

function airtable_WP_settings_page() {
    ?>
    <div class="wrap">
        <h1>Airtable WP Settings</h1>
        <form method="post" action="options.php">
            <?php settings_fields('airtable_WP_options'); ?>
            <?php do_settings_sections('airtable-WP-settings'); ?>
            <?php submit_button('Save Settings'); ?>
        </form>
    </div>
    <?php
}

function airtable_WP_settings() {
    register_setting('airtable_WP_options', 'airtable_WP_options', 'airtable_WP_validate_options');
    add_settings_section('airtable_WP_main', 'Main Settings', 'airtable_WP_section_text', 'airtable-WP-settings');

    add_settings_field('airtable_WP_api_key', 'API Key', 'airtable_WP_api_key_input', 'airtable-WP-settings', 'airtable_WP_main');
    add_settings_field('airtable_WP_base_id', 'Base ID', 'airtable_WP_base_id_input', 'airtable-WP-settings', 'airtable_WP_main');
    add_settings_field('airtable_WP_table_name', 'Table Name', 'airtable_WP_table_name_input', 'airtable-WP-settings', 'airtable_WP_main');
}
add_action('admin_init', 'airtable_WP_settings');

function airtable_WP_section_text() {
    echo '<p>Enter your Airtable API credentials below:</p>';
}

function airtable_WP_api_key_input() {
    $options = get_option('airtable_WP_options');
    echo "<input id='airtable_WP_api_key' name='airtable_WP_options[api_key]' type='text' value='{$options['api_key']}' />";
}

function airtable_WP_base_id_input() {
    $options = get_option('airtable_WP_options');
    echo "<input id='airtable_WP_base_id' name='airtable_WP_options[base_id]' type='text' value='{$options['base_id']}' />";
}

function airtable_WP_table_name_input() {
    $options = get_option('airtable_WP_options');
    echo "<input id='airtable_WP_table_name' name='airtable_WP_options[table_name]' type='text' value='{$options['table_name']}' />";
}

function airtable_WP_validate_options($input) {
    $valid = array();
    $valid['api_key'] = isset($input['api_key']) ? sanitize_text_field($input['api_key']) : '';
    $valid['base_id'] = isset($input['base_id']) ? sanitize_text_field($input['base_id']) : '';
    $valid['table_name'] = isset($input['table_name']) ? sanitize_text_field($input['table_name']) : '';
    return $valid;
}
