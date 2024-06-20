<?php
function display_saved_form($atts) {
    $atts = shortcode_atts(array(
        'id' => null,
    ), $atts, 'airtable_form');

    if (!$atts['id']) {
        return __('No form ID provided.', 'airtable-wp');
    }

    $form = get_post($atts['id']);
    if (!$form || $form->post_type !== 'airtable_form') {
        return __('Form not found.', 'airtable-wp');
    }

    return '<form>' . $form->post_content . '</form>';
}
add_shortcode('airtable_form', 'display_saved_form');
