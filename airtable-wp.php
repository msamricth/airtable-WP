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

 
$formPostType = __DIR__ . '/posttype.php';
if (is_readable($formPostType)) {
    require_once $formPostType;
}

$enqueueFile = __DIR__ . '/enqueue.php';
if (is_readable($enqueueFile)) {
    require_once $enqueueFile;
}

$settingsPage = __DIR__ . '/settings-page.php';
if (is_readable($settingsPage)) {
    require_once $settingsPage;
}


$shortcodeFile = __DIR__ . '/shortcodes.php';
if (is_readable($shortcodeFile)) {
    require_once $shortcodeFile;
}