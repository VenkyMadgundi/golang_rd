$("#program_brand_id").change(function(){
  $.get("/programs/ad_hoc_brand_changed", {brand_id: $(this).val()})
});