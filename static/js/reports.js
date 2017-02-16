$(function(){
  $("#report_search_params_start_date").datepicker({
  			showOn: "button",
  			buttonImage: "/images/calendar.gif",
  			buttonImageOnly: true
  		});
  $("#report_search_params_end_date").datepicker({
      			showOn: "button",
      			buttonImage: "/images/calendar.gif",
      			buttonImageOnly: true
      		});

$(".toggleMarkets").live("click",function(){
    $(".markets-"+$(this).attr("toggleTr")).toggle('slow');
    var span = $("#"+$(this).attr("toggleTr")+"_span");
    span.text() == "+"? span.text("-") : span.text("+");
  });

});
