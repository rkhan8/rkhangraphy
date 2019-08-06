function filterSelection(title, position){

    var colum = $('.column');
    var filter = $('.filter');



    $.each(colum, function(index, el){

            var _this = $(el);

            if (title != "all"){
                if(!_this.hasClass(title)){
                    // _this_filter.removeClass("active");
                    _this.hide("slow");
                }
                else{
                    // _this_filter.addClass("active");
                    if(filter.hasClass(position)){
                        filter.addClass("active");
                    }
                    _this.show("slow");
                }
            }else{
                _this.show("slow");
                // _this_filter.addClass("active");

            }

        
        
        

    })

    
    
    
}