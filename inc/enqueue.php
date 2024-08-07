<?php
//namespace airtableWP\inc;
use airtableWP\Inc\Utilities as airtableUtilities;

function airtable_wp_enqueue_block_editor_assets()
{
    $options = get_option('airtable_WP_options');
    $apiKey = isset($options['api_key']) ? $options['api_key'] : '';
    $baseId = isset($options['base_id']) ? $options['base_id'] : '';
    $tableName = isset($options['table_name']) ? $options['table_name'] : '';

    // Ensure that all necessary values are set before localizing the script
    if (empty($apiKey) || empty($baseId) || empty($tableName)) {
        return;
    }

    wp_enqueue_script(
        'airtable-wp-block-editor-script', // Handle
        plugins_url('../build/index.js', __FILE__), // Script URL
        array('wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-data'), // Dependencies
        filemtime(plugin_dir_path(__FILE__) . '../build/index.js') // Version (filemtime to ensure cache busting)
    );

    // Use wp_add_inline_script to add the settings object directly to the script
    $settings_script = "
    var airtableWpSettingsObject = {
        'apiKey': '$apiKey',
        'baseId': '$baseId',
        'tableName': '$tableName'
    };
    ";

    wp_add_inline_script('airtable-wp-block-editor-script', $settings_script);
}


add_action('enqueue_block_editor_assets', 'airtable_wp_enqueue_block_editor_assets');
add_action('admin_enqueue_scripts', 'airtable_wp_enqueue_block_editor_assets');
function enqueue_airtable_block_styles()
{
    // Enqueue your block's stylesheet
    wp_enqueue_style(
        'airtable-block-styles', // Handle
        plugins_url('../style.css', __FILE__), // URL to your stylesheet
        array(), // Dependencies, if any
        filemtime(plugin_dir_path(__FILE__) . '../style.css') // Version to prevent caching
    );
}
add_action('admin_enqueue_scripts', 'enqueue_airtable_block_styles');



add_action('wp_enqueue_scripts', 'airtable_wp_enqueue_scripts');
function airtable_wp_enqueue_scripts()
{
    $options = get_option('airtable_WP_options');
    $apiKey = isset($options['api_key']) ? $options['api_key'] : '';
    $baseId = isset($options['base_id']) ? $options['base_id'] : '';
    $tableName = isset($options['table_name']) ? $options['table_name'] : '';
    // Enqueue your JavaScript file
    wp_enqueue_script('airtable-wp-form-handler', plugins_url('airtable-wp-form.js', __FILE__), array('jquery'), null, true);
    
    $ajax_url = admin_url('admin-ajax.php');
    $settings_script = "
    var airtableWpSettingsObject = {
        'apiKey': '$apiKey',
        'baseId': '$baseId',
        'tableName': '$tableName'
    };
    var airtable_wp_ajax_url = '$ajax_url';
    ";

    wp_add_inline_script('airtable-wp-form-handler', $settings_script);
}
add_action('wp_ajax_save_form_config', 'airtable_wp_save_form_config');
add_action('wp_ajax_nopriv_save_form_config', 'airtable_wp_save_form_config');

function airtable_wp_save_form_config() {
    if (!isset($_POST['action']) || $_POST['action'] !== 'save_form_config') {
        error_log('Invalid action.');
        wp_send_json_error(array('message' => 'Invalid action.'));
        return;
    }

    if (!isset($_POST['form_data'])) {
        error_log('No form data provided');
        wp_send_json_error(array('message' => 'No form data provided.'));
        return;
    }

    $apiInfo = airtableUtilities::airtableConfig();
    $emailfield = $apiInfo['email_field_name'];
    $form_data = json_decode(stripslashes($_POST['form_data']), true);

    if (!$form_data) {
        error_log('Invalid form data');
        wp_send_json_error(array('message' => 'Invalid form data.'));
        return;
    }

    $debug_info = array();
    $debug_info['emailfieldname'] = $emailfield;

    // If there are file uploads
    foreach ($_FILES as $file_key => $file) {
        if ($file['error'] === UPLOAD_ERR_OK) {
            $upload_overrides = ['test_form' => false];
            $movefile = wp_handle_upload($file, $upload_overrides);

            if ($movefile && !isset($movefile['error'])) {
                $file_url = $movefile['url'];
                $form_data[$file_key] = [
                    [
                        'url' => $file_url,
                        'filename' => basename($movefile['file'])
                    ]
                ];
            } else {
                wp_send_json_error(['message' => $movefile['error']]);
                return;
            }
        }
    }

    error_log(print_r($form_data, true));

    $email = isset($form_data[$emailfield]) ? $form_data[$emailfield] : '';
    $debug_info['emailfielddata'] = $email;

    // Check if the email is not empty
    if (!empty($email)) {
        if (!airtableUtilities::email_exists_in_airtable($email)) {
            $debug_info['email_action'] = 'Email does not exist in Airtable, will be added';
            airtableUtilities::add_record_to_airtable($form_data);
        } else {
            $debug_info['email_action'] = 'Email exists in Airtable';
            airtableUtilities::update_record_in_airtable($form_data, $email, $debug_info);
        }
    } else {
        $debug_info['email_action'] = 'Email is empty';
        wp_send_json_success(
            array(
                'message' => 'Form data received successfully.',
                'data' => $form_data,
                'debug_info' => $debug_info
            )
        );
        return;
    }
    wp_send_json_success(
        array(
            'message' => 'Form processed successfully.',
            'data' => $form_data,
            'debug_info' => $debug_info
        )
    );
}
