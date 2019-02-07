import $ from 'jquery';
import {Table} from '../../table';
import {getRequest,postRequest} from '../../request';
import {Config} from '../../../../config';
import './userMenu.css';

export async function renderUserMenu(){
    let $tablePlace = $('<div>');
    let $roleChoose = $(
        `<div>
                <select class="form-control"></select>
                <div class="flex buttons">
                    <button class="btn btn-success" id="save">Save</button>
                    <button class="btn btn-success" id="back">Back</button>
                <div>
            </div>
        `
    )

    let data = await getRequest(Config.getAllUsers,true);
    let choosedUser = null;
    let choosedRole = null;

    let table = new Table($tablePlace,{
        data,
        button: 'select'
    });

    let $select = $roleChoose.find('select').change((event)=>{
        choosedRole = event.target.value;
    })

    $roleChoose.find('#save').click(async ()=>{
        if(choosedUser && choosedRole && choosedRole !== choosedUser.roleName){
            let newUser = {
                ...choosedUser,
                roleName: choosedRole
            }
            await postRequest(Config.updateUser,newUser,true);
            table.update(choosedUser,newUser);
        }
        back();
    })

    $roleChoose.find('#back').click(back);

    table.addEventListener('buttonClick',async (event)=>{
        table.hide();
        choosedUser = event;
        $select
        .empty()
        .append((await getRequest(Config.getAllRoles,true)).reduce((prev, current)=>{
            return prev.add($('<option>',{value:current.name}).html(current.name));
        },$()))
        .val(event.roleName);
        $tablePlace.after($roleChoose);
    })
    function back(){
        choosedRole = null;
        choosedUser = null;
        $roleChoose.detach();
        table.show();
    }
    return $tablePlace;
}