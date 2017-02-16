$(document).ready(function() {  
	var data = [];
	var account_id = 0;	
  // Add AJAX callback for checkboxes to toggle POS Items 
  $('.pos-check-box').change(function(cb) {
    account_id = $(this).attr("data-account-id");
    pos_item_id = $(this).attr("data-pos-item");
    $.post("/accounts/" + account_id + "/toggle_pos_item", {pos_item_id: pos_item_id, checked: this.checked});
  });

  // Add AJAX callback for checkboxes to toggle POS Items 
  $('.pos-check-box-all').change(function(cb) {
  	$('.pos-check-box').each(
	    function() {
        account_id = $(this).attr("data-account-id");
  			data.push($(this).attr("data-pos-item"));
	    }
		);
		$.post("/accounts/" + account_id + "/toggle_pos_item", {pos_item_id: data, checked: this.checked});
  });

});