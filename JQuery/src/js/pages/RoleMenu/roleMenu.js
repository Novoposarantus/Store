import $ from 'jquery';
import {Config} from '../../../../config';
import {getRequest,postRequest} from '../../request';
import './roleMenu.css';

export async function renderRoleMenu(){
    let $newRoleMenu = $('<input>', {
        class:'form-control', 
        type:'text',
        placeholder: "Write new role name"
    })
    .css({display:'block'});
    let $permissionList = $('<div>')
    let $roleList = $('<div>' , { class:'flex' });
    let $buttonsBox = $('<div>' ,{ class:'flex buttons' });
    let $newRoleButton = $('<input>' , { 
        class:'btn btn-success', 
        type:'button',
        value:'Save new role' 
    });
    let $submitButton = $('<input>' , { 
        class:'btn btn-success', 
        type:'button',
        value:'Submit' 
    });
    let $deleteButton = $('<input>' , { 
        class:'btn btn-success', 
        type:'button',
        value:'Delete' 
    });

    let $place = $newRoleMenu
                .add($roleList)
                .add($buttonsBox)
                .add($buttonsBox);

    let allPermissions = await getRequest(Config.getAllPermissions,true);
    let allRoles = await getRequest(Config.getAllRoles,true);
    let form = {};
    let choosedRole = null;
    let newRoleName = '';

    for(let permission of allPermissions){
        form[permission.name] = false;
        $('<label>' , { class:'block' })
        .html(' ' + permission.name)
        .prepend(
            $('<input>' , { type:'checkbox' , name:permission.name })
            .click(()=>{
                form[permission.name] = !form[permission.name];
            })
        )
        .appendTo($permissionList);
    }

    for(let role of allRoles){
        $roleList.append(createRoleInput(role));
    }

    $newRoleButton.click(async ()=>{
        if(!newRoleName){
            return;
        }
        try{
            let role = await postRequest(Config.saveRole,{roleName:newRoleName},true);
            $roleList.append(createRoleInput(role));
            $newRoleMenu.val('');
            $newRoleButton.detach();
        }catch(e){
            console.log(e);
        }
    })
    $newRoleMenu.on('input',event=>{
        if(event.target.value == '') {
            $newRoleButton.detach();
        }else{
            $newRoleButton.appendTo($buttonsBox);
        }
        newRoleName = event.target.value;
    })
    $submitButton.click(async ()=>{
        let newPermissions = [];
        for(let [permission,cheked] of Object.entries(form)){
            if(cheked){
                newPermissions.push(permission);
            }
        }
        if(newPermissions.length == choosedRole.permissions.length){
            let permissionsChange = false;
            for(let permission of newPermissions){
                if(!choosedRole.permissions.includes(permission)){
                    permissionsChange = true;
                    break;
                }
            }
            if(!permissionsChange) return;
        }
        let newRole = {
            ...choosedRole,
            permissions:newPermissions
        }
        try{
            await postRequest(Config.updateRole,newRole,true);
            let rolePlace = $roleList.find(`#role${newRole.roleId}`);
            rolePlace.after(createRoleInput(newRole));
            rolePlace.detach();
        }catch(e){
            console.log(e);
        }
    })

    $deleteButton.click(async ()=>{
        if(!choosedRole) {
            return;
        }
        try {
            await postRequest(Config.deleteRole,{roleName:choosedRole.name},true);
            $roleList.find(`#role${choosedRole.roleId}`).detach();
            $permissionList.detach();
            $submitButton.detach();
            $deleteButton.detach();
        }
        catch(e) {
            console.log(e);
        }
    })

    function createRoleInput(role){

        return $('<input>', {
            type:'button', 
            class:'btn', 
            value:role.name, 
            id:'role' + role.roleId
        })
        .click((_event)=>{
            choosedRole = role;
            if($permissionList.parent().length == 0){
                $permissionList.insertAfter($roleList);
            }
            $permissionList.find('input')
            .each((_index,element)=>{
                let $element = $(element);
                let permissionName = $element.attr('name');
                let checked = role.permissions.includes(permissionName);
                $element.prop('checked',checked);
                form[permissionName] = checked;
            })
            $submitButton.appendTo($buttonsBox);
            $deleteButton.appendTo($buttonsBox);
        })
    }
    return $place;
}