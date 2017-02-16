$(document).ready(function() {  
  $("#goal_goalable_type").change(function(dd) {
    new_type = $("#goal_goalable_type").val();
    $.get("/admin/goals/goalable_type_changed", {new_type: new_type})
  });
});