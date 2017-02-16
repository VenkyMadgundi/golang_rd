$(".sortable_list").sortable({update: function(event){
  items = new Array();

  $(".sortable_list li").each(function(){
    items.push($(this).attr("data-id"));
  });          

  cleanUpAltRowColoring("sortable_list");
  $.post("/form_templates/update_order", {items: items, program_id: $(this).attr("data-program-id")});    
}});

$(".remove-field-link").click(function(){
  if(confirm("Are you sure?")){
    $.post("/form_templates/remove_form_field", {field_id: $(this).attr("data-field-id"), program_id: $(this).attr("data-program-id")});
    $("#form_field_" + $(this).attr("data-field-id")).remove();
    cleanUpAltRowColoring("sortable_list");
  }
  return false;
});  	      

