<style type="text/css">
.dataTables_wrapper{
  border-bottom: none;
}
</style>
<div class="leftF marProTable"> 
  <!--Start: Overview Table-->

  <div id="kpi-proOverview_wrapper" class="dataTables_wrapper" role="grid"><div class="dataTables_scroll">
  <div class="dataTables_scrollHead" style="overflow: hidden; position: relative; border: 0px; width: 100%;">
  <div class="dataTables_scrollHeadInner" style="width: 480px; padding-right: 0px;">
    <table class="overview_table dataTable" style="background-color: rgb(243, 239, 232); margin-left: 0px; width: 480px;"><thead>
          <tr role="row" style="background-color: rgb(243, 239, 232);"><th align="center" class="sorting_disabled" role="columnheader" rowspan="1" colspan="1" style="width: 259px;">Programs</th><th align="center" class="sorting_disabled" role="columnheader" rowspan="1" colspan="1" style="width: 23px;">Goal</th><th align="center" class="sorting_disabled" role="columnheader" rowspan="1" colspan="1" style="width: 46px;">Executed</th><th align="center" class="sorting_disabled" role="columnheader" rowspan="1" colspan="1" style="width: 52px;">Scheduled</th><th align="center" class="sorting_disabled" role="columnheader" rowspan="1" colspan="1" style="width: 54px;">Remaining</th></tr>
        </thead></table></div></div><div class="dataTables_scrollBody" style="overflow: auto; height: 219px; width: 100%;">
        <table class="overview_table dataTable" id="kpi-proOverview" style="background-color: rgb(243, 239, 232); margin-left: 0px; width: 480px;"><thead>
          <tr role="row" style="background-color: rgb(247, 246, 245); height: 0px;"><th align="center" class="sorting_disabled" role="columnheader" rowspan="1" colspan="1" style="width: 259px; padding-top: 0px; padding-bottom: 0px; border-top-width: 0px; border-bottom-width: 0px; height: 0px;"></th><th align="center" class="sorting_disabled" role="columnheader" rowspan="1" colspan="1" style="width: 23px; padding-top: 0px; padding-bottom: 0px; border-top-width: 0px; border-bottom-width: 0px; height: 0px;"></th><th align="center" class="sorting_disabled" role="columnheader" rowspan="1" colspan="1" style="width: 46px; padding-top: 0px; padding-bottom: 0px; border-top-width: 0px; border-bottom-width: 0px; height: 0px;"></th><th align="center" class="sorting_disabled" role="columnheader" rowspan="1" colspan="1" style="width: 52px; padding-top: 0px; padding-bottom: 0px; border-top-width: 0px; border-bottom-width: 0px; height: 0px;"></th><th align="center" class="sorting_disabled" role="columnheader" rowspan="1" colspan="1" style="width: 54px; padding-top: 0px; padding-bottom: 0px; border-top-width: 0px; border-bottom-width: 0px; height: 0px;"></th></tr>
        </thead>
    {{range .Programs}}
    <tbody role="alert" aria-live="polite" aria-relevant="all">
    <tr>
        <td><a href="#" class="program_dashboard_link" data_id="{{.program_id}}">{{.program_name}}</a></td>        
        <td align="right">{{.goals}}</td>
        <td align="right">{{.executed}}</td>
        <td align="right">{{.scheduled}}</td>
        <td align="right">{{.remaining}} </td>
        </tr>
        </tbody>
  {{end}}
  
  </table>

  </div></div></div>
  <!--End: Overview Table--> 
</div>
{{ if .first_program }}
  <div class="rightF marProGva" id="program_selected_gva">
    <!--<%= render "pages/program_selected_gva", program: first_program %>-->
  </div>
{{end}}

<div class="clear"></div>

<script type="text/javascript">
$(document).ready(function(){

  {{if .no_record }}    
    $("#program_list_dashboard").html("<div class='no_records'>No programs</div>");
  {{end }}

  // Table Scroll  
  $('#kpi-proOverview').dataTable({     
      "bPaginate": false,
      "bFilter": false,
      "bInfo": false,
      "bSort": false,
      "sScrollY": "219px"
  });

  function load_program_GVA_data(program_id){
    $("#program_selected_gva").html('<%= image_tag "graph_loader.gif", class:"graph_loader"  %>');
    var selectedMarketID = '';
    var selectedMarketType = '';
    
    var jqxhr = $.ajax({
                        url: "/programs/"+ program_id +"/get_gva_data_ajax",
                        method: 'GET',                        
                        dataType: 'text',
                        data: {selected_id: selectedMarketID, selected_type: selectedMarketType}
                      })
                      .done(function(data) { 
                        $("#program_selected_gva").html(data);
                      })
                      .fail(function(data) {
                        $("#program_selected_gva").html(data);
                      });
  }

  $('.program_dashboard_link').click(function (e) {     
    e.preventDefault();
    $("#dasTabsMarkets li").removeClass('active');
    $(this).addClass('active');
    var program_id = $(this).attr("data_id");    
    load_program_GVA_data(program_id)
    return false;
  });  

});
</script>
