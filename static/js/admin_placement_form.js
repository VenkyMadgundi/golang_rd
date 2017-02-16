$(document).ready(function(){
  $(".edit_placement_form .brand_selected").change(function(){
    brand_id = $(this).parent().attr("data-brand");
    account_id = $(this).parent().attr("data-account");
    $.post("/accounts/toggle_placement", {account_id: account_id, brand_id: brand_id});
  });  
  
  $(".edit_placement_form .placement_type").change(function(){
    brand_id = $(this).parent().attr("data-brand");
    account_id = $(this).parent().attr("data-account");
    $.post("/accounts/change_placement_type", {account_id: account_id, brand_id: brand_id, is_new_placement: $(this).val()});
  });

  $(".edit_placement_form .date-picker").change(function(){
    brand_id = $(this).parent().attr("data-brand");
    account_id = $(this).parent().attr("data-account");
    $.post("/accounts/change_placement_date", {account_id: account_id, brand_id: brand_id, placement_date: $(this).val()});
  });
})
