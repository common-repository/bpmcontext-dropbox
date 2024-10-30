if(!bpm_plugin_hook) {
    var bpm_plugin_hook = [];
}

if(!bpm_settings) var bpm_settings = [];

var bpm_dropbox_hook =  {type:"bpm_attachment_section", function:"bpm_create_attachment_section_using_dropbox"};
bpm_plugin_hook.push(bpm_dropbox_hook);
bpm_dropbox_hook = {type:"bpm_on_page_display", function:"bpm_dropbox_create_message"};
bpm_plugin_hook.push(bpm_dropbox_hook);
bpm_dropbox_hook = {type:"bpm_on_settings_done", function:"bpm_dropbox_plugin_prep"};
bpm_plugin_hook.push(bpm_dropbox_hook);

function bpm_dropbox_plugin_prep() {

    if (bpm_settings['USE_DROPBOX'] == 1) {

        bpm_settings['bpm_folder_icon'] = 'fa fa-dropbox bpm-color-blue';
        bpm_settings['bpm_attachment_folder_name'] = ' ' + bpm_dropbox_trans_array['bpm_dropbox_lng_in_dropbox'];

    }else{
        bpm_settings['bpm_folder_icon'] = null;
        bpm_settings['bpm_attachment_folder_name'] = null;
    }
}


function bpm_dropbox_create_message(){

    var this_url = window.location.href;

    if(this_url.search('bpmcontext.com') > -1){
        bpm_settings['IS_BPM_SITE'] = 1;
    }else{
        bpm_settings['IS_BPM_SITE'] = 0;
    }

    if(bpm_settings['DROPBOXURL']) {
        if(bpm_settings['IS_BPM_SITE']){
            var dropbox_menu_item = '<li class=" bpm_ul_li text-left">';
            dropbox_menu_item = dropbox_menu_item.concat('<a id="bpm_acct_manager_dropbox_storage" class="bpm_nodecoration side-nav-item bpm_lng_dropbox" onclick="bpm_dropbox_account_manager();">Dropbox</a>');
            dropbox_menu_item = dropbox_menu_item.concat('</li>');

            jQuery('#bpm_acct_manager_storage').parent().after(dropbox_menu_item);
        }else if(bpm_settings['USERTYPE'] == 'admin') {
            var dropbox_message = bpm_dropbox_trans_array['bpm_dropbox_lng_dropbox_message_part1'] + ' <a style="text-decoration: underline;" href="' + bpm_settings['DROPBOXURL'] + '">' + bpm_dropbox_trans_array['bpm_dropbox_lng_dropbox_message_part2'] + '</a>.<br><br>' + bpm_dropbox_trans_array['bpm_dropbox_lng_dropbox_message_part3'] + '<br><br>' + bpm_dropbox_trans_array['bpm_dropbox_lng_dropbox_message_part4'];
            jQuery('#bpm_main_success_alert').after('<div data-alert class="alert-box info radius bpm_lng_page_loading" id="bpm_main_alert_dropbox" >' + dropbox_message + '</div>');
            jQuery('#bpm_main_alert_dropbox').show();
            jQuery('#bpm_acct_manager_storage').show();
            jQuery('#bpm_acct_manager_dropbox_storage').hide();
        }
    }else{
        bpm_dropbox_add_reveal();

        //setup account manager
        if(bpm_settings['USERTYPE'] == 'admin') {

            var dropbox_menu_item = '<li class=" bpm_ul_li text-left">';
            dropbox_menu_item = dropbox_menu_item.concat('<a id="bpm_acct_manager_dropbox_storage" class="bpm_nodecoration bpm_lng_dropbox bpm-account-manager button-discussion-plus bpm-hide" onclick="bpm_dropbox_account_manager();" style="display:none;">Dropbox</a>');
            dropbox_menu_item = dropbox_menu_item.concat('</li>');

            jQuery('#bpm_toolbar_admin_workspaces').parent().after(dropbox_menu_item);

        }
    }

}

function bpm_dropbox_account_manager(){

    jQuery('#bpm_admin_users_topbar').hide();

    jQuery('#bpm-admin-help-info').html('You can deactivate your Dropbox account here');

    var html_line = '';

    if (bpm_settings['USE_DROPBOX'] == 1) {

        html_line = html_line.concat('<div class="bpm-row">');
        html_line = html_line.concat('<div class="bpm-small-1 bpm-large-1 bpm-columns text-left">&nbsp;</div>');
        html_line = html_line.concat('<div class="bpm-small-10 bpm-large-10 bpm-columns text-left">Deactivate Dropbox</div>');
        html_line = html_line.concat('<div class="bpm-small-1 bpm-large-1 bpm-columns text-left">&nbsp;</div>');
        html_line = html_line.concat('</div><br>');

        html_line = html_line.concat('<div class="bpm-row">');
        html_line = html_line.concat('<div class="bpm-small-1 bpm-large-1 bpm-columns text-left">&nbsp;</div>');
        html_line = html_line.concat('<div class="bpm-small-10 bpm-large-10 bpm-columns text-left bpm_tutorial_text">You are currently using Dropbox to store your files and attachments.</div>');
        html_line = html_line.concat('<div class="bpm-small-1 bpm-large-1 bpm-columns text-left">&nbsp;</div>');
        html_line = html_line.concat('</div><br>');

        html_line = html_line.concat('<div class="bpm-row">');
        html_line = html_line.concat('<div class="bpm-small-1 bpm-large-1 bpm-columns text-left">&nbsp;</div>');
        html_line = html_line.concat('<div class="bpm-small-10 bpm-large-10 bpm-columns text-left bpm_tutorial_text">Click the Deactivate link below if you want to deactivate the connection between Dropbox and BPMContext.  You will then be using BPMContext storage instead of Dropbox storage.</div>');
        html_line = html_line.concat('<div class="bpm-small-1 bpm-large-1 bpm-columns text-left">&nbsp;</div>');
        html_line = html_line.concat('</div><br>');
        html_line = html_line.concat('<div class="bpm-row">');
        html_line = html_line.concat('<div class="bpm-small-1 bpm-large-1 bpm-columns text-left">&nbsp;</div>');
        html_line = html_line.concat('<div class="bpm-small-10 bpm-large-10 bpm-columns text-left bpm_tutorial_text">The following will occur after you confirm the deactivation:</div>');
        html_line = html_line.concat('<div class="bpm-small-1 bpm-large-1 bpm-columns text-left">&nbsp;</div>');
        html_line = html_line.concat('</div>');

        html_line = html_line.concat('<div class="bpm-row">');
        html_line = html_line.concat('<div class="bpm-small-1 bpm-large-1 bpm-columns text-left">&nbsp;</div>');
        html_line = html_line.concat('<div class="bpm-small-10 bpm-large-10 bpm-columns text-left">');

        html_line = html_line.concat('<ul>');
        html_line = html_line.concat('<li class=" bpm_tutorial_text">BPMContext will no longer have access to your Dropbox account.</li>');
        html_line = html_line.concat('<li class=" bpm_tutorial_text">Files placed in your Dropbox account will remain as they are currently and will no longer be accessible from BPMContext.</li>');
        html_line = html_line.concat('<li class=" bpm_tutorial_text">Your account will start using BPMContext file storage in Amazon S3.</li>');
        html_line = html_line.concat('<li class=" bpm_tutorial_text">Files in Dropbox will NOT be moved to BPMContext file storage.</li>');
        html_line = html_line.concat('</ul>');

        html_line = html_line.concat('</div>');
        html_line = html_line.concat('<div class="bpm-small-1 bpm-large-1 bpm-columns text-left">&nbsp;</div>');
        html_line = html_line.concat('</div>');

        html_line = html_line.concat('<div class="bpm-row" id="bpm_dropbox_confirm">');
        html_line = html_line.concat('<div class="bpm-small-1 bpm-large-1 bpm-columns text-left">&nbsp;</div>');
        html_line = html_line.concat('<div class="bpm-small-10 bpm-large-10 bpm-columns text-right"><a class="button bpm_nodecoration" onclick="bpm_dropbox_deactivate()">Deactivate</a></div>');
        html_line = html_line.concat('<div class="bpm-small-1 bpm-large-1 bpm-columns text-left">&nbsp;</div>');
        html_line = html_line.concat('</div>');

    }else{
        var dropbox_message = bpm_dropbox_trans_array['bpm_dropbox_lng_dropbox_message_part1'] + ' <a style="text-decoration: underline;" href="' + bpm_settings['DROPBOXURL'] + '">' + bpm_dropbox_trans_array['bpm_dropbox_lng_dropbox_message_part2'] + '</a>.<br><br>' + bpm_dropbox_trans_array['bpm_dropbox_lng_dropbox_message_part3'];

        html_line = html_line.concat('<br><div class="bpm-row">');
        html_line = html_line.concat('<div class="bpm-small-1 bpm-large-1 bpm-columns text-left">&nbsp;</div>');
        html_line = html_line.concat('<div class="bpm-small-10 bpm-large-10 bpm-columns text-left">Activate Dropbox</div>');
        html_line = html_line.concat('<div class="bpm-small-1 bpm-large-1 bpm-columns text-left">&nbsp;</div>');
        html_line = html_line.concat('</div><br>');
        html_line = html_line.concat('<div class="bpm-row">');
        html_line = html_line.concat('<div class="bpm-small-1 bpm-large-1 bpm-columns text-left">&nbsp;</div>');
        html_line = html_line.concat('<div class="bpm-small-10 bpm-large-10 bpm-columns text-left bpm_tutorial_text">You can use Dropbox storage instead of BPMContext storage.  '+dropbox_message+'</div>');
        html_line = html_line.concat('<div class="bpm-small-1 bpm-large-1 bpm-columns text-left">&nbsp;</div>');
        html_line = html_line.concat('</div><br>');

    }

    jQuery('#bpm_account_manager_content').html(html_line);
}

function bpm_dropbox_deactivate(){

    var html_line = '';

    html_line = html_line.concat('<div class="bpm-small-1 bpm-large-1 bpm-columns text-left">&nbsp;</div>');
    html_line = html_line.concat('<div class="bpm-small-10 bpm-large-10 bpm-columns text-right"><a class="button bpm_nodecoration" onclick="bpm_dropbox_deactivate_execute()">Confirm Deactivation</a>&nbsp;&nbsp;<a class="button bpm_nodecoration" onclick="bpm_dropbox_deactivate_cancel()">Cancel</a></div>');
    html_line = html_line.concat('<div class="bpm-small-1 bpm-large-1 bpm-columns text-left">&nbsp;</div>');

    jQuery('#bpm_dropbox_confirm').html(html_line);
}

function bpm_dropbox_deactivate_cancel(){

    var html_line = '';

    html_line = html_line.concat('<div class="bpm-small-1 bpm-large-1 bpm-columns text-left">&nbsp;</div>');
    html_line = html_line.concat('<div class="bpm-small-10 bpm-large-10 bpm-columns text-right"><a class="button bpm_nodecoration" onclick="bpm_dropbox_deactivate()">Deactivate</a></div>');
    html_line = html_line.concat('<div class="bpm-small-1 bpm-large-1 bpm-columns text-left">&nbsp;</div>');

    jQuery('#bpm_dropbox_confirm').html(html_line);

}

function bpm_dropbox_deactivate_execute(){

    var querystring = 'action=dropbox_deactivate&domain=' + bpm_current_domain;
    jQuery.getJSON('https://' + bpm_settings['bpm_server'] + '/api/bpmcontext_wordpress.php?callback=?', querystring, function (result) {

        if (result){
            jQuery('#bpm_dropbox_window').foundation('reveal', 'close');
            bpm_refresh_page_loading();
            bpm_load_page(bpm_get_string + '&action=bpmcontext', 1);
        }
    });

}


function bpm_create_attachment_section_using_dropbox(current_section) {

    if(bpm_settings['USE_DROPBOX']){

        if(!current_section) current_section = bpm_settings['bpm_current_section'];
        if(!bpm_settings['bpm_current_directory_' + current_section]) bpm_settings['bpm_current_directory_' + current_section] = 'root';

        //create all folder arrays for faster performance
        bpm_dropbox_create_folder_info(current_section);

        //creatr header menu
        var html_line = bpm_dropbox_create_header_menu(current_section);

        //create breadcrumb line
        var file_breadcrumbs = bpm_dropbox_create_breadcrumb(current_section, bpm_settings['bpm_current_directory_' + current_section]);

        //header of the object
        html_line = html_line.concat('<div class="bpm-row full-width">');
        html_line = html_line.concat('<div class="small-12 large-12 columns">'+file_breadcrumbs+'</div>');
        html_line = html_line.concat('</div>');

        //files area
        html_line = html_line.concat('<div id="bpm_file_area_'+current_section+'" style="min-height:12em;max-height: 18em;overflow-x: hidden;">');
        html_line = html_line.concat(bpm_dropbox_create_files(current_section, bpm_settings['bpm_current_directory_' + current_section]));

        html_line = html_line.concat('</div>');
        return html_line;
    }

    return;
}

function bpm_dropbox_create_folder_info(current_section){

    var content_array = bpm_settings['bpm_current_section_content_' + current_section]['root'];
    bpm_settings['bpm_current_section_content_'+current_section+'_root'] = content_array;

    if(content_array[0]) {
        if (content_array[0].mainpath) {
            var path_parts = content_array[0].mainpath.split('/');
            bpm_settings['bpm_current_section_breadcrumbs_' + current_section + '_root'] = [];
            bpm_settings['bpm_current_section_breadcrumbs_' + current_section + '_root'].push({
                breadcrumb: path_parts[path_parts.length - 1],
                fileref: 'root'
            });
        }

        jQuery.each(content_array, function (index, value) {
            if (value.is_dir) {
                bpm_dropbox_make_directory_info(current_section, jQuery.extend(true, [], value), jQuery.extend(true, [], bpm_settings['bpm_current_section_breadcrumbs_' + current_section + '_root']));
            }
        });
    }

}

function bpm_dropbox_make_directory_info(current_section, folder_content, breadcrumb_array ){

    //create breadcrumbs
    var path_info = folder_content.path.split('/');
    path_info = path_info[path_info.length - 1];
    breadcrumb_array.push({breadcrumb:path_info, fileref:folder_content.rev});
    bpm_settings['bpm_current_section_breadcrumbs_' + current_section + '_' + folder_content.rev] = breadcrumb_array;

    //create content for this directory
    var this_data_array = [];
    if(folder_content['contents']) this_data_array = jQuery.extend(true, [],folder_content['contents']);
    bpm_settings['bpm_current_section_content_'+current_section + '_' + folder_content.rev] = this_data_array;

    //check for subfolders and create that information
    if(folder_content['contents']) {
        jQuery.each(folder_content['contents'], function (index, value) {
            if (value.is_dir) {
                bpm_dropbox_make_directory_info(current_section, jQuery.extend(true, [],value) , jQuery.extend(true, [], breadcrumb_array));
            }
        });
    }
}

function bpm_dropbox_create_breadcrumb(current_section , current_level){

    var breadcrumb_array = bpm_settings['bpm_current_section_breadcrumbs_' + current_section + '_' + current_level];

    var breadcrumbs = '<ul class="breadcrumbs bpm-breadcrumbs" id="bpm_dropbox_breadcrumbs_'+current_section+'">';
    breadcrumbs = breadcrumbs.concat('<li class="bpm_ul_li"><span style="color:#333;font-weight:bold;font-size:1.5em;" class="fa fa-folder-o"></span></li>');

    jQuery.each(breadcrumb_array, function (index, value) {
        breadcrumbs = breadcrumbs.concat('<li class="bpm_ul_li "><a class="bpm_bold" onclick="bpm_dropbox_update_files(' + current_section + ',\'' + value.fileref + '\')" >' + value['breadcrumb'] + '</a></li>');
    });

    breadcrumbs = breadcrumbs.concat('</ul>');

    breadcrumbs = breadcrumbs.concat('<div data-alert class="alert-box success radius bpm_lng_page_loading bpm-hide" id="bpm_dropbox_status_'+current_section+'" ></div>');
    breadcrumbs = breadcrumbs.concat('<div data-alert class="alert-box info radius bpm_lng_page_loading bpm-hide" id="bpm_dropbox_alert_status_'+current_section+'" ></div>');

    return breadcrumbs;

}

function bpm_dropbox_create_files(current_section, current_level){

    var html_line = '';
    var files_array = bpm_settings['bpm_current_section_content_'+current_section + '_' + current_level];

    jQuery.each(files_array, function (index, value) {

        var no_actions = 0;

        if(value.mainpath){

        }else {
            if(value.path) {
                var file_parts = value.path.split('/');
                var file_actions = '<a href="#" data-dropdown="bpm_dropbox_file_options_' + value['rev'] + '" aria-controls="bpm_user_options_' + value['rev'] + '" data-options="align:left" aria-expanded="false" class="dropdown" style="width:10em;color:#008cba">'+bpm_dropbox_trans_array['bpm_dropbox_lng_actions']+'</a>';
                file_actions = file_actions.concat('<ul id="bpm_dropbox_file_options_' + value['rev'] + '" data-dropdown-content class="f-dropdown" aria-hidden="true">');
                var file_name = '';
                if (value['is_dir']) {
                    file_actions = file_actions.concat('<li><a style="white-space: nowrap" onclick="bpm_dropbox_file_button(' + current_section + ',5,\'' + value['rev'] + '\')">'+bpm_dropbox_trans_array['bpm_dropbox_lng_rename_folder']+'</a></li>');
                    no_actions = 1;
                    if (value['contents']) {
                        if (!value['contents'].length) {
                            file_actions = file_actions.concat('<li><a style="white-space: nowrap" onclick="bpm_dropbox_file_button(' + current_section + ',4,\'' + value['rev'] + '\')">' + bpm_dropbox_trans_array['bpm_dropbox_lng_delete_folder'] + '</a></li>');
                            no_actions = 1;
                        }
                    }

                    file_name = '<a onclick="bpm_dropbox_update_files(' + current_section + ',\'' + value['rev'] + '\')" style="color:#008cba">' + file_parts[file_parts.length - 1] + '</a>';

                } else {
                    if(bpm_settings['USERTYPE'] == 'admin') {
                        no_actions = 1;
                        file_actions = file_actions.concat('<li><a style="white-space: nowrap" onclick="bpm_dropbox_file_button(' + current_section + ',6,\'' + value['rev'] + '\')">' + bpm_dropbox_trans_array['bpm_dropbox_lng_admin_delete'] + '</a></li>');
                    }

                    file_name = '<a href="https://'+bpm_settings['bpm_server']+'/api/get_dropbox_file.php?file_path=' + value.path + '" style="color:#008cba" target="_blank">' + file_parts[file_parts.length - 1] + '</a>';

                }
                file_actions = file_actions.concat('</ul>');

                if(no_actions == 0){
                    file_actions = '';
                }
                var icon = '<img src="' + bpm_dropbox_params.images_dir + 'dropbox_16x16/' + value.icon + '.gif">';
                var date = new Date(value.modified);
                var modified_time = date.toLocaleDateString() + ' ' + date.toLocaleTimeString(navigator.language, {
                        hour: '2-digit',
                        minute: '2-digit'
                    });

                html_line = html_line.concat('<div class="bpm-row full-width">');
                html_line = html_line.concat('<div class="small-7 large-7 columns">&nbsp;' + icon + ' ' + file_name + '</div>');
                html_line = html_line.concat('<div class="small-3 large-3 columns">' + modified_time + '</div>');
                html_line = html_line.concat('<div class="small-2 large-2 columns text-right">' + file_actions + '&nbsp;</div>');
                html_line = html_line.concat('</div>');
            }
        }
    });


    if (html_line.length == 0 && bpm_page_status == 0) {
        html_line = html_line.concat(bpmcontext.bpm_text_placeholder(3));
    }

    return html_line;

}

function bpm_dropbox_get_subdir(current_section){

    var sub_dir = '';

    if(bpm_settings['bpm_current_directory_' + current_section] != 'root'){
        var breadcrumb_array = bpm_settings['bpm_current_section_breadcrumbs_' + current_section + '_' + bpm_settings['bpm_current_directory_' + current_section]];

        jQuery.each(breadcrumb_array, function (index, value) {
            if(index > 0){
                sub_dir = sub_dir.concat(value['breadcrumb'] + '/');
            }
        });
    }

    return sub_dir;
}

function bpm_dropbox_file_button(current_section , selection, file_id){

    jQuery('#bpm_dropbox_alert_status_'+current_section).hide();

    switch(selection){
        case 1:
            //add files
            bpm_dropbox_show_add_files(current_section);
            break;
        case 2:
            //show add folder
            jQuery('#bpm_button_new_folder_'+current_section).hide();
            jQuery('#bpm_file_add_folder_form_'+current_section).show();
            document.getElementById('bpm_add_folder_'+current_section).focus();

            jQuery('#bpm_add_folder_'+current_section).on('keydown', function(e){
                if(e.which == 13){
                    bpm_dropbox_file_button(current_section , 3, file_id);
                }
            });
            break;
        case 3:
            //add folder
            var sub_directory = bpm_dropbox_get_subdir(current_section);
            var post_text = jQuery('#bpm_add_folder_'+current_section).val();
            var querystring = bpm_get_string + "&action=dropbox_create_folder&" + "&sectionid=" + current_section + "&sub_dir_name=" + sub_directory + post_text;
            jQuery('#bpm_dropbox_status_'+current_section).text(bpm_dropbox_trans_array['bpm_dropbox_lng_adding_folder']+ '...').show();
            jQuery('#bpm_section_top_bar_bpm_acc_'+current_section).hide();
            bpm_dropbox_exec_json_request(current_section, querystring);
            break;
        case 4:
            //admin delete folder
            var sub_directory = bpm_dropbox_get_subdir(current_section);
            var full_path = bpm_dropbox_get_path(current_section, file_id);
            var dir_parts = full_path.path.split('/');
            full_path = dir_parts[dir_parts.length - 1];
            var querystring = bpm_get_string + "&action=dropbox_delete_folder&" + "&sectionid=" + current_section + "&sub_dir_name=" +  sub_directory + full_path;
            jQuery('#bpm_dropbox_status_'+current_section).text(bpm_dropbox_trans_array['bpm_dropbox_lng_deleting_folder']+ '...').show();

            bpm_dropbox_exec_json_request(current_section, querystring);

            break;
        case 5:
            //rename folder
            var file_info = bpm_dropbox_get_path(current_section, file_id);
            var dir_parts = file_info.path.split('/');
            file_info = dir_parts[dir_parts.length - 1];
            jQuery('#bpm_rename_folder_'+current_section).val(file_info);
            jQuery("#bpm_section_top_bar_bpm_acc_" + current_section).show();
            jQuery('#bpm_button_new_folder_'+current_section).hide();
            jQuery('#bpm_file_rename_folder_form_'+current_section).show();
            jQuery('#bpm_file_add_folder_form_'+current_section).hide();

            document.getElementById('bpm_rename_folder_'+current_section).focus();

            bpm_settings['current_file_id'] = file_id;

            jQuery('#bpm_rename_folder_'+current_section).on('keydown', function(e){
                if(e.which == 13){
                    bpm_dropbox_file_button(current_section , 10, file_id);
                }
            });

            break;
        case 10:
            //rename folder action
            if(!file_id) file_id = bpm_settings['current_file_id'];
            var move_to_dir = jQuery('#bpm_rename_folder_'+current_section).val();
            var move_to = '';

            var move_from = bpm_dropbox_get_path(current_section, file_id);

            move_from = move_from.path;
            var dir_parts = move_from.split('/');

            jQuery.each(dir_parts, function (index, value) {
                if(index < dir_parts.length - 1) {
                    move_to = move_to.concat(value + '/');
                }
            });
            move_to = move_to.concat(move_to_dir);

            var querystring = bpm_get_string + "&action=dropbox_rename_folder&" + "&sectionid=" + current_section + "&move_to=" + move_to + '&move_from=' + move_from;

            jQuery('#bpm_dropbox_status_'+current_section).text(bpm_dropbox_trans_array['bpm_dropbox_lng_renaming_folder']+ '...').show();
            jQuery('#bpm_section_top_bar_bpm_acc_'+current_section).hide();

            bpm_dropbox_exec_json_request(current_section, querystring);

            break;
        case 6:
            //show delete confirmation
            var post_text = bpm_dropbox_get_path(current_section, file_id);
            var dir_parts = post_text.path.split('/');
            post_text = dir_parts[dir_parts.length - 1];
            var html_line = '';
            html_line = html_line.concat('<div class="bpm-row">');
            html_line = html_line.concat('<div class="small- large-9 columns">&nbsp;Confirm delete of ' + post_text+'</div>');
            html_line = html_line.concat('<div class="small-3 large-3 columns text-right"><a onclick="bpm_dropbox_file_button('+current_section +', 12, \''+file_id+'\');">'+bpm_dropbox_trans_array['bpm_dropbox_lng_yes']+'</a>');
            html_line = html_line.concat('&nbsp;&nbsp;<a onclick="bpm_dropbox_file_button('+current_section +', 13, \''+file_id+'\');">'+bpm_dropbox_trans_array['bpm_dropbox_lng_cancel']+'</a></div>');
            html_line = html_line.concat('</div>');

            jQuery('#bpm_dropbox_alert_status_'+current_section).html(html_line ).show();
            break;
        case 12:
            //admin delete file
            var post_text = bpm_dropbox_get_path(current_section, file_id);
            post_text = post_text.path;
            var querystring = bpm_get_string + "&action=dropbox_delete_file&" + "&sectionid=" + current_section + "&sub_dir_name=" + post_text;
            jQuery('#bpm_dropbox_status_'+current_section).text(bpm_dropbox_trans_array['bpm_dropbox_lng_deleting_file']+ '...').show();
            jQuery('#bpm_dropbox_alert_status_'+current_section).hide();

            bpm_dropbox_exec_json_request(current_section, querystring);

            break;
        case 13:
            //cancel action
            jQuery('#bpm_dropbox_alert_status_'+current_section).hide();
            break;
        case 8:
            //move file

            break;
        case 9:
            //view versions

            break;
        case 11:
            jQuery("#bpm_section_top_bar_bpm_acc_" + current_section).hide();
            jQuery('#bpm_button_new_folder_'+current_section).show();
            jQuery('#bpm_file_rename_folder_form_'+current_section).hide();
            jQuery('#bpm_file_add_folder_form_'+current_section).hide();
            break;
    }
}

function bpm_dropbox_get_file_folder_name(current_section, file_id){

    var this_response = '';
    var files_array = bpm_settings['bpm_current_section_content_' + current_section + '_' + bpm_settings['bpm_current_directory_' + current_section]];

    jQuery.each(files_array, function (index, value) {
        if(!value.mainpath) {
            if(value.rev === file_id) this_response = value;
            if(this_response.length){
                return false;
            }
        }
    });

    return this_response;
}

function bpm_dropbox_get_path(current_section, file_id){

    var this_response = [];
    var files_array = bpm_settings['bpm_current_section_content_' + current_section + '_' + bpm_settings['bpm_current_directory_' + current_section]];

    jQuery.each(files_array, function (index, value) {
        if(!value.mainpath) {
            if(value.rev === file_id) this_response = value;
            if(this_response.length){
                return false;
            }
        }
    });

    return this_response;
}

function bpm_dropbox_create_header_menu(current_section){

    var html_line = '';
    html_line = html_line.concat('<div id="bpm_section_top_bar_bpm_acc_'+current_section+'" class="bpm_section_top_bar_bpm_acc_all" style="display: none;">');
    html_line = html_line.concat('<nav class="top-bar" data-topbar role="navigation">');
    html_line = html_line.concat('<section class="top-bar-section">');
    html_line = html_line.concat('<ul class="right">');
    html_line = html_line.concat('<li class="active"><a style="text-decoration: none;" onClick="bpm_dropbox_file_button('+current_section+',1);" class="bpm_lng_add_files">'+bpm_dropbox_trans_array['bpm_dropbox_lng_add_files']+'</a></li>');
    html_line = html_line.concat('</ul>');
    html_line = html_line.concat('<ul class="left">');
    html_line = html_line.concat('<li class="bpm_ul_li"><a style="text-decoration: none;" id="bpm_button_new_folder_'+current_section+'" onClick="bpm_dropbox_file_button('+current_section+',2);" class="bpm_lng_new_folder">'+bpm_dropbox_trans_array['bpm_dropbox_lng_new_folder']+'</a></li>');
    html_line = html_line.concat('<li class="has-form" style="display:none" id="bpm_file_add_folder_form_'+current_section+'">');
    html_line = html_line.concat('<div class="bpm-row ">');
    html_line = html_line.concat('<div class="bpm-large-5 bpm-small-5 bpm-columns"><input class="bpm_add_folder_input" type="text" style="width:100%" id="bpm_add_folder_'+current_section+'"  placeholder="'+bpm_dropbox_trans_array['bpm_dropbox_lng_folder_name']+'..."></div>');
    html_line = html_line.concat('<div class="bpm-large-7 bpm-small-7 bpm-columns"><a onclick="bpm_dropbox_file_button('+current_section+',3)" class="button bpm_lng_create" style="text-decoration: none;white-space: nowrap">Create</a>&nbsp;<a onclick="bpm_dropbox_file_button('+current_section+',11)" class="button bpm_lng_rename" style="text-decoration: none;white-space: nowrap">'+bpm_dropbox_trans_array['bpm_dropbox_lng_cancel']+'</a></div>');
    html_line = html_line.concat('</div>');
    html_line = html_line.concat('</li>');
    html_line = html_line.concat('<li class="has-form bpm-hide" id="bpm_file_rename_folder_form_'+current_section+'">');
    html_line = html_line.concat('<div class="bpm-row ">');
    html_line = html_line.concat('<div class="bpm-large-5 bpm-small-5 bpm-columns"><input class="bpm_rename_folder_input" maxlength="15" type="text" style="width:100%" id="bpm_rename_folder_'+current_section+'"  placeholder="Rename folder..."></div>');
    html_line = html_line.concat('<div class="bpm-large-7 bpm-small-7 bpm-columns"><a onclick="bpm_dropbox_file_button('+current_section+',10)" class="button bpm_lng_rename" style="text-decoration: none;white-space: nowrap">Rename</a>&nbsp;<a onclick="bpm_dropbox_file_button('+current_section+',11)" class="button bpm_lng_rename" style="text-decoration: none;white-space: nowrap">'+bpm_dropbox_trans_array['bpm_dropbox_lng_cancel']+'</a></div>');
    html_line = html_line.concat('</div>');
    html_line = html_line.concat('</li>');

    html_line = html_line.concat('</ul>');
    html_line = html_line.concat('</section>');
    html_line = html_line.concat('</nav>');
    html_line = html_line.concat('</div>');

    return html_line;
}

function bpm_dropbox_show_add_files(current_section){

    var html_line = '';
    var file_list = [];
    var this_guid = bpmcontext.bpm_guid();
    var sub_directory = bpm_dropbox_get_subdir(current_section);

    jQuery('#bpm_file_uploading_no_talat_alert').hide();
    jQuery('#bpm_file_uploading_alert').hide();
    jQuery('#bpm_upload_files').hide();
    jQuery('#bpm_upload_form_details').hide();
    jQuery('#bpm_dropbox_upload_form').html('');

    jQuery('#bpm_dropbox_window').foundation('reveal', 'open');
    var querystring = bpm_get_string + "&action=get_file_auth";
    jQuery.getJSON('https://' + bpm_settings['bpm_server'] + '/'+bpm_settings['bpm_api']+'/bpmcontext_wordpress.php?callback=?', querystring, function (result) {

        if (result) {
            html_line = html_line.concat('<form action="https://s3.amazonaws.com/bpm-inbound/" method="POST" enctype="multipart/form-data" class="dropzone bpm_dropzone" id="bpm_dropzone" style="max-height:300px;overflow: auto;">');
            html_line = html_line.concat('<input type="hidden" name="key" value="${filename}-' + this_guid + '">');

            if(result.FILEAUTH) {
                jQuery.each(result.FILEAUTH['inputs'], function (index, value) {
                    html_line = html_line.concat('<input type="hidden" name="' + index + '" value="' + value + '">');
                });
            }

            html_line = html_line.concat('</form>')

            jQuery('#bpm_dropbox_upload_form').html(html_line);

            var myDropzone = new Dropzone("#bpm_dropzone", {
                autoProcessQueue: false,
                parallelUploads: 101,
                maxFiles: 100,
                addRemoveLinks: true,
                dictDefaultMessage: '<div class="text-center" style="width:100%">'+bpm_trans_array['bpm_lng_click_files']+'</div>'
            });

            myDropzone.on("complete", function (file) {
                file_list.push(file['name']);
            });

            myDropzone.on("addedfile", function () {
                jQuery('#bpm_dropbox_upload_files').show();
            });

            myDropzone.on("removedfile", function (file) {
                var index = file_list.indexOf(file['name']);
                if (index >= 0) {
                    file_list.splice( index, 1 );
                }
                if (myDropzone.getQueuedFiles().length == 0) {
                    jQuery('#bpm_dropbox_upload_files').hide();
                }
            });

            myDropzone.on("queuecomplete", function () {

                //close window for file uploads
                jQuery('#bpm_dropbox_window').foundation('reveal', 'close');
                jQuery('#bpm_dropbox_status_'+current_section).text(bpm_dropbox_trans_array['bpm_dropbox_lng_files_uploading']+ '...').show();
                var send_files = '';
                if (file_list.length > 0) {
                    jQuery(file_list).each(function (index, value) {
                        send_files = send_files.concat('&files[]=' + encodeURIComponent(value));
                    });
                }
                var querystring = bpm_get_string + '&sectionid=' + current_section + '&action=upload_dropbox_files' + send_files + '&fileid=' + this_guid + '&subdir=' + sub_directory;
                bpm_dropbox_exec_json_request(current_section, querystring);

            });

            //assign handler to button
            jQuery("#bpm_dropbox_upload_files").click(function () {
                    jQuery('#bpm_file_uploading_no_talat_alert').hide();
                    jQuery('#bpm_file_uploading_alert').show();
                    jQuery('#bpm_dropbox_upload_files').hide();
                    myDropzone.processQueue();
            });
        }
    });
}

function bpm_dropbox_exec_json_request(current_section, querystring){

    jQuery.getJSON('https://' + bpm_settings['bpm_server'] + '/'+bpm_settings['bpm_api']+'/bpmcontext_wordpress.php?callback=?', querystring, function (result) {

        if (result.CONTENT.FILELIST) {
            //update file list
            bpm_settings['bpm_current_section_content_'+current_section]['root'] = result.CONTENT.FILELIST;
            bpm_dropbox_update_files(current_section );

            //close window for file uploads
            jQuery('#bpm_dropbox_window').foundation('reveal', 'close');

            //hide alerts and testfields
            jQuery('.bpm_add_folder_input').val('');
            jQuery('#bpm_button_new_folder_'+current_section).show();
            jQuery('#bpm_file_add_folder_form_'+current_section).hide();
            jQuery('#bpm_dropbox_status_'+current_section).hide();

            //update changelog
            if (result.CHANGELOG) {
                bpmcontext.bpm_create_change_log(result);
            }
            if (result.CONTENT.TIMEARRAY) {
//                console.log(result.CONTENT.TIMEARRAY);
            }
        }
    });

}

function bpm_dropbox_update_files( current_section , current_level){
    if(current_level) bpm_settings['bpm_current_directory_' + current_section] = current_level;
    var html_line = bpm_create_attachment_section_using_dropbox(current_section);
    jQuery('#acc_' + current_section).html(html_line);
}

function bpm_dropbox_add_reveal(){
    var html_line = '';

    html_line = html_line.concat('<div id="bpm_dropbox_window" class="reveal-modal tiny" data-reveal aria-labelledby="bpm_dropbox_title" aria-hidden="true" role="dialog">');
    html_line = html_line.concat('<h2 id="bpm_dropbox_title" class="bpm-header-2 bpm_lng_upload_documents_to_dropbox">'+bpm_dropbox_trans_array['bpm_dropbox_lng_upload_to_dropbox']+'</h2>');
    html_line = html_line.concat('<div id="bpm_dropbox_content" style="margin-top:5px;height:25em">');
    html_line = html_line.concat('<div class="bpm-row">');
    html_line = html_line.concat('<div class="bpm-large-12 bpm-small-12 bpm-columns"><div id="bpm_dropbox_upload_form" style="height:100%;"></div></div>');
    html_line = html_line.concat('</div><br>');
    html_line = html_line.concat('<div class="bpm-row">');
    html_line = html_line.concat('<div class="bpm-large-12 bpm-small-12 bpm-columns text-center">'+bpm_dropbox_trans_array['bpm_dropbox_lng_upload_message']+'</div>');
    html_line = html_line.concat('</div><br>');
    html_line = html_line.concat('<div class="bpm-row">');
    html_line = html_line.concat('<div class="bpm-large-12 bpm-small-12 bpm-columns text-right">');
    html_line = html_line.concat('<a id="bpm_dropbox_upload_files" class="button bpm-small bpm_lng_upload" style="text-decoration: none;display:none;">'+bpm_dropbox_trans_array['bpm_dropbox_lng_upload']+'</a>');
    html_line = html_line.concat('<div data-alert class="alert-box success radius bpm_lng_files_uploading" id="bpm_dropbox_file_uploading_alert" style="display:none;margin-left:1em;margin-right:1em;">'+bpm_dropbox_trans_array['bpm_dropbox_lng_files_uploading']+'...</div>');
    html_line = html_line.concat('</div>');
    html_line = html_line.concat('</div>');
    html_line = html_line.concat('</div>');
    html_line = html_line.concat('<a class="close-reveal-modal bpm_nodecoration" aria-label="Close">&#215;</a>');
    html_line = html_line.concat('</div>');

    jQuery('#bpm_main_content').prepend(html_line);
}