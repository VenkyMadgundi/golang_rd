$(function(){
    $("#first_marque").click(function(){
       var ba_user_id = $("#brand_ambassador_id").val();
        $.get("/marques/add_marque",{ba_user_id:ba_user_id});
        return false;
    });
   setupMarqueSelectors();
});


function setupMarqueSelectors(){
    // hide alla the plus signs and then show the last one.
    $(".marque-selector #add_marque").css("display", "none");
    $(".marque-selector").last().children("#add_marque").toggle();


    // set up brand drop down AJAX call
    $(".marque-selector").children("#brand_id_brand_id").each(function() {
        $(this).change(function(){
            $.get("/marques/brand_changed", {
                selector_id: $(this).parent().attr("id"),
                brand_id: $(this).val()
            });
        
            /*var values = [];
            $(".marque-selector").children("#brand_id_brand_id").each(function() {
                values.push( $(this).attr('value') );
            });

            $.get("/event_recaps/brand_changed", {
                selector_id: $(this).parent().attr("id"),
                brand_id: values
            });*/
        });
    });

    // set up plus sign
    $(".marque-selector").children("#add_marque").click(function(){
        var ba_user_id = $("#brand_ambassador_id").val();
        $.get("/marques/add_marque",{ba_user_id:ba_user_id});
        return false;
    });

    // set up x sign
    $(".marque-selector").children("#remove_marque").click(function(){
    $.get("/marques/remove_marque", {selector_id: $(this).parent(".marque-selector").attr("id")});
        return false;
    });
}