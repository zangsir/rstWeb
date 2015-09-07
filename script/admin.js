/**
 * Client side script for the administration interface. Verifies user input
 * and handles hidden fields to submit administrator actions for the Python
 * admin script.
 * Author: Amir Zeldes
*/


document.getElementById("file").style.top = "143px";
document.getElementById("file").style.left = "220px";
document.getElementById("file").style.position = "absolute";

function open_tab(tab_id){
	$(".tab").each(function(){this.style.zIndex = "0"});
	document.getElementById(tab_id).style.zIndex = "1";

	$(".tab_btn").removeClass("selected_tab");
	$("#" + tab_id + "_btn").addClass("selected_tab");

	if (tab_id =="import"){
	document.getElementById("file").style.zIndex = "10";
	}
	else{
	document.getElementById("file").style.zIndex = "0";
	}

}

function admin(action){
    switch(action){
        case "create_project":
            if (document.getElementById("new_project").value ==""){
                alert("No name entered for new project!");
                return;
            }
            document.getElementById("create_project").value = document.getElementById("new_project").value;
            document.getElementById("sel_tab").value = "project";
			break;
		case "upload":
		    if ($("#imp_project_select").length == 0){
                alert("No projects available! Please create a project to import into first");
                return;
		    }
            document.getElementById("sel_tab").value = "import";
            document.getElementById("imp_project").value = document.getElementById("imp_project_select").value;
            document.getElementById("import_file_type").value = document.getElementById("import_file_type_select").value;
			break;
		case "delete_doc":
            if ($('#doclist_select').length == 0) {
                alert("No documents available!");
                return;
            }
            var r = confirm("Really delete selected documents?");
            if (r == false) {
                return;
            }
		    docs_to_delete=build_from_select("doclist_select");
            if (docs_to_delete==""){
                alert("No documents selected for deletion!");
                return;
            }
            document.getElementById("doclist").value = docs_to_delete;
            document.getElementById("delete").value = "delete";
            document.getElementById("sel_tab").value = "docs";
			break;
		case "delete_user":
            if ($('#userlist_select').length == 0) {
                alert("No users available!");
                return;
            }
            var r = confirm("Really delete selected users?");
            if (r == false) {
                return;
            }
		    users_to_delete=build_from_select("userlist_select");
            if (users_to_delete==""){
                alert("No users selected for deletion!");
                return;
            }
            document.getElementById("userlist").value = users_to_delete;
            document.getElementById("delete_user").value = "delete_user";
            document.getElementById("sel_tab").value = "users";
			break;
		case "delete_project":
            if ($('#del_project_select').length == 0) {
                alert("No projects available!");
                return;
            }
		    projects_to_delete = build_from_select("del_project_select")
            if (projects_to_delete==""){
                alert("No projects selected for deletion!");
                return;
            }
            var r = confirm("Really delete selected projects? All associated documents will be deleted!");
            if (r == false) {
                return;
            }
            document.getElementById("del_project").value = projects_to_delete;
            document.getElementById("sel_tab").value = "project";
			break;
		case "assign_user":
            if ($('#userlist_select').length == 0) {
                alert("No users available!");
                return;
            }
            if ($('#doc_assign_select').length == 0) {
                alert("No documents available!");
                return;
            }
		    users_to_assign=build_from_select("userlist_select");
		    docs_to_assign=build_from_select("doc_assign_select");
            if (docs_to_assign==""){
                alert("No documents selected for deletion!");
                return;
            }
            if (users_to_assign==""){
                alert("No users selected for deletion!");
                return;
            }
            document.getElementById("assign_user").value = users_to_assign;
            document.getElementById("assign_doc").value = docs_to_assign;
            document.getElementById("sel_tab").value = "users";
			break;
		case "unassign_user":
            if ($('#assigned_user_sel').length == 0) {
                alert("No users available!");
                return;
            }
            if ($('#assigned_doc_sel').length == 0) {
                alert("No documents available!");
                return;
            }
		    user = $("#assigned_user_sel option:selected").text();
		    project_doc = $("#assigned_doc_sel option:selected").text();
            document.getElementById("unassign_user").value = user;
            document.getElementById("unassign_doc").value = project_doc;
            document.getElementById("sel_tab").value = "users";
			break;
		case "export":
            if ($('#doclist_select').length == 0) {
                alert("No documents available!");
                return;
            }
            if (document.getElementById("doclist_select").value ==""){
                alert("No documents selected for export!");
                return;
            }
            document.getElementById("export").value = "export";
		    docs_to_export=build_from_select("doclist_select");
            document.getElementById("doclist").value = docs_to_export;
            document.getElementById("sel_tab").value = "docs";
			break;
		case "create_user":
		    username = document.getElementById("username").value;
		    RESERVEDNAMES = {'config':1, 'default':1, 'temp':1, 'emails':1, 'pending':1, '_orig':1};
		    if (username in RESERVEDNAMES){
		        alert("User name cannot be: 'config', 'default', 'temp', 'emails', '_orig' or 'pending'");
                return;
		    }
		    realname = document.getElementById("realname").value;
		    if (realname.length<1){
		        alert("The real name cannot be empty!");
                return;
		    }
		    email = document.getElementById("email").value;
		    if (!(validateEmail(email))){
		        alert("E-mail address format is invalid!");
                return;
		    }
		    pass = document.getElementById("pass").value;
		    if (pass.length<5){
		        alert("Password must be at least 5 characters long!");
                return;
		    }
		    if (document.getElementById("chk_admin").checked){
                administrator = 3;
            }
            else {
                administrator = 0;
            }
		    document.getElementById("new_user_data").value = username+"/"+realname+"/"+email+"/"+pass+"/"+administrator;
            document.getElementById("sel_tab").value = "users";
			break;
		case "wipe":
            var r = confirm("Really wipe database? All documents will be deleted!");
            if (r == false) {
                return;
            }
            document.getElementById("wipe").value = "wipe";
            document.getElementById("sel_tab").value = "database";
		default:
			break;
	}
	document.getElementById("admin_form").submit();
}

function build_from_select(select_id){//creates semicolon separated value list from a select control

    output="";
    select_control = document.getElementById(select_id)
    for (i=0;i<select_control.length;i++){
        if (select_control.options[i].selected){
            output += select_control.options[i].value+";";
        }
    }
    return output.substring(0, output.length-1);

}

function update_assignments(){

    user_sel = document.getElementById("assigned_user_sel");
    user = $("#assigned_user_sel option:selected").text();
    doc_sel = $("#assigned_doc_sel");
    doc_sel.empty();
    for (i=0;i<user_sel.length;i++){
        if (document.getElementById("assigned_user_sel").options[i].text == user){
            docs = document.getElementById("assigned_user_sel").options[i].value.substring(0, document.getElementById("assigned_user_sel").options[i].value.length-1).trim().split(";");
            for (doc in docs){
                doc_sel.append('<option value="' + docs[doc] + '">' + docs[doc] + '</option>');
            }
        }
    }

}

function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}