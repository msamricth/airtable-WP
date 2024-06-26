<?php

function airtable_wp_register_form_post_type() {
    $labels = array(
        'name'                  => _x('Forms', 'Post Type General Name', 'airtable-wp'),
        'singular_name'         => _x('Form', 'Post Type Singular Name', 'airtable-wp'),
        'menu_name'             => __('Forms', 'airtable-wp'),
        'name_admin_bar'        => __('Form', 'airtable-wp'),
        'archives'              => __('Form Archives', 'airtable-wp'),
        'attributes'            => __('Form Attributes', 'airtable-wp'),
        'parent_item_colon'     => __('Parent Form:', 'airtable-wp'),
        'all_items'             => __('All Forms', 'airtable-wp'),
        'add_new_item'          => __('Add New Form', 'airtable-wp'),
        'add_new'               => __('Add New', 'airtable-wp'),
        'new_item'              => __('New Form', 'airtable-wp'),
        'edit_item'             => __('Edit Form', 'airtable-wp'),
        'update_item'           => __('Update Form', 'airtable-wp'),
        'view_item'             => __('View Form', 'airtable-wp'),
        'view_items'            => __('View Forms', 'airtable-wp'),
        'search_items'          => __('Search Form', 'airtable-wp'),
        'not_found'             => __('Not found', 'airtable-wp'),
        'not_found_in_trash'    => __('Not found in Trash', 'airtable-wp'),
        'featured_image'        => __('Featured Image', 'airtable-wp'),
        'set_featured_image'    => __('Set featured image', 'airtable-wp'),
        'remove_featured_image' => __('Remove featured image', 'airtable-wp'),
        'use_featured_image'    => __('Use as featured image', 'airtable-wp'),
        'insert_into_item'      => __('Insert into form', 'airtable-wp'),
        'uploaded_to_this_item' => __('Uploaded to this form', 'airtable-wp'),
        'items_list'            => __('Forms list', 'airtable-wp'),
        'items_list_navigation' => __('Forms list navigation', 'airtable-wp'),
        'filter_items_list'     => __('Filter forms list', 'airtable-wp'),
    );
    $args = array(
        'label'                 => __('Form', 'airtable-wp'),
        'description'           => __('Custom Post Type for Forms', 'airtable-wp'),
        'labels'                => $labels,
        'supports'              => array('title', 'editor', 'custom-fields'),
        'hierarchical'          => false,
        'public'                => true,
        'show_ui'               => true,
        'show_in_menu'          => true,
        'menu_position'         => 5,
        'show_in_admin_bar'     => true,
        'show_in_nav_menus'     => true,
        'can_export'            => true,
        'has_archive'           => true,
        'exclude_from_search'   => false,
        'publicly_queryable'    => true,
        'capability_type'       => 'post',
    );
    register_post_type('airtable_form', $args);
}
add_action('init', 'airtable_wp_register_form_post_type', 0);
