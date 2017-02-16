<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
<title>WGS Openbar Home Page</title>

<script src="static/js/jquery_191.js" type="text/javascript"></script>
<script src="static/js/jquery-ui-1.9.0.custom.min.js" type="text/javascript"></script>
<script src="static/js/jquery-ui-timepicker-addon.js" type="text/javascript"></script>
<script src="static/js/jquery.form.js" type="text/javascript"></script>
<script src="static/js/jquery.checkgroup.js" type="text/javascript"></script>
<script src="static/js/jquery.tooltip.min.js" type="text/javascript"></script>
<script src="static/js/application_code.js" type="text/javascript"></script>
<script src="static/js/event-index-menu.js" type="text/javascript"></script>
<script src="static/js/event_calendar.js" type="text/javascript"></script>
<script src="static/js/calendar_chrome.js" type="text/javascript"></script>
<script src="static/js/jquery.prettyPhoto.js" type="text/javascript"></script>
<script src="static/js/events_show.js" type="text/javascript"></script>
<script src="static/js/ad_hoc_program_form.js" type="text/javascript"></script>
<script src="static/js/color_picker.js" type="text/javascript"></script>
<script src="static/js/admin_goal_form.js" type="text/javascript"></script>
<script src="static/js/reports.js" type="text/javascript"></script>
<script src="static/js/admin_placement_form.js" type="text/javascript"></script>
<script src="static/js/form_templates.js" type="text/javascript"></script>
<script src="static/js/pos_items.js" type="text/javascript"></script>
<script src="static/js/jscolor/jscolor.js" type="text/javascript"></script>
<script src="static/js/autocomplete-rails.js" type="text/javascript"></script>
<script src="static/js/jquery.ddslick.min.js" type="text/javascript"></script>
<script src="static/js/jquery.flexslider.js" type="text/javascript"></script>
<script src="static/js/jquery.carouFredSel.js" type="text/javascript"></script>
<script src="static/js/flot_graph_related.js" type="text/javascript"></script>
<script src="static/js/jquery.jqcheckboxtreebehavior.js" type="text/javascript"></script>
<script src="static/js/jquery.dataTables.js" type="text/javascript"></script>
<script src="static/js/date.js" type="text/javascript"></script>
<script src="static/js/fullcalendar.min.js" type="text/javascript"></script>
<script src="static/js/jquery.minicolors.min.js" type="text/javascript"></script>
<script src="static/js/jquery.tabelizer.min.js" type="text/javascript"></script>
<script src="static/js/jquery.treeview.js" type="text/javascript"></script>
<script src="static/js/jquery.chosentree.js" type="text/javascript"></script>
<script src="static/js/jquery.treeselect.js" type="text/javascript"></script>
<script src="static/js/jstree.js" type="text/javascript"></script>
<script src="static/js/application.js" type="text/javascript"></script>


<link href="static/css/application.css" media="all" rel="stylesheet" type="text/css" />
<link href="static/css/jquery.tooltip.css" media="all" rel="stylesheet" type="text/css" />
<link href="static/css/jquery-ui-1.8.6.custom.css" media="all" rel="stylesheet" type="text/css" />
<link href="static/css/calendarview.css" media="all" rel="stylesheet" type="text/css" />
<link href="static/css/dropdown/ie.css" media="all" rel="stylesheet" type="text/css" />
<link href="static/css/dropdown/style.css" media="all" rel="stylesheet" type="text/css" />
<link href="static/css/event_calendar.css" media="all" rel="stylesheet" type="text/css" />
<link href="static/css/prettyPhoto.css" media="all" rel="stylesheet" type="text/css" />
<link href="static/css/ddSlick.css" media="all" rel="stylesheet" type="text/css" />
<link href="static/css/application_ui.css" media="all" rel="stylesheet" type="text/css" />
<link href="static/css/style_light.css" media="all" rel="stylesheet" type="text/css" />
<link href="static/css/fullcalendar.css" media="all" rel="stylesheet" type="text/css" />
<link href="static/css/style.css" media="all" rel="stylesheet" type="text/css" />
<link href="static/css/jquery.minicolors.css" media="all" rel="stylesheet" type="text/css" />
<link href="static/css/treeselect.css" media="all" rel="stylesheet" type="text/css" />
<link href="static/css/tabelizer.min.css" media="all" rel="stylesheet" type="text/css" />
<link href="static/css/jquery.treeview.css" media="all" rel="stylesheet" type="text/css" />
    <link href="static/css/application-print.css" media="print" rel="stylesheet" type="text/css" />
<script type="text/javascript">
var wice_grid_datatable = 0;

$(document).ready(function(){
  /// To Menu
  /*$('#user_top_nav_links').ddslick({
    width: 235,    
    defaultTarget: "_self",
    defaultSelectedIndex: 0
  });*/

  $.ajaxSetup({
    beforeSend: function(xhr) {
      $("#application_year").hide();
      xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
    },
    complete: function(xhr,status){
      $("#application_year").show();
    }
  }); 

  /*<% unless controller.controller_name == "events" || action_name == "user_dashboard" || action_name == "brands_markets_user_dashboard" %>
    $("tr:even").css("background-color", "#f3efe8");
    $("tr:odd").css("background-color", "#f7f6f5");
  <% end %>
  */
  // Box Today’s Event  Calendar
  $( "#todayEvents").datepicker({
    showOtherMonths: true,
    selectOtherMonths: false,
    onSelect: function(dateText, inst) { 
      location.href = "/events" + "?day_date=" + dateText;
    }
  });
  
  // Export Tab 

  $('.export-tab').click(function() {
    if ($(".cstm-export-cont").is(":hidden")) {
      $(".cstm-export-cont").slideDown("slow");
      $(".export-tab").css({"background-position":"center -15px"});
    } else {
      $(".cstm-export-cont").slideUp("slow");
      $(".export-tab").css({"background-position":"center 25px"});
    }
  });   

  /*<% if params[:per_page] and params[:per_page].to_i > 50 %>


  <% elsif params[:per_page] and params[:per_page].to_i > 50  and action_name = "index" and controller_name = "menu_placements" %>
  // Table Scroll
    $('.wice-grid').dataTable({       
      "bPaginate": true,
      "bFilter": true,
      "bInfo": true,
      "bSort": false,
      "sScrollY": "738px"      
    });

  // Table Scroll
  wice_grid_datatable = $('.wice-grid').dataTable({       
      "bPaginate": false,
      "bFilter": false,
      "bInfo": false,
      "bSort": true,
      "sScrollY": "738px"      
  });

  <% end %>
  */

});

</script>
</head>

<body>
<!--Start: Header-->
<div class="header">
  <div class="headerWrap">
    <a href="/" class="shownav">Menu</a>    <div class="logo">
      <a href="/"><img alt="WGSOPENBar" height="75" src="static/img/wgs_open_bar_logo.png" width="210" /></a></div>
        <div class='visit-notification' style='position: absolute;right: 245px;top: -55px;'>
      <ul class='ttw-notification-menu'>
        <li id='market_visit' class='notification-menu-item first-item'>
          <p style='color: #666666;font-size: 11px;font-weight: bold;line-height: 28px;padding: 0 12px;'>Market Visits</p><span class='notification-bubble' id='market_visit_notification' title='Notifications' style='background-color: rgb(245, 108, 126); display: inline;  '>53</span></li></ul></div><div class='notification-list-wrapper' style='top: 70px; left: 780px; opacity: 1;display:none;' id='market_visit_list'><ul class='notification-list'><li class='notification-list-item'><div class='ttw-notification'><span class='message'><a href=/market_visits/new><span class='brName'>New Market Visit</span></a></span></div></li><li class='notification-list-item'><div class='ttw-notification'><span class='message'><a href='/market_visits/2803/edit'><img alt="Carol_company_photo_thumb" src="https://new-wgs-development.s3.amazonaws.com/avatar/806/Carol_Company_Photo_thumb.JPG" /><span class='brName'>Carol Russomanno</span><span>Follow Through Fast Start M...</span><span>Pittsburgh (C) 04/12/2016</span></a></span></div></li><li class='notification-list-item'><div class='ttw-notification'><span class='message'><a href='/market_visits/2716/edit'><img alt="No_profile_big" src="static/img/no_profile_big.png" /><span class='brName'>Nicole Gams</span><span>Glenfiddich Family Event + ...</span><span>Nevada (S) 04/05/2016</span></a></span></div></li><li class='notification-list-item'><div class='ttw-notification'><span class='message'><a href='/market_visits/2714/edit'><img alt="No_profile_big" src="static/img/no_profile_big.png" /><span class='brName'>Nicole Gams</span><span>Nth Fest & Glenfiddich Dinn...</span><span>Nevada (S) 03/01/2016</span></a></span></div></li><li class='notification-list-item'><div class='ttw-notification'><span class='message'><a href='/market_visits/2715/edit'><img alt="No_profile_big" src="static/img/no_profile_big.png" /><span class='brName'>Nicole Gams</span><span>Nth Fest & Glenfiddich Dinn...</span><span>Nevada (S) 03/01/2016</span></a></span></div></li><li class='notification-list-item'><div class='ttw-notification'><span class='message'><a href='/market_visits/2687/edit'><img alt="No_profile_big" src="static/img/no_profile_big.png" /><span class='brName'>Nicole Gams</span><span>The Event That Shall Not Be...</span><span>Missouri (S) 06/05/2016</span></a></span></div></li><li class='notification-list-item link_viewAll'><div class='ttw-notification'><span class='message'><a href='/market_visits/pending_list'>View All</a></span></div></li></ul></div>
        <div class='recap_resubmitted-notification' style='position: absolute;right: 387px;top: -55px;'>
          <ul class='ttw-notification-menu'>
            <li id='event_recap_resubmitted' class='notification-menu-item second-item'>
              <p style='color: #666666;font-size: 11px;font-weight: bold;line-height: 28px;padding: 0 12px;'>Rejected Recaps</p><span class='notification-bubble' id='event_recap_rejected_notification' title='Notifications' style='background-color: rgb(245, 193, 81); display: inline; '>3</span></li></ul></div><div class='notification-list-wrapper' style='top: 68px; left: 623px; display:none; opacity: 1;' id='event_recap_resubmitted_list'><ul class='notification-list'><li class='notification-list-item'><div class='ttw-notification'><span class='message'><img alt="Fullsizerender_thumb" src="https://new-wgs-development.s3.amazonaws.com/avatar/1804/FullSizeRender_thumb.jpg" /><a href='/events/58662/event_recaps/58685/edit'><span class='brName'>Reyka Ad-Hoc (2016)</span><span>Ad Hoc Event</span><span>Hilton Orange County  (C)</span><span>04/15/2016 @ 12:00 PM PDT</span></a></span></div></li><li class='notification-list-item'><div class='ttw-notification'><span class='message'><img alt="Val__1__thumb" src="https://new-wgs-development.s3.amazonaws.com/avatar/1640/val__1__thumb.jpg" /><a href='/events/57527/event_recaps/57550/edit'><span class='brName'>Monkey Shoulder Ultimate Bartender Championship (2016)</span><span>Ad Hoc Event</span><span>Wright & Co. Detroit (C)</span><span>03/20/2016 @  5:00 PM CDT</span></a></span></div></li><li class='notification-list-item'><div class='ttw-notification'><span class='message'><img alt="No_profile_big" src="static/img/no_profile_big.png" /><a href='/events/49438/event_recaps/49461/edit'><span class='brName'>Glenfiddich Casa </span><span>Ad Hoc Event</span><span>Angus Insurgentes Mexico City (C)</span><span>01/23/2015 @  7:00 PM CST</span></a></span></div></li><li class='notification-list-item link_viewAll'><div class='ttw-notification'><span class='message'><a href='/event_recaps/pending?status=rejected'>View All</a></span></div></li></ul></div>
        <div class='recap-notification' style='position: absolute;right: 329px;top: -55px;'>
          <ul class='ttw-notification-menu'>
            <li id='event_recap' class='notification-menu-item second-item'>
              <p style='color: #666666;font-size: 11px;font-weight: bold;line-height: 28px;padding: 0 12px;'>Recaps</p><span class='notification-bubble' id='event_recap_notification' title='Notifications' style='background-color: rgb(245, 193, 81); display: inline; '>19</span></li></ul></div><div class='notification-list-wrapper' style='top: 68px; left: 715px; display:none; opacity: 1;' id='recap_list'><ul class='notification-list'><li class='notification-list-item'><div class='ttw-notification'><span class='message'><img alt="No_profile_big" src="static/img/no_profile_big.png" /><a href='/events/58637/event_recaps/58660/edit'><span class='brName'>Tullamore DEW Signature Serve (2016)</span><span>Managed Bar Night</span><span>Tony Ps Denver Denver (C)</span><span>04/20/2016 @  7:00 PM MDT</span></a></span></div></li><li class='notification-list-item'><div class='ttw-notification'><span class='message'><img alt="Hawaii_thumb" src="https://new-wgs-development.s3.amazonaws.com/avatar/1354/hawaii_thumb.jpg" /><a href='/events/58495/event_recaps/58518/edit'><span class='brName'>Ancho Reyes Ad-hoc (2016)</span><span>Ad Hoc Event</span><span>Kirby Ice House Houston (C)</span><span>04/09/2016 @ 12:00 PM CDT</span></a></span></div></li><li class='notification-list-item'><div class='ttw-notification'><span class='message'><img alt="No_profile_big" src="static/img/no_profile_big.png" /><a href='/events/58494/event_recaps/58517/edit'><span class='brName'>Glenfiddich 14YO ABA Program (2016)</span><span>Managed Bar Night</span><span>Agave Estates Houston (C)</span><span>04/07/2016 @  7:00 PM CDT</span></a></span></div></li><li class='notification-list-item'><div class='ttw-notification'><span class='message'><img alt="Aaeaaqaaaaaaaauhaaaajgjmzdfjyzjhlwm4ndqtndk5mi1hzjq2ltgyzmzlmdg2ztk2nq_thumb" src="https://new-wgs-development.s3.amazonaws.com/avatar/1916/AAEAAQAAAAAAAAUhAAAAJGJmZDFjYzJhLWM4NDQtNDk5Mi1hZjQ2LTgyZmZlMDg2ZTk2NQ_thumb.jpg" /><a href='/events/58311/event_recaps/58334/edit'><span class='brName'>Tullamore DEW Whiskey & Legends (2016)</span><span>Brand Ambassador</span><span>Campbell's Irish Pub Wisconsin (S)</span><span>04/12/2016 @  7:00 PM CDT</span></a></span></div></li><li class='notification-list-item'><div class='ttw-notification'><span class='message'><img alt="No_profile_big" src="static/img/no_profile_big.png" /><a href='/events/57483/event_recaps/57506/edit'><span class='brName'>Tullamore DEW Snug (2016)</span><span>Signature</span><span>Mizner Park Amphi... Florida - South (R)</span><span>03/17/2016 @ 11:00 AM EDT</span></a></span></div></li><li class='notification-list-item link_viewAll'><div class='ttw-notification'><span class='message'><a href='/event_recaps/pending?status=submitted'>View All</a></span></div></li></ul></div>
        
        <div class='recap-notification' style='position: absolute;right: 488px;top: -55px;'>
          <ul class='ttw-notification-menu'>
            <li id='sponsorship_activity_pendings' class='notification-menu-item second-item'>
              <p style='color: #666666;font-size: 11px;font-weight: bold;line-height: 28px;padding: 0 12px;'>Pending Activities</p></li></ul></div>
    <div id="topNav">
      <select id="user_top_nav_links" class="dropdown">
  <option value="0" data-href="http://localhost:3000/" href="http://localhost:3000/" data-imagesrc=static/img/icon-profile.png data-description="Director, On Premise and Events">Kristen Hannah</option>
      <option value="0" data-href="http://localhost:3000/admin" href="http://localhost:3000/admin" data-imagesrc="static/img/icon-admin.png" data-description="Administration">Admin</option>

  <option value="0" data-href="http://localhost:3000/admin/users/138/edit?redirect_path=%2F" href="http://localhost:3000/admin/users/138/edit?redirect_path=%2F" data-imagesrc="static/img/icon-edit.png" data-description="Edit Profile">Edit</option>
  <option value="0" data-href="http://localhost:3000/admin/budgets" href="http://localhost:3000/admin/budgets" data-imagesrc="static/img/icon-budgets.png" data-description="View Budget"><label>Budgets</label></option>
  <option value="0" data-href="http://localhost:3000/logout" href="http://localhost:3000/logout" data-imagesrc="static/img/icon-signOut.png" data-description="Sign Out">Sign Out</option>
</select>

    </div>
  </div>
</div>
<!--End: Header--> 
 
 <!--Start: Main Wrapper-->
<div class="wrapper">
  <div class="wrapperCont"> 
    
    <!--Start: Navigation-->
    <div class="nav">
      <ul id="navList">
    <li class="active"><a href="/" class="Home">Home</a></li>    <li class=""><a href="/events" class="Calender">Calender<span class='calender_current_date'>01</span></a></li>    <li class=""><a href="/kpi/user_dashboard" class="KpiBudget">KPI &amp; Budget Menu</a></li>    <li class=""><a href="/accounts" class="Accounts" id="accounts-link">Accounts </a></li>    <li class=""><a href="/programs" class="Programs" id="programs-link">Programs </a></li>    <li class=""><a href="/sponsorships" class="Sponsorships" id="sponsorships-link">Sponsorships </a></li>    <li class=""><a href="/reports/brand_activity" class="Reports" id="reports-link">Reports</a></li>    <li class=""><a href="/photos" class="Photos" id="photos-link">Photos </a></li>    <li class=""><a href="/brands" class="Brands" id="brands-link">Brands </a></li>    <li class=""><a href="/documents" class="Documents" id="documents-link">Documents </a></li></ul>    
    </div>
    <!--End: Navigation--> 
    
    <!--Start: Navigation Content-->
    <div class="content">
      <div id="navCont1" class="tabCont">
        <div class="contentWrap">
          <style type="text/css">
  .dasTabs a{text-shadow: none;}
  .chosen-results li{float: none; background: none;font-weight: normal;}
</style>
<!--Start: Todays & Upcoming events for all user roles-->
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC1qSIxCxfnUCewgBzVEvW85Sb25UNyQUw" type="text/javascript"></script>
<script src="static/js/markerclusterer_compiled.js" type="text/javascript"></script>
<script src="static/js/infobox_packed.js" type="text/javascript"></script>

<script type="text/javascript">
$(document).ready(function(){ 
var wgsDashMap = {};
var address = [];
var content_data = [];
var popup_content = [];
var upcoming_address = [];
var upcoming_content_data = [];
var upcoming_popup_content = [];

$(".mapList li a").click(function(){
  $(".mapList li").removeClass('active');
  $(this).parent().addClass('active');
  var tabValue = $(this).attr("data");  
  if(tabValue == "today"){
    ib.close();
    $("#event-info-title").html("Todays Events");
    wgsDashMap.loadMarkers(address, content_data, popup_content);
  }
  else{
    ib.close();
    $("#event-info-title").html("Upcoming Events")
    wgsDashMap.loadMarkers(upcoming_address, upcoming_content_data, upcoming_popup_content);  
  }
});

// Event List panale
$(".mapBoxArrow").click(function(){
  var mapLeft = $(".mapList").css('left');
  $(this).toggleClass('mbArrow');
  if(mapLeft=="-<%= is_mobile? ? '245' : '289'%>px"){
    $(".mapBoxArrow").animate({left:"<%= is_mobile? ? '242' : '286'%>px"}, 500).attr('title','Hide panel');
    $(".mapList").animate({left:"0px"},500);
  }else{
    $(".mapList").animate({left:"-<%= is_mobile? ? '245' : '289'%>px"},500);
    $(".mapBoxArrow").animate({left:"0"},500).attr('title','Show panel');
  }

});

// Creating an object literal containing the properties we want to pass to the map
var options = {
  zoom: 4,
  center: new google.maps.LatLng(39.63953756436671, -103.447265625),
  mapTypeId: google.maps.MapTypeId.ROADMAP,
  zoomControl: true,
  zoomControlOptions: {
      style: google.maps.ZoomControlStyle.LARGE,
      position: google.maps.ControlPosition.RIGHT_CENTER
  }
};

// Creating the map
var map = new google.maps.Map(document.getElementById('map'), options);
// Creating a LatLngBounds object
var bounds = new google.maps.LatLngBounds();
// Creating an array that will contain the addresses
var places = [];
// Creating a variable that will hold the InfoWindow object
var infowindow;
// markerclusterer
var markerCluster = new MarkerClusterer(map);
// Info Box
var ib = new InfoBox();

wgsDashMap.loadMarkers = function(address_passed, content_data_passed, popup_content_passed) {  
  markerCluster.clearMarkers(); 
  // map.clearOverlays();     
  var geocoder = new google.maps.Geocoder();
  var markers = [];
  var panel = $(".eve-mapList");  
  panel.empty();
  // Adding a LatLng object for each city
  for (var i = 0; i < address_passed.length; i++) {
    (function(i) {      
      // geocoder.geocode( {'address': address_passed[i]}, function(results, status) {
        if (address_passed[i][0] != '0' && address_passed[i][1] != '0' ) {
          places[i] = new google.maps.LatLng(address_passed[i][0], address_passed[i][1])
          var marker = new google.maps.Marker({position: places[i], icon: 'static/img/icon-pin.png'});
          var title = document.createElement("a");
          title.href = '#';
          title.className = 'activeMapList';
          title.innerHTML = content_data_passed[i];

          var item = $("<li></li>", {});

          item.append(title);
          panel.append(item);

          markers.push(marker);
          //add the marker to the markerClusterer
          markerCluster.addMarker(marker);
          // Creating the event listener. It now has access to the values of i and marker as they were during its creation
          google.maps.event.addListener(marker, 'click', function() {
            // e.preventDefault();
            map.panTo(marker.getPosition());
            var boxText = popup_content_passed[i];
                
            var myOptions = {
                     content: boxText
                    ,disableAutoPan: false
                    ,maxWidth: 255
                    ,zIndex: null
                    ,boxStyle: { width: "255px"}
                    ,pixelOffset: new google.maps.Size(-125, -150)
                    ,position: places[i]
                    ,closeBoxMargin: "20px 10px -18px 2px"
                    ,closeBoxURL: "https://www.google.com/intl/en_us/mapfiles/close.gif"
                    ,infoBoxClearance: new google.maps.Size(1, 1)
                    ,pane: "floatPane"
                    ,enableEventPropagation: true
            };
            ib.close();
            ib.setOptions(myOptions)
            ib.open(map, this);
          });
          // Creating the event listener. It now has access to the values of i and marker as they were during its creation
          google.maps.event.addDomListener(title, 'click', function(e) {
            e.preventDefault();
            $(".mapList li").removeClass('activeMapList');
            $(this).parent().addClass('activeMapList');
            map.panTo(marker.getPosition());
            var boxText = popup_content_passed[i];
            var myOptions = {
                     content: boxText
                    ,disableAutoPan: false
                    ,maxWidth: 255
                    ,zIndex: null
                    ,boxStyle: { width: "255px"}
                    ,pixelOffset: new google.maps.Size(-125, -150)
                    ,position: places[i]
                    ,closeBoxMargin: "20px 10px -18px 2px"
                    ,closeBoxURL: "https://www.google.com/intl/en_us/mapfiles/close.gif"
                    ,infoBoxClearance: new google.maps.Size(1, 1)
                    ,pane: "floatPane"
                    ,enableEventPropagation: true
            };
            ib.close();
            ib.setOptions(myOptions)
            ib.open(map, marker);
          });
          bounds.extend(places[i]);
          map.fitBounds(bounds);
        } else {
          var title = document.createElement("a");
          title.href = '#';
          title.className = 'activeMapList';
          title.innerHTML = content_data_passed[i];
          var item = $("<li></li>", {});
          item.append(title);
          panel.append(item);
          google.maps.event.addDomListener(title, 'click', function(e) {
            e.preventDefault();
            $(".mapList li").removeClass('activeMapList');
            $(this).parent().addClass('activeMapList');
            alert("Account address is not provided!!!");
          });
        }
    })(i);  
  }  
}

{{range .TodaysEvents}}
  address.push(['{{.latitude}}', '{{.longitude}}']);
  content_data.push("<span class='flag'></span> {{.program_name}} <span class='eventDays'>{{.market_name}}, {{.start_at}}</span>");
  popup_content.push("<span class='info-Box'><span class='info-BoxCont radius3'><h2> <a href='{{.program_id}}'>{{.program_name}}</a></h2><span class='eventDays'>{{.start_at}}</span><ul><li><span class='actDtel'>Account Name</span> <span class='actDis'>{{.account_name}}</span></li><li><span class='actDtel'>Address</span> <span class='actDis'>{{.street_address}}</span></li><li><span class='actDtel'>Market</span> <span class='actDis'>{{.market_name}}</span></li></ul></span></span>");
{{end}}

{{range .UpcommingEvents}}
  upcoming_address.push(['{{.latitude}}', '{{.longitude}}']);
  
  upcoming_content_data.push("<span class='flag'></span> {{.program_name}} <span class='eventDays'>{{.market_name}}, {{.start_at}}</span>");

  upcoming_popup_content.push("<span class='info-Box'><span class='info-BoxCont radius3'><h2> <a href='{{.program_id}}'>{{.program_name}}</a></h2><span class='eventDays'>{{.start_at}}</span><ul><li><span class='actDtel'>Account Name</span> <span class='actDis'>{{.account_name}}</span></li><li><span class='actDtel'>Address</span> <span class='actDis'>{{.street_address}}</span></li><li><span class='actDtel'>Market</span> <span class='actDis'>{{.market_name}}</span></li></ul></span></span>");

{{end}}

wgsDashMap.loadMarkers(address, content_data, popup_content);

});
</script>

<!--Start: Events Map-->
<div class="box">
  <div class="page-heading">
    <h1 class="icon-events">Event Info - <span id="event-info-title">Todays Events</span></h1>
  </div>
  <div class="box-content tblPad"> 
    <!--Start: Events Map Container-->
    <div id="map-container"> 
      <span class="mapBoxArrow" title="Hide panel"></span>
      <!--Start: Events List -->
      <div class="mapList">
        <div class="mapListTabs">
          <ul>
                <li class="active"><a href="#" title="Todays Events" data="today" >Todays Events</a></li>
                <li><a href="#" title="Upcoming Events" data="upcoming" >Upcoming Events</a></li>

              </ul>
        </div>
        <div class="eve-mapListBox">
          <ul class="eve-mapList scroll-pane"></ul>
        </div>
      </div>
      <!--End: Events List -->
    <div id="map"></div>
  </div>
  <!--End: Events Map Container-->
  <div class="clear"></div>
  </div>
</div>
<!--End: Events Map--> 
<!--End: Todays & Upcoming events for all user roles-->

<!--Start: Box Program Overview for all user roles-->

  <div class="box">
    <div class="page-heading">
      <h1 class="icon-programs">Program Overview</h1>
      <div class="dasTabs" style="border:none; background:none">
        <select name='program_overview[market]' id='program_overview_market' class='select'>{{.ProgramMarkets}}</select>
      </div>
    </div>
    <div class="box-content tblPad" id="program_list_dashboard" style="height:292px">
                  <%= image_tag "graph_loader.gif", class:"graph_loader"  %>
          </div>
          <div class="clear"></div>
  </div>
<!--End:  Box Program Overview-->

<!--Start: Box Supported Account Overview for all user roles-->
<div class="box">
  <div class="page-heading">
    <h1 class="icon-accountMod">Supported Account Overview</h1>
    <div class="dasTabs" style="border:none; background:none">      
      <select name='supported_account[market]' id='supported_account_market' class='select'>{{.ProgramMarkets}}</select>
    </div>
  </div>
  <div class="box-content tblPad" id="supported_account_dashboard" style="height: 275px;">
  </div>
  <div class="clear"></div>
</div>
<!--End:  Box Supported Account Overview-->


<!--Start: Box Pending Recaps -->
<div class="box">
  <div class="page-heading">
    <h1 class="icon-calendar">Pending Recaps</h1>
    <div class="rightF" style="padding-right: 10px;padding-top: 5px;">
    </div>
  </div>
  <div class="box-content tblPad" style="height: 275px;overflow:scroll; min-height: 138px;">
    
    <table class="overview_table" id="" style="background-color: rgb(243, 239, 232)">        <thead>
          <tr style="background-color: rgb(247, 246, 245);">
<th align="center"><a href="#">Event Date</a></th><th align="center"><a href="#">Account</a></th><th align="center"><a href="#">Program</a></th><th align="center"><a href="#">Market</a></th><th align="center"><a href="#">Event Type</a></th>          </tr>
        </thead>
          {{range .PendingRecaps}}
          <tbody>
          <tr class="event day_event even" id="event_{{.id}}" rel="{{.id}}" style="background-color: rgb(243, 239, 232);">    
          <td width="28%">
          <a href="/events/{{.id}}/dashboard">{{.start_at}}</a>
          </td>        
          <td>{{.account_name}}</td>
          <td>{{.program_name}}</td>
          <td>{{.market_name}}</td>
          <td>{{.program_type}}</td>
          </tr>        
          </tbody>
        {{end}}
</table>        

  </div>
  <div class="clear"></div>
</div>
<!--End:  Box Pending Recaps -->




        </div>
      </div>
    </div>
    <!--End: Navigation Content--> 
  
    <!--Start: Scrollfollow-->
    <div class="scrollFollow" id="scroll-follow">
      <ul class="qlink-header"><b>Quick Links</b></ul>

<ul id="qlink-contents">
      <li><a href="/events/new" class="quick-links" id="new-event">New Program Event</a></li>      <li><a href="/events/new?ad_hoc=true" class="quick-links" id="new-ad-hoc-program">New Ad-Hoc Event</a></li>      <li><a href="/events/new?ad_hoc=mb" class="quick-links" id="new-multi-brand-ad-hoc-program">New Multi-Brand Ad-Hoc Event</a></li>      <li><a href="/tactical_spends/new" class=" quick-links" id="new-spend">New Tactical Spend</a></li>      <li><a href="/menu_placements/new" class="quick-links" id="new-menu-placement">New Menu Placement</a></li>      <li><a href="/wait_staff_trainings/new" class="quick-links" id="new-wait-staff-training">New Brand Advocacy</a></li>      <li><a href="/market_visits/new" class="quick-links" id="new-market-visit">New Market Visit</a></li>      <li><a href="/brand_ambassador_events/new" class="quick-links" id="new-brand-ambassador-event">New BA Event</a></li>
      <li><a href="/accounts/new" class="quick-links" id="new-account">New Account</a></li>
      <li><a href="/programs/new" class="quick-links" id="new-program">New Program</a></li>      <li><a href="http://localhost:3000/admin/budgets" class="quick-links" id="my_budgets">My Budgets</a></li>      <li><a href="/brands/traffic_light_report" class="quick-links" id="traffic-light-report">Traffic Light Report</a></li>      <li><a href="/account_lists/new" class="quick-links" id="new-target-account">New Target Account List</a></li>      <li><a href="/account_lists/new?list_type=key" class="quick-links" id="new-key-account">New Key Account List</a></li>      <li><a href="/account_lists/list" class="quick-links" id="new-key-account">Target / Key Account Lists</a></li>      <li><a href="/admin/email_template" class="quick-links" id="new-email-template">Email Template</a></li></ul>

<script type="text/javascript">
  $(document).ready(function(){
    if($("#qlink-contents").find('li').length==0)
    {  
      $(".qlink-header").css("display","none");
      $(".wrapper, .headerWrap, .footerWrap").css("width","981px");
    }  

    var jqxhr = $.ajax({
      url: "/programs/load_dashboard_data",
      method: 'GET',                        
      dataType: 'text'            
    })
    .done(function(data) { 
      $("#program_list_dashboard").html(data);
    })
    .fail(function(data) {
      $("#program_list_dashboard").html(data);
    });

    var jqxhr = $.ajax({
            url: "/accounts/load_supported_accounts_data",
            method: 'GET',                        
            dataType: 'text'
          })
          .done(function(data) { 
            $("#supported_account_dashboard").html(data);
          })
          .fail(function(data) {
            $("#supported_account_dashboard").html(data);
          });

  //$(document).on('click',"[id^='supported_account_market_']",function(){ 
  $("#supported_account_market").change(function (e) {     
    $("#supported_account_dashboard").html('<%= image_tag "graph_loader.gif", class:"graph_loader"  %>'); 
    var jqxhr = $.ajax({
            url: "/accounts/load_supported_accounts_data",
            method: 'GET',                        
            dataType: 'text',
            data: {selected_id: $(this).val(), selected_type: $(this).find(':selected').data("type")}
          })
          .done(function(data) { 
            $("#supported_account_dashboard").html(data);
          })
          .fail(function(data) {
            $("#supported_account_dashboard").html(data);
          });

  });
  });
</script>

    </div> 
    <!--End: Scrollfollow-->
  
  </div>

<div id="hover_details" class="hover_box" style="display: none"></div>
<div id="dialog" style="display:none"></div>
</div>
<!--End: Main Wrapper-->

<div class="clear"></div>

<!--Start: Footer-->
<div class="footer">
  <div class="footerWrap" style="padding-left:7%;width:65%">
    <span style="float: left;">Build : v2015_mh-2158-g1779ab0
&nbsp;&nbsp; </span>
    <span style="float: left;">
    User Time Zone - EDT</span>
    Copyright 2013-2014, William Grant &amp; Sons, Inc.
                    <span class="footer_year">
                      <form id="set_application_year" action="/settings/change_application_year" target="_top">
                        Select Year : <select id="application_year" name="application_year" style="border: 1px solid #cccccc;color: #545454;font-size: 11px;padding: 5px 6px;margin-left: 10px;line-height: 20px;width: 100px !important; height: 24px !important; margin-top: -6px; padding: 2px;"><option value="2011">2011</option>
<option value="2012">2012</option>
<option value="2013">2013</option>
<option value="2014">2014</option>
<option value="2015">2015</option>
<option value="2016" selected="selected">2016</option></select>
                      </form>
                    </span>
  </div>
</div>
<!--End: Footer-->  
<script type="text/javascript">
$(document).ready(function(){
  jQuery('#application_year').change(function(event){
      $("form#set_application_year").submit();
  });
});
</script>

</body>
</html>
