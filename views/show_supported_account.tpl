<div style="overflow:scroll; min-height: 138px; height:240px"> 
  <table class="overview_table" id="" style="background-color: rgb(243, 239, 232)">        <thead>
          <tr style="background-color: rgb(243, 239, 232);">
        <th align="center">Account</th><th align="center">Market</th><th align="center">Total Spend</th>
        <th align="center">Events</th><th align="center"><span class="mp_header">MP</span></th>
        <th align="center"><span class="wst_header">ADV</span></th>          </tr>
        </thead>
    {{range .SupportedAccount}}
    <tbody>
    <tr class='trHead'>
      <td  width="40%"><span class='sign' value="{{.account_id}}" style="float:left" ></span>&nbsp;&nbsp;
      <a href="/accounts/{{.account_id}}/dashboard">{{.account_name}}</a>
      <div class="clear"/></td>
      <td width="25%">{{.market_name}}</td>
      <td width="15%" align="right">{{.sum_ta}}</td>
      <td width="6%"  align="right">{{.ev}}</td>
      <td width="6%"  align="right">{{.mp}}</td>
      <td width="6%"  align="right">{{.wst}}</td>          
    </tr>
    <tr class='contTr'>
      <td colspan="2">     
      <div id="supported_account_content_{{.account_id}}">
      </div>
    </td>
    </tr>
    </tbody>
    {{ end }}

</table>
   <!--End: Overview Table--> 
</div>
<a href="/accounts/supported_accounts" class="btn view-all">View All</a>
<script type="text/javascript">
$(document).ready(function(){
  $('a.events_time').tooltip({
    delay: 0,
    showURL: false,
    bodyHandler: function() {
      event_id = $(this).attr("rel");
      return $("#original_time_" + event_id).html();
    }
  });

$('.mp_header').tooltip({
      delay: 0,
      showURL: false,
      bodyHandler: function() {
          return "Menu Placement";
      }
  });

$('.wst_header').tooltip({
      delay: 0,
      showURL: false,
      bodyHandler: function() {
          return "Brand Advocacy";
      }
  });

$(".trHead .sign").on('click', function(){
            var accountId = $(this).attr("value");
            var selected_year = "2016"
            $(this).toggleClass('signTogl');        
            $(".trHead .contTr").toggle();
            $(this).closest('tr').next('.contTr').toggle(100);
            var supportedAccountData = {cont_account_id: accountId, selected_year: selected_year};
            var active= $('#supported_account_content_'+ accountId).find('.overview_table');
            if(active.length == 0){            
              $.ajax({
                url: "/pages/supported_account_content/" + accountId ,
                data: supportedAccountData,
                method: 'GET',                        
                dataType: 'text'
              })
              .done(function(data) { 
                $("#supported_account_content_" + accountId).html(data);
              })
              .fail(function(data) {
                $("#supported_account_content_" + accountId).html(data);
              });
            }
        }); 
  });
</script>