(function($) {
    if (!$.WGSExport) {
        $.WGSExport = {};
    }
    
    $.WGSExport.ExpenseCommon = {
        init: function() {
            $(document).ready(function(){   

                //Customizing the export to EXCEL/PDF - Also customized WiceGrid library
                $(document).on("click", ".export-to-pdf-button", function(){
                  var csvURL = $(this).parent().parent().parent().parent().parent().find(".wg-data").attr("data-processor-initializer-arguments");
                  var divActive = $("#accounts_index_tabs ul li.active").attr("id");
                  if (csvURL != undefined ){
                      csvURL            = csvURL.split(",");
                      var exportCSVURL  = csvURL[2].split("\"");
                      exportCSVURL      = exportCSVURL[1];
                      if ( divActive== "expense_tab_li"){
                        window.location   = exportCSVURL.replace(/export%5D=csv/, "export%5D=pdf&grid%5Bexpense_type%5D=approve");
                      }
                      else{
                        if (divActive == "unapprove_expense_tab_li"){
                        window.location   = exportCSVURL.replace(/export%5D=csv/, "export%5D=pdf&grid%5Bexpense_type%5D=pending");
                        }
                      }
                  }
                  else{
                    var csvURL = $(this).parent().parent().parent().parent().parent().parent().find(".wg-data").attr("data-processor-initializer-arguments");
                    if (csvURL != undefined ){
                      csvURL            = csvURL.split(",");
                      var exportCSVURL  = csvURL[2].split("\"");
                      exportCSVURL      = exportCSVURL[1];
                      if ( divActive== "expense_tab_li"){
                        window.location   = exportCSVURL.replace(/export%5D=csv/, "export%5D=pdf&grid%5Bexpense_type%5D=approve");
                      }
                      else{
                        if (divActive == "unapprove_expense_tab_li"){
                        window.location   = exportCSVURL.replace(/export%5D=csv/, "export%5D=pdf&grid%5Bexpense_type%5D=pending");
                        }
                      }
                    }
                  }
                });

                $(document).on("click", ".export-to-excel-button", function(){
                  var csvURL = $(this).parent().parent().parent().parent().parent().find(".wg-data").attr("data-processor-initializer-arguments");
                  var divActive = $("#accounts_index_tabs ul li.active").attr("id");
                  if (csvURL != undefined ){
                      csvURL            = csvURL.split(",");
                      var exportCSVURL  = csvURL[2].split("\"");
                      exportCSVURL      = exportCSVURL[1];
                      if ( divActive== "expense_tab_li"){
                        window.location   = exportCSVURL.replace(/export%5D=csv/, "export%5D=excel&grid%5Bexpense_type%5D=approve");
                      }
                      else{
                        if (divActive == "unapprove_expense_tab_li"){
                        window.location   = exportCSVURL.replace(/export%5D=csv/, "export%5D=excel&grid%5Bexpense_type%5D=pending");
                        }
                      } 
                  }
                  else{
                    var csvURL = $(this).parent().parent().parent().parent().parent().parent().find(".wg-data").attr("data-processor-initializer-arguments");
                    if (csvURL != undefined ){
                      csvURL            = csvURL.split(",");
                      var exportCSVURL  = csvURL[2].split("\"");
                      exportCSVURL      = exportCSVURL[1];
                      if ( divActive== "expense_tab_li"){
                        window.location   = exportCSVURL.replace(/export%5D=csv/, "export%5D=excel") + "&grid%5Bexpense_type%5D=approve";
                      }
                      else{
                          if (divActive == "unapprove_expense_tab_li"){
                          window.location   = exportCSVURL.replace(/export%5D=csv/, "export%5D=excel") + "&grid%5Bexpense_type%5D=pending";
                        }
                      }
                    }
                  }
                });
            });
        }
    };
    $(window).load($.WGSExport.ExpenseCommon.init);
})(jQuery);