function filterSelection(title, position){

    var colum = $('.column');
    var filter = $('.'+position+'');
    var button = $('button');

    //reset filter selector
    button.removeClass('active');

    $.each(colum, function(index, el){

            var _this = $(el);

            if (title != "all"){
                if(!_this.hasClass(title)){
                    _this.hide("slow");
                }else{
                    _this.show("slow");
                }
            }else{
                _this.show("slow");
            }

            //set selector
            if(filter.hasClass(position)){
                filter.addClass('active');
            }

        
        
        

    })

    
    
    
}