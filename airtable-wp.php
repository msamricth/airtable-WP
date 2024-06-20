<?php
/*
 * Plugin Name:       Airtable-WP
 * Description:       Create forms that integrate with Airtable.
 * Plugin URI:        https://github.com/msamricth/airtable-WP
 * Version:           1.5
 * Author:            Emm Talarico
 * Author URI:        https://github.com/msamricth
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       Airtable-WP
 */

namespace airtableWP;

$formPostType = __DIR__ . '/inc/posttype.php';
if (is_readable($formPostType)) {
    require_once $formPostType;
}

$airtableFilters = __DIR__ . '/inc/filters.php';
if (is_readable($airtableFilters)) {
    require_once $airtableFilters;
}


$airtableUtilities = __DIR__ . '/inc/utils.php';
if (is_readable($airtableUtilities)) {
    require_once $airtableUtilities;
}

$enqueueFile = __DIR__ . '/inc/enqueue.php';
if (is_readable($enqueueFile)) {
    require_once $enqueueFile;
}

$settingsPage = __DIR__ . '/inc/settings-page.php';
if (is_readable($settingsPage)) {
    require_once $settingsPage;
}
$airtableForms = __DIR__ . '/inc/airtableForms.php';
if (is_readable($airtableForms)) {
    require_once $airtableForms;
}

$shortcodeFile = __DIR__ . '/inc/shortcodes.php';
if (is_readable($shortcodeFile)) {
    require_once $shortcodeFile;
}