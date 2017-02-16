$(".add-field-link").click(function(){
  $.post("/programs/"+$(this).attr("data-program-id")+"/form_template/add_form_field", {metric_id: $(this).attr("data-field-id"), program_id: $(this).attr("data-program-id"), class_name: $(this).attr("data-class-name")});
  $("#metric_" + $(this).attr("data-field-id")).remove();
  cleanUpAltRowColoring("nonsortable_list");
  return false;
});
