<?php


function airtable_wp_add_admin_menu()
{
    add_menu_page(
        'Airtable WP Settings',
        'Airtable WP',
        'manage_options',
        'airtable-wp-settings',
        'airtable_wp_settings_page',
        'dashicons-admin-generic',
        80
    );
}
add_action('admin_menu', 'airtable_wp_add_admin_menu');

// Register settings
function airtable_wp_settings_init()
{
    register_setting('airtable_wp', 'airtable_wp_settings');

    add_settings_section(
        'airtable_wp_section',
        __('Airtable WP Settings', 'airtable-wp'),
        'airtable_wp_settings_section_callback',
        'airtable_wp'
    );

    add_settings_field(
        'airtable_wp_api_key',
        __('API Key', 'airtable-wp'),
        'airtable_wp_api_key_render',
        'airtable_wp',
        'airtable_wp_section'
    );

    add_settings_field(
        'airtable_wp_base_id',
        __('Base ID', 'airtable-wp'),
        'airtable_wp_base_id_render',
        'airtable_wp',
        'airtable_wp_section'
    );

    add_settings_field(
        'airtable_wp_table_name',
        __('Table Name', 'airtable-wp'),
        'airtable_wp_table_name_render',
        'airtable_wp',
        'airtable_wp_section'
    );
}
add_action('admin_init', 'airtable_wp_settings_init');

function airtable_wp_api_key_render()
{
    $options = get_option('airtable_wp_settings');
    ?>
    <input type='text' name='airtable_wp_settings[api_key]' value='<?php echo $options['api_key']; ?>'>
    <?php
}

function airtable_wp_base_id_render()
{
    $options = get_option('airtable_wp_settings');
    ?>
    <input type='text' name='airtable_wp_settings[base_id]' value='<?php echo $options['base_id']; ?>'>
    <?php
}

function airtable_wp_table_name_render()
{
    $options = get_option('airtable_wp_settings');
    ?>
    <input type='text' name='airtable_wp_settings[table_name]' value='<?php echo $options['table_name']; ?>'>
    <?php
}

function airtable_wp_settings_section_callback()
{
    echo __('Enter your Airtable API details below:', 'airtable-wp');
}

function airtable_wp_settings_page()
{
    ?>
    <div class="wrap">
        <h1><?php _e('Airtable WP Settings', 'airtable-wp'); ?></h1>
        <form action='options.php' method='post'>
            <?php
            settings_fields('airtable_wp');
            do_settings_sections('airtable_wp');
            submit_button();
            ?>
        </form>
        <h2><?php _e('Create Form', 'airtable-wp'); ?></h2>
        <div id="form-builder-settings">
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

            <div id="field-container">
                <!-- Fields will be dynamically populated here -->
            </div>

            <div id="form-builder-container">
                <form id="form-container">
                    <!-- Form fields will be dynamically rendered here -->
                </form>
            </div>

            <div id="form-code-container">
                <textarea id="form-code"></textarea>
            </div>
        </div>
    </div>
    <?php
}
