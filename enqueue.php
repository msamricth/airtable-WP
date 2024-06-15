<?php
function airtable_wp_enqueue_block_editor_assets()
{
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
    )
    );
}
add_action('enqueue_block_editor_assets', 'airtable_wp_enqueue_block_editor_assets');
add_action('admin_enqueue_scripts', 'airtable_wp_enqueue_block_editor_assets');
function enqueue_airtable_block_styles()
{
    // Enqueue your block's stylesheet
    wp_enqueue_style(
        'airtable-block-styles', // Handle
        plugins_url('style.css', __FILE__), // URL to your stylesheet
        array(), // Dependencies, if any
        filemtime(plugin_dir_path(__FILE__) . 'style.css') // Version to prevent caching
    );
}
add_action('admin_enqueue_scripts', 'enqueue_airtable_block_styles');


