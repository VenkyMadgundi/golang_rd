// Brand / Budget synced dropdowns.
$(function(){
    $("#tactical_spend_brand_id").change(function(){
        var m_id = 0;
        if(document.getElementsByClassName('.treenode-input') != null){
            m_id = $('.treenode-input:checked').val();
          var hierarchyType = $('.treenode-input:checked').data("type");
        }
        else{
            m_id = $('#h_market_id').val();
        }
        $.post("/tactical_spends/brand_changed", {
            brand_id: $(this).val(),
            market_id: m_id
        });
    });
});