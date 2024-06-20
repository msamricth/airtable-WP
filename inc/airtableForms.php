<?php
/*
Plugin Name: Airtable Form Content Filter
Description: Filters the content of the airtable_form custom post type and adds a thank you message meta box.
Version: 1.0
Author: Your Name
*/

// Enqueue the form builder UI
function airtable_wp_form_builder_ui($post) {
    $form_html = get_post_meta($post->ID, '_airtable_form_html', true);
    ?>
    <h2><?php _e('Form Builder', 'airtable-wp'); ?></h2>

    <label for="filter-by-type"><?php _e('Filter by Type:', 'airtable-wp'); ?></label>
    <select id="filter-by-type">
        <option value="all"><?php _e('All', 'airtable-wp'); ?></option>
        <option value="singleLineText"><?php _e('Text', 'airtable-wp'); ?></option>
        <option value="email"><?php _e('Email', 'airtable-wp'); ?></option>
        <option value="date"><?php _e('Date', 'airtable-wp'); ?></option>
        <option value="singleSelect"><?php _e('Select', 'airtable-wp'); ?></option>
        <option value="Checkbox"><?php _e('Checkbox', 'airtable-wp'); ?></option>
        <option value="multipleAttachments"><?php _e('File', 'airtable-wp'); ?></option>
    </select>

    <label for="search-field"><?php _e('Search Fields:', 'airtable-wp'); ?></label>
    <input type="text" id="search-field" placeholder="<?php _e('Search...', 'airtable-wp'); ?>" />

    <div id="field-container"></div>

    <div id="form-builder-container">
        <div id="form-container">
            <?php echo wp_kses_post($form_html); // Render the saved form HTML ?>
        </div>
    </div>

    <textarea id="form-code" name="airtable_form_html" ><?php echo esc_textarea($form_html); ?></textarea>
    <?php
}

add_action('add_meta_boxes', function() {
    add_meta_box('airtable_wp_form_builder', __('Form Builder', 'airtable-wp'), 'airtable_wp_form_builder_ui', 'airtable_form', 'normal', 'high');
});

// Save form HTML to custom field
function airtable_wp_save_form_html($post_id) {
    if (!isset($_POST['airtable_form_html'])) {
        return;
    }

    update_post_meta($post_id, '_airtable_form_html', sanitize_text_field($_POST['airtable_form_html']));
}
add_action('save_post', 'airtable_wp_save_form_html');




function airtable_wp_add_form_meta_box() {
    add_meta_box(
        'airtable_form_meta_box',
        __('Form HTML', 'airtable-wp'),
        'airtable_wp_form_meta_box_callback',
        'airtable_form',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'airtable_wp_add_form_meta_box');

function airtable_wp_form_meta_box_callback($post) {
    wp_nonce_field('airtable_wp_save_form_meta_box_data', 'airtable_wp_meta_box_nonce');
   // $value = get_post_meta($post->ID, '_airtable_form_html', true);
    $value = get_the_content($post->ID);
    $value =str_replace('< input', '<input', $value);
    echo '<textarea id="_airtable_form_html" name="_airtable_form_html" style="width:100%; height:200px;">' . esc_textarea($value) . '</textarea>';
}

// Add meta box for Thank You Message
function airtable_wp_add_thank_you_meta_box() {
    add_meta_box(
        'airtable_thank_you_meta_box',
        __('Thank You Message', 'airtable-wp'),
        'airtable_wp_thank_you_meta_box_callback',
        'airtable_form',
        'side',
        'low'
    );
}
add_action('add_meta_boxes', 'airtable_wp_add_thank_you_meta_box');

function airtable_wp_thank_you_meta_box_callback($post) {
    wp_nonce_field('airtable_wp_save_thank_you_meta_box_data', 'airtable_wp_thank_you_meta_box_nonce');
    $thank_you_headline = get_post_meta($post->ID, '_airtable_thank_you_headline', true);
    $thank_you_message = get_post_meta($post->ID, '_airtable_thank_you_message', true);

    if (empty($thank_you_headline)) {
        $thank_you_headline = 'Thanks for your submission';
    }

    if (empty($thank_you_message)) {
        $thank_you_message = 'We will be in touch';
    }

    echo '<label for="_airtable_thank_you_headline">' . __('Thank You Headline', 'airtable-wp') . '</label>';
    echo '<input type="text" id="_airtable_thank_you_headline" name="_airtable_thank_you_headline" value="' . esc_attr($thank_you_headline) . '" style="width:100%;" />';

    echo '<label for="_airtable_thank_you_message">' . __('Thank You Message', 'airtable-wp') . '</label>';
    echo '<textarea id="_airtable_thank_you_message" name="_airtable_thank_you_message" style="width:100%; height:100px;">' . esc_textarea($thank_you_message) . '</textarea>';
}






function airtable_wp_allowed_html() {
    return array(
        'form' => array(
            'id' => array(),
            'class' => array(),
            'method' => array(),
            'action' => array(),
        ),
        'input' => array(
            'type' => array(),
            'name' => array(),
            'value' => array(),
            'id' => array(),
            'class' => array(),
            'placeholder' => array(),
        ),
        'textarea' => array(
            'name' => array(),
            'id' => array(),
            'class' => array(),
        ),
        'select' => array(
            'name' => array(),
            'id' => array(),
            'class' => array(),
        ),
        'button' => array(
            'name' => array(),
            'id' => array(),
            'class' => array(),
            'for'=> array(),
        ),
        'a' => array(
            'name' => array(),
            'id' => array(),
            'class' => array(),
            'href'=> array(),
        ),
        'option' => array(
            'value' => array(),
            'selected' => array(),
        ),
        'label' => array(
            'for' => array(),
            'class' => array(),
        ),
        'div' => array(
            'class' => array(),
            'id' => array(),
        ),
        // Add other tags and attributes as needed
    );
}

function airtable_wp_save_form_meta_box_data($post_id) {

    if (!isset($_POST['airtable_wp_meta_box_nonce'])) {
        return;
    }

    if (!wp_verify_nonce($_POST['airtable_wp_meta_box_nonce'], 'airtable_wp_save_form_meta_box_data')) {
        return;
    }

    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    if (isset($_POST['_airtable_form_html'])) {
        $allowed_html = airtable_wp_allowed_html();
        update_post_meta($post_id, '_airtable_form_html', wp_kses($_POST['_airtable_form_html'], $allowed_html));
    }
    if (isset($_POST['_airtable_thank_you_headline'])) {
        update_post_meta($post_id, '_airtable_thank_you_headline', sanitize_text_field($_POST['_airtable_thank_you_headline']));
    }

    if (isset($_POST['_airtable_thank_you_message'])) {
        update_post_meta($post_id, '_airtable_thank_you_message', sanitize_text_field($_POST['_airtable_thank_you_message']));
    }
}
add_action('save_post', 'airtable_wp_save_form_meta_box_data');
function myextensionTinyMCE($init) {
    // Command separated string of extended elements
    $ext = 'span[id|name|class|style], input[id|name|class|style|type], textarea[id|name|class|style], select[id|name|class|style], label[id|name|class|style|for]';

    // Add to extended_valid_elements if it alreay exists
    if ( isset( $init['extended_valid_elements'] ) ) {
        $init['extended_valid_elements'] .= ',' . $ext;
    } else {
        $init['extended_valid_elements'] = $ext;
    }

    // Super important: return $init!
    return $init;
}

add_filter('tiny_mce_before_init', 'myextensionTinyMCE' );