<?php

/*
Plugin Name: BPMContext - Intranet Plus Dropbox
Plugin URI: http://bpmcontext.com
Description: Add an intranet dashboard to facilitate team communications and collaboration with Intranet Plus by BPMContext, a dynamic, extendable plugin for WordPress. This version uses Dropbox for storage instead of Amazon S3.
Version: 3.1.10
Author: BPMContext
Author URI: http://bpmcontext.com
License: GPLv2+
Text Domain: bpmcontext
Domain Path: /languages
*/

global $bpm_sdk_version , $bpm_server_info;

global $bpm_sdk_version , $bpm_server_info;


$bpm_server_info['bpm_marketing']   = 'bpmcontext.com';
$bpm_this_sdk_version = 320;

if( $bpm_this_sdk_version > $bpm_sdk_version ) {
    $bpm_sdk_version = $bpm_this_sdk_version;
    $bpm_server_info['bpm_server']      = 'bpm.bpmcontext.com';
    $bpm_server_info['bpm_api']         = 'api_v3_1_9';
}

update_option('bpmcontext-dropbox-sdk',$bpm_this_sdk_version);

add_action('admin_init', 'bpm_dropbox_load_sdk' , 1 );
add_action('init', 'bpm_dropbox_load_sdk' , 1 );

function bpm_dropbox_load_sdk(){

    if ( ! function_exists( 'get_plugins' ) ) {
        require_once ABSPATH . 'wp-admin/includes/plugin.php';
    }

    $plugins = get_plugins();

    if( is_plugin_active( 'bpmcontext/bpmcontext.php' ) ) {
        if (isset($plugins['bpmcontext/bpmcontext.php'])) {
            $version = $plugins['bpmcontext/bpmcontext.php']['Version'];
            $version = explode('.',$version);

            if($version[0] < 3){
                //add message to the user
                deactivate_plugins('bpmcontext/bpmcontext.php');

            }
        }
    }

    global $bpm_sdk_version, $bpm_sdk;

    $bpm_this_sdk_version = get_option('bpmcontext-dropbox-sdk');

    if($bpm_this_sdk_version >=  $bpm_sdk_version) {

        require_once 'includes/bpm-sdk/start.php';

        if( ! $bpm_sdk ) {

            $bpm_sdk = new bpmcontext_sdk_manager();
            $bpm_sdk->bpm_load_actions();

        }

    }

}


/**
 * start of bpmcontext sdk setup
 */
global $bpm_solution_sets;
$bpm_solution_sets['dropbox'] = 3;

global $bpm_right_boxes;
$bpm_right_boxes['event_data']  = array('name'=>'event_data');
$bpm_right_boxes['contactform'] = array('name'=>'contactform');
$bpm_right_boxes['infobox']     = array('name'=>'infobox');
$bpm_right_boxes['tutorial']    = array('name'=>'tutorial');
$bpm_right_boxes['cust_supp']   = array('name'=>'cust_supp');
$bpm_right_boxes['subscribers'] = array('name'=>'subscribers');
$bpm_right_boxes['history']     = array('name'=>'history');
$bpm_right_boxes['sharing']     = array('name'=>'sharing');
$bpm_right_boxes['changelog']   = array('name'=>'changelog');

global $bpm_home_page_widgets;
$bpm_home_page_widgets['promoted'] = array('name'=>'promoted', 'title' => 'Newsfeed');
$bpm_home_page_widgets['calendar']      = array('name'=>'calendar', 'title' => 'Calendar');
$bpm_home_page_widgets['recent'] = array('name'=>'recent', 'width'=>1, 'title'=>'Recent Changes');
$bpm_home_page_widgets['notifications'] = array('name'=>'notifications', 'width'=>1 , 'title'=>'Notifications');
$bpm_home_page_widgets['bookmarks'] = array('name'=>'bookmarks', 'width'=>1 , 'title' => 'Bookmarks');
$bpm_home_page_widgets['subscriptions'] = array('name'=>'subscriptions', 'width'=>1 , 'title'=>'Subscriptions');
$bpm_home_page_widgets['myhistory'] = array('name'=>'myhistory', 'width'=>1, 'title'=>'My History');

global $bpm_site_type_token;
$bpm_site_type_token = 'f990d185-e7bf-11e4-b43f-878390a1d9ca0';

global $bpm_left_menu;

global $bpm_onboarding;

global $admin_menu_items;

global $bpm_first_redirect;
$bpm_first_redirect = 'bpm_options';
/**
 * end of bpmcontext sdk setup
 */

add_action( 'init', 'bpm_load_textdomain' );
function bpm_load_textdomain() {
    load_plugin_textdomain('bpmcontext', false, dirname(plugin_basename(__FILE__)) . '/includes/bpm-sdk/Languages');
}

add_action( 'admin_init', 'bpm_dropbox_redirect');

//Activate then redirect to the contact plus page
register_activation_hook( __FILE__, 'bpm_dropbox_activate' );
function bpm_dropbox_activate() {
    global $bpm_first_redirect;
	update_option( 'bpm_activation_redirect', true );
    update_option('reactivate', 1);
    update_option('bpm_redirect_to', $bpm_first_redirect);
}

function bpm_dropbox_redirect() {
    if (get_option('bpm_activation_redirect', false)) {
        delete_option('bpm_activation_redirect');
        if ( ! is_multisite() ) {
            wp_redirect("admin.php?page=bpm_options");
            exit;
        }
    }
}

// Add settings link on plugin page
$plugin = plugin_basename(__FILE__);
add_filter("plugin_action_links_$plugin", 'bpm_dropbox_settings_link' );
function bpm_dropbox_settings_link($links) {

    $settings_link = '<a href="https://support.bpmcontext.com" target="_blank">'.__('Support Site', 'bpmcontext').'</a>';
    array_unshift($links, $settings_link);
    $settings_link = '<a href="admin.php?page=bpm_options">Settings</a>';
    array_unshift($links, $settings_link);
    return $links;
}



add_action('wp_enqueue_scripts', 'bpm_dropbox_load_dropbox');

function bpm_dropbox_load_dropbox() {

    global $bpm_server_info;

	wp_register_script( 'bpm_dropbox', plugins_url() . '/bpmcontext-dropbox/js/bpmdropbox.js', array(), $bpm_server_info['bpm_file_version'], false );
	wp_enqueue_script( array( 'bpm_dropbox' ) );

	$params = array('images_dir' => plugins_url() . '/bpmcontext-dropbox/images/');
	wp_localize_script( 'bpm_dropbox', 'bpm_dropbox_params', $params );

    $bpm_trans_array = bpm_dropbox_get_trans_array();

    wp_localize_script('bpm_dropbox', 'bpm_dropbox_trans_array', $bpm_trans_array);
}


function bpm_dropbox_get_trans_array(){

    $bpm_trans_array['bpm_dropbox_lng_in_dropbox'] = __('in Dropbox', 'bpmcontext');
    $bpm_trans_array['bpm_dropbox_lng_dropbox_message_part1'] = __('Setup Dropbox by authorizing access using this link', 'bpmcontext');
    $bpm_trans_array['bpm_dropbox_lng_dropbox_message_part2'] = __('Go to Dropbox', 'bpmcontext');
    $bpm_trans_array['bpm_dropbox_lng_dropbox_message_part3'] = __('This process takes a few minutes depending on how many files you currently have uploaded to the BPMContext server.', 'bpmcontext');
    $bpm_trans_array['bpm_dropbox_lng_dropbox_message_part4'] = __('If you don\'t want to use Dropbox at this time you can deactivate the plugin in Wordpress and install Intranet Plus instead.', 'bpmcontext');
    $bpm_trans_array['bpm_dropbox_lng_actions'] = __('Actions', 'bpmcontext');
    $bpm_trans_array['bpm_dropbox_lng_rename_folder'] = __('Rename Folder', 'bpmcontext');
    $bpm_trans_array['bpm_dropbox_lng_admin_delete_folder'] = __('Admin Delete Folder', 'bpmcontext');
    $bpm_trans_array['bpm_dropbox_lng_delete_folder'] = __('Delete Folder', 'bpmcontext');
    $bpm_trans_array['bpm_dropbox_lng_admin_delete'] = __('Admin Delete', 'bpmcontext');
    $bpm_trans_array['bpm_dropbox_lng_adding_folder'] = __('Adding folder', 'bpmcontext');
    $bpm_trans_array['bpm_dropbox_lng_deleting_folder'] = __('Deleting folder', 'bpmcontext');
    $bpm_trans_array['bpm_dropbox_lng_renaming_folder'] = __('Renaming folder', 'bpmcontext');
    $bpm_trans_array['bpm_dropbox_lng_deleting_file'] = __('Deleting file', 'bpmcontext');
    $bpm_trans_array['bpm_dropbox_lng_yes'] = __('Yes', 'bpmcontext');
    $bpm_trans_array['bpm_dropbox_lng_cancel'] = __('Cancel', 'bpmcontext');
    $bpm_trans_array['bpm_dropbox_lng_add_files'] = __('Add Files', 'bpmcontext');
    $bpm_trans_array['bpm_dropbox_lng_new_folder'] = __('New Folder', 'bpmcontext');
    $bpm_trans_array['bpm_dropbox_lng_folder_name'] = __('Folder name', 'bpmcontext');
    $bpm_trans_array['bpm_dropbox_lng_upload_to_dropbox'] = __('Upload to Dropbox', 'bpmcontext');
    $bpm_trans_array['bpm_dropbox_lng_upload'] = __('Upload', 'bpmcontext');
    $bpm_trans_array['bpm_dropbox_lng_files_uploading'] = __('Files uploading', 'bpmcontext');
    $bpm_trans_array['bpm_dropbox_lng_upload_message'] = __('Create a folder to save files or upload to the current directory.', 'bpmcontext');

    return $bpm_trans_array;
}