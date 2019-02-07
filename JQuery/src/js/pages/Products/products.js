import $ from 'jquery';
import {Table} from  '../../table';
import {getRequest,postRequest} from  '../../request';
import {Config} from '../../../../config';
import './products.css';

export async function renderProducts(permissions = []){
    let $menu = $('<div>');
    let $mainDiv = $('<div>');
    let $deletedDiv = $('<div>');

    let remove = ['id'];
    let data = await getRequest(Config.products,true);
    let mainTable = new Table($mainDiv,{
        data,
        button: 'delete',
        remove
    });

    let deletedTable = new Table($deletedDiv,{
        button: 'restore',
        remove
    });
    deletedTable.hide();

    let $showdeleteTable = $('<input>',{
        type:'button',
        value:"Show delete lines"
    })
    .click(()=>{
        deletedTable.changeVisible();
    })

    let $deleteAll = $('<input>',{
        type:'button',
        value:"Delete all"
    })
    .click(async ()=>{
            let data = deletedTable.data.map(element=>element.id);
            try{
                await postRequest(Config.deleteProducts,data,true);
                deletedTable.hide();
                deletedTable.clear();
                $showdeleteTable.detach();
                $deleteAll.detach();
            }catch(e){
                console.log(e);
            }
    })

    
    mainTable.addEventListener('buttonClick',switchData(mainTable,deletedTable));
    mainTable.addEventListener('buttonClick',()=>{
        if(deletedTable.dataLength == 1){
            $menu.append($showdeleteTable);
            if (permissions.includes('DeleteProducts')){
                $menu.append($deleteAll);
            }
        }
    });

    deletedTable.addEventListener('buttonClick',switchData(deletedTable,mainTable));
    deletedTable.addEventListener('buttonClick',()=>{
        if(deletedTable.dataLength == 0){
            $showdeleteTable.detach();
            $deleteAll.detach();
            deletedTable.hide();
        }
    });
    function switchData(from,to){
        return (data)=>{
            from.remove(data);
            to.push(data);
        }
    }

    return $menu.add(
        $('<div>',{class:'flex'})
        .append($mainDiv
            .add($deletedDiv)));
}