import jQuery from 'jquery';
(function( $ ){

    function init(options){
        let $this = $(this);
        let data = $this.data('settings');

        if ( ! data ) {
            $(this).data('settings', {
                listEvents : {},
                $Data : [],
                currentKeys : [],
                $place: $this,
                $table: $('<table>',{ class: 'table table-bordered' }).appendTo($this),
                data: options.data ? options.data : [],
                remove: options.remove,
                button: options.button
            });
        }
    }
    function show(){
        let {$place, $table} = $(this).data('settings');
        $place.append($table);
    }
    function hide(){
        let {$table} = $(this).data('settings');
        $table.detach();
    }
    function push(element){
        let {data,$table} = $(this).data('settings');
        data.push(element);
        if(data.length == 1 && $table.find('thead').length == 0){
            render()
        } else {
            rerenderDataPush(element);
        }
    }
    function remove(element){
        let {data} = $(this).data('settings');
        let indexElement = data.indexOf(element);
        data.splice(indexElement,1);
        rerenderDataRemove(indexElement);
    }
    function changeVisible(){
        let {$table} = $(this).data('settings');
        if($table.parent().length > 0){
            hide.bind(this)();
        }else{
            show.bind(this)();
        }
    }
    function update(){
        let {data} = $(this).data('settings')
        for(let element of data){
            let check = true;
            for(let key in element){
                if(element[key] !== oldData[key]){
                    check = false;
                    break;
                }
            }
            if(check){
                remove.bind(this)(element);
                push.bind(this)(newdata);
                break;
            }
        }
    }
    function clear(){
        let {data} = $(this).data('settings');
        for(let element of data){
            remove.bind(this)(element);
        }
    }
    let methods = {
        init : function(options){
           return this.each(function() {
            init.bind(this)(options);
           });
        },
        show : function() {
           return this.each(show);
        },
        hide : function() {
            return this.each(hide)
        },
        changeVisible : function(){
            return this.each(changeVisible)
        },
        push : function(element){
            return this.each(function(){
                push.bind(this)(element);
            })
        },
        remove: function(element){
            return this.each(function(){
                remove.bind(this)(element);
            })
        },
        update: function(){
            return this.each(update)
        },
        clear: function(){
            return this.each(clear)
        },
        destroy : function( ) {
            return this.each(function(){
    
            var $this = $(this),
                data = $this.data('settings');
    
            
            $(window).unbind('.settings');
            data.$table.remove();
            $this.removeData('settings');
            })
        },
    };
    function render(){
        let {data} = $(this).data('settings');
        if(data.length == 0){
            return;
        }
        dataAalysis.bind(this)(data);
        setDefaultValues.bind(this)();
        createThead.bind(this)();
        createTbody.bind(this)(data);
    }
    function dataAalysis(data){
        let defautKeys = Object.keys(data[0]);
        for(let i = 1 ; i < data.length ; ++i){
            for(let [index,key] of Object.keys(data[i]).entries())
                if(defautKeys[index] !== key){
                    throw "Data not supported. Data is not of the same type"
                }
        }
    }
    function setFilter(setter){
        let {filter} = $(this).data('settings');
        filter = setter(filter);
        rerenderFilterData.bind(this)();
    }

    $.fn.table = function( method ) {
      
      if ( methods[method] ) {
        return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
      } else if ( typeof method === 'object' || ! method ) {
        return methods.init.apply( this, arguments );
      } else {
        $.error( 'Метод с именем ' +  method + ' не существует для jQuery.tooltip' );
      }    
    
    };
    
  })( jQuery );