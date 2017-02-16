$(document).ready(function(){
  $('.day_event').tooltip({ 
      delay: 0, 
      showURL: false, 
      bodyHandler: function() { 
          return $("#event_" + $(this).attr("rel")).html(); 
      } 
  });
  
  $(".day_header").mouseover(function(div){
    $(this).children(".new_day_event").show();
  });

  $(".day_header").mouseout(function(div){
    $(this).children(".new_day_event").hide();
  });

  $('.events_time').tooltip({ 
      delay: 0, 
      showURL: false, 
      bodyHandler: function() { 
        event_id = $(this).attr("rel");
        return $("#original_time_" + event_id).html(); 
      } 
  });
});