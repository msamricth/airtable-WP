<?php

namespace airtableWP\inc;

function filter_airtable_form_content($content)
{
    // Check if we are inside the main loop in a single post of type 'airtable_form'.
    if (is_singular('airtable_form')) {
        // Get the current content
        $newformHTML = get_the_content();

        // Modify the form HTML as needed
        $newformHTML = str_replace('< form', '<form class="airtable-form"', $newformHTML);
        $newformHTML = str_replace('< input', '<input', $newformHTML);
        $thank_you_headline = get_post_meta(get_the_ID(), '_airtable_thank_you_headline', true);
        $thank_you_message = get_post_meta(get_the_ID(), '_airtable_thank_you_message', true);

        if (empty($thank_you_headline)) {
            $thank_you_headline = 'Thanks for your submission';
        }

        if (empty($thank_you_message)) {
            $thank_you_message = 'We will be in touch';
        }
        // Construct the new content
        ob_start(); // Start output buffering to capture HTML
        ?>

        <div class="entry-content airtable-WP">
            <div class="airtable-WP--form-container hidden-only-if-sent">
                <?php echo $newformHTML; ?>
            </div>
            <div class="visible-only-if-sent fade-in" style="display:none;">
                <h2><?php echo esc_html($thank_you_headline); ?></h2>
                <p><?php echo wpautop(esc_html($thank_you_message)); ?></p>
                <p class="airtable-edit-url recID"></p>
            </div>
            <div class="visible-only-if-sending fade-in" style="display:none;">
                <!-- Add any additional content or messages here -->
            </div>
            <div class="visible-only-if-error fade-in" style="display:none;">

            </div>
        </div>
        <?php
        $new_content = ob_get_clean(); // Get the buffered content and clean the buffer

        return $new_content;
    }

    // Return the original content if not the target post type
    return $content;
}
add_filter('the_content', __NAMESPACE__ . '\\filter_airtable_form_content');