// JavaScript Document
jQuery.noConflict();
jQuery(document).ready(function() {

    if(!bpm_settings) bpm_settings = [];

    bpm_settings['bpm_location'] = 'admin';

    jQuery('#bpm_admin_new_login_show_all').hide();

    jQuery('#bpm_new_acct_password_html_admin_main').html('<input id="bpm_password_field" class="bpm_new_account_field" type="password" />');

     jQuery('.bpm_product_action_button').click(function(){
        if(jQuery(this).data('action')=='Buy') {
            var url = 'https://' + jQuery(this).data('mktsite') + '/checkout/?add-to-cart=' + jQuery(this).data('webid');
            var win = window.open(url, '_blank');
            win.focus();
        }else{
            //show management window
            jQuery('.bpm-admin-extensions-overlay').show();
            jQuery('#bpm_extension_manager_'+jQuery(this).data('prod_id')).show();
            jQuery('#bpm_extension_manager_acct_alert_message_'+jQuery(this).data('prod_id')).hide();
            bpm_settings['allowed_installs'] = jQuery(this).data('installs');
        }
    });

    jQuery('.bpm_product_manager_cancel_button').click(function(){
        jQuery('.bpm-admin-extensions-overlay').hide();
        jQuery('#bpm_extension_manager_'+jQuery(this).data('prod_id')).hide();
        jQuery('.bpm_extension_manager_acct_'+jQuery(this).data('prod_id')).each(function(index, value) {

            if(jQuery(this).data('ischecked') == 'checked'){
                jQuery(this).prop('checked', true);
            }else{
                jQuery(this).prop('checked', false);
            }
        });
    })

    jQuery('.bpm_extension_manager_acct_checkbox').click(function(){

        var prod_id = jQuery(this).data('prod_id');
        var this_id = jQuery(this).prop('id');
        var current_installs = 0;
        jQuery('.bpm_extension_manager_acct_'+prod_id).each(function(index, value) {
            var this_value = jQuery(this).val();
            if(jQuery(this).is(':checked')){
                current_installs++;
            }else{
                current_installs--;
            }
        });
        if(current_installs > bpm_settings['allowed_installs']){
            jQuery( '#'+this_id ).attr('checked', false);
            jQuery('#bpm_extension_manager_acct_alert_message_'+prod_id).show();
        }
    });


    jQuery('.bpm_product_manager_save_button').click(function(){

        var prod_id = jQuery(this).data('prod_id');
        jQuery('#bpm_extension_manager_overlay_'+prod_id).show();

        var query_string = '&domain='+bpm_current_domain+'&action=update_installations&prod_id='+prod_id;

        jQuery('.bpm_extension_manager_acct_'+prod_id).each(function(index, value) {
            var this_value = jQuery(this).val();
            if(jQuery(this).is(':checked')){
                query_string = query_string.concat('&install[]='+this_value);
            }else{
                query_string = query_string.concat('&no_install[]='+this_value);
            }

        });

        jQuery.getJSON('https://' + bpm_settings['bpm_server'] + '/' + bpm_settings['bpm_api'] + '/bpmcontext_wordpress.php?callback=?', query_string, function (result) {

            if(result) {

                if(result.dashboard.ACCTMGR && ajaxurl){

                    var data = {
                        'action': 'bpm_update_product_info',
                        'value' : result.dashboard.ACCTMGR,
                        'imadmin': result.dashboard.IMADMIN
                    };

                    jQuery.post(ajaxurl, data, function (result) {
                        location.reload();
                    });

                }

            }else{
                alert('A network error occoured.  Please try again');
                jQuery('#bpm_extension_manager_overlay_'+prod_id).hide();
            }

        });
    })


    jQuery('.bpm_product_more_info_button').click(function(){
        var url = jQuery(this).data('webslug');
        var win = window.open(url, '_blank');
        win.focus();
    });

    jQuery('#bpm_show_login_header').change(function(){

        jQuery('#bpm_show_login_header_message').hide();

        var cb_value = 'no';
        if(jQuery(this).is(':checked')){
            cb_value = 'yes';
          }

        var data = {
            'action': 'bpm_update_login_header',
            'value' : cb_value
        };

        jQuery.post(ajaxurl, data, function (result) {
            jQuery('#bpm_show_login_header_message').show().fadeOut( 6000 );
        });
    });

    jQuery('#bpm_help_widget_search').on('keydown', function(e){
        if(e.which == 13){
            bpmcontext.bpm_help_widget_search();
        }
    });

    jQuery('#bpm_password1_4').on('keydown', function(e){
        if(e.which == 13){
            bpmcontext.bpm_submitLogIn(1);
        }
    });

    jQuery('.bpm_search_pages_input').on('keydown', function(e){
        if(e.which == 13){
            var el = jQuery(this);
            var this_id = jQuery(this).prop('id');
            bpmcontext.bpm_search_grid(this_id.substring(23));
        }
    });

    jQuery('.bpm_clear_help_search').click(function() {
        jQuery('#bpm_help_widget_search').val('');
        jQuery('#bpm_help_widget_content_title').text(bpm_trans_array['bpm_lng_popular_articles']);
        jQuery('#bpm_help_widget_clear_search').hide();
        bpmcontext.bpm_help_widget_load_popular();
    });

    jQuery('#bpm_new_account_form').submit(function(e){

        if( ! bpm_settings['bpm_new_account_status']) {
            e.preventDefault();

            jQuery('#bpm_settings_first_time_no_account').hide();

            jQuery(document.body).css({'cursor': 'wait'});

            //if this is an updating customer then just opt in or skip
            if (!jQuery('#bpm_opt_in_to_freemius').length) {

                bpm_settings['bpm_new_account_status'] = 1;

                 //user opted in for Freemium
                 jQuery('form#bpm_new_account_form').submit();

            } else {

                //otherwise process as new account

                var bpm_company = 'Company';
                var loc = 3;
                var main_url = bpm_params.login_url;
                var bpm_email = jQuery("input:hidden[name='user_email']").val();
                var recommended = jQuery("input:hidden[name='bpm_recommended']").val();
                var bpm_name = null;
                if (jQuery("input:hidden[name='user_firstname']").val() && jQuery("input:hidden[name='user_lastname']").val()) bpm_name = jQuery("input:hidden[name='user_firstname']").val() + ' ' + jQuery("input:hidden[name='user_lastname']").val();
                if (!bpm_name) bpm_name = jQuery("input:hidden[name='user_nickname']").val();

                var site_token = 'f990d185-e7bf-11e4-b43f-878390a1d9ca0';
                if(bpm_params.site_token) site_token = bpm_params.site_token;

                var query_string = 'action=create_account&recommended='+recommended+'&BPM_Email=' + bpm_email + '&BPM_CompanyName=' + bpm_company + '&BPM_FirstName=' + bpm_name + '&token='+site_token+'&url=' + main_url + '&loc=' + loc;

                jQuery.getJSON('https://' + bpm_settings['bpm_server'] + '/' + bpm_settings['bpm_api'] + '/bpmcontext_wordpress.php?callback=?', query_string, function (result) {

                    bpm_settings['bpm_login_status'] = Number(result.LOGGEDIN);
                    bpm_settings['bpm_new_account_status'] = 1;

                    var data = {
                        'action': 'has_logged_in'
                    };

                    jQuery.post(ajaxurl, data, function (result) {
                                if (jQuery('#bpm_opt_in_to_freemius').is(':checked')) {
                                    //user opted in for Freemium
                                    jQuery('form#bpm_new_account_form').submit();
                                } else {
                                    //redirect to settings page and opt out of Freemium
                                    window.location(jQuery("input:hidden[name='ignore_link']").val());
                                }
                    });

                });
            }
        }
    });
    //admin handlers end

    var this_url = window.location.href.split('?');
    var query_string = 'url=' + this_url[0];


    if(bpm_params.current_theme) query_string = query_string.concat('&current_theme='+bpm_params.current_theme);
    if(bpm_params.language) query_string = query_string.concat('&language='+bpm_params.language);
    if(bpm_params.admin_page) query_string = query_string.concat('&admin_page='+bpm_params.admin_page);

    bpm_start = Date.now();

    bpmcontext.bpm_open_help_widget('admin');

    jQuery('#bpm_admin_submit_logout_account_div').hide();
    jQuery('#bpm_admin_submit_create_account_div').hide();
    jQuery('#bpm_admin_submit_login_account_div').hide();
    jQuery('#bpm_admin_submit_lost_password_div').hide();
    jQuery('#bpm_dev_code_div').hide();


    if(bpm_params.has_logged_in == 1) {

        jQuery('.bpm_welcome_content').show();

        jQuery('#bpm_admin_submit_check_account_div').show();

        jQuery.getJSON('https://' + bpm_settings['bpm_server'] + '/' + bpm_settings['bpm_api'] + '/bpmcontext_wordpress.php?callback=?', query_string, function (result) {

            if (result) {

                if (result.LOGGEDIN == 1) {
                    //already logged in

                    bpm_settings['bpm_qtips'] = result.bpm_qtips;
                    bpm_settings['qtip_display'] = result.qtip_display;

                    bpmcontext.bpm_create_tips();

                    if(result.CURRENTCONTEXT) bpm_current_domain = result.CURRENTCONTEXT;
                    if(!bpm_get_string) bpm_get_string = '&domain='+bpm_current_domain;

                    var is_primary_admin = 0;

                    jQuery.each(result.dashboard.IMADMIN, function (index, value) {
                        if(value['admin_type'] == 2) is_primary_admin = 1;
                    });

                    if( is_primary_admin) jQuery('.bpm_product_action_button').show();

                    bpm_settings['bpm_login_status'] = 1;
                    jQuery('#bpm_admin_logged_in').show();
                    jQuery('#bpm_admin_create_account_title').text('Intranet Plus Account');
                    jQuery('#bpm_admin_create_account_logged_in').show();
                    jQuery('#bpm_admin_create_account_not_logged_in').hide();
                    jQuery('#bpm_admin_create_account_not_logged_in_form').hide();
                    jQuery('#bpm_header_not_logged_in').hide();
                    jQuery('#bpm_admin_create_account_has_logged_in').hide();

                    jQuery('#bpm_admin_submit_logout_account_div').show();
                    jQuery('#bpm_dev_code_div').show();
                    jQuery('#bpm_admin_submit_create_account_div').hide();
                    jQuery('#bpm_admin_submit_login_account_div').hide();
                    jQuery('#bpm_admin_submit_check_account_div').hide();
                    jQuery('#bpm_admin_submit_lost_password_div').hide();

                    if(result.RESETPASSWORD == 0) {
                        jQuery('.bpm_welcome_content').show();
                        jQuery('#bpm_admin_submit_go_dashboard_div').show();
                    }else{
                        jQuery('#bpm_settings_first_time_password').show();
                        jQuery( '.bpm_admin_notification').hide();
                    }

                    if(result.dashboard.ACCTMGR && ajaxurl){

                        var data = {
                            'action': 'bpm_update_product_info',
                            'value' : result.dashboard.ACCTMGR,
                            'imadmin': result.dashboard.IMADMIN,
                            'theme_info' : result.dashboard.THEMEINFO
                        };

                        jQuery.post(ajaxurl, data, function (result) {
                            if(result.updates){
                                location.reload();
                            }
                        });

                    }

                } else {
                    bpm_settings['bpm_login_status'] = 0;
                    jQuery('#bpm_admin_create_account_title').text('Intranet Plus Account');
                    jQuery('#bpm_admin_create_account_logged_in').hide();
                    jQuery('#bpm_admin_create_account_not_logged_in').show();
                    jQuery('#bpm_admin_create_account_not_logged_in_form').show();
                    jQuery('#bpm_admin_logged_in').hide();
                    jQuery('#bpm_header_not_logged_in').show();

                    jQuery('.bpm_welcome_content').show();
                    jQuery('#bpm_admin_submit_logout_account_div').hide();
                    jQuery('#bpm_dev_code_div').hide();
                    jQuery('#bpm_admin_submit_create_account_div').show();
                    jQuery('#bpm_admin_submit_login_account_div').show();
                    jQuery('#bpm_settings_first_time_no_account').show();
                    jQuery('#bpm_admin_submit_check_account_div').hide();
                    jQuery('#bpm_admin_submit_lost_password_div').show();

                }
            }
//            set_up_admin_settings_page();
        });
    }else{
        bpm_settings['bpm_login_status'] = 0;
        jQuery('#bpm_admin_create_account_title').text('Intranet Plus Account');
        jQuery('#bpm_admin_create_account_logged_in').hide();
        jQuery('#bpm_admin_create_account_not_logged_in').show();
        jQuery('#bpm_admin_create_account_not_logged_in_form').show();
        jQuery('#bpm_admin_logged_in').hide();
        jQuery('#bpm_header_not_logged_in').show();
        jQuery('.bpm_welcome_content').show();
        jQuery('#bpm_admin_submit_logout_account_div').hide();
        jQuery('#bpm_dev_code_div').hide();
        jQuery('#bpm_admin_submit_create_account_div').show();
        jQuery('#bpm_admin_submit_login_account_div').show();
        jQuery('#bpm_settings_first_time_no_account').show();
        jQuery('#bpm_admin_submit_check_account_div').hide();
        jQuery('#bpm_admin_submit_lost_password_div').show();
    }
});//end of open bpmadmin


