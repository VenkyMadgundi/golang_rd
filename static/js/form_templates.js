function cleanUpAltRowColoring(list_class){
  var liClass = false;

  $("." + list_class + " li").each(function(){
  // $(".sortable-list li").each(function(){
    $(this).attr("class", liClass ? "system_metric even" : "system_metric odd");
    liClass = !liClass;  
  });          
}  


