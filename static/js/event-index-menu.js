$(function(){
  $(".js").click(function(e){
  	e.preventDefault();
    $.get($(this).attr("href"), { format: "js"});    
  });
});