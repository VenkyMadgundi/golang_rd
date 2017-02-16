$(function(){
  $("#goal_menu a").click(function(){
    $.get(this + ".js", "script");
    return false;
  });  
})
