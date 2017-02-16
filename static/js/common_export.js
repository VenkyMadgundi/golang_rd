(function($) {
    if (!$.WGSExport) {
        $.WGSExport = {};
    }
    
    $.WGSExport.Common = {
        init: function() {
            $(document).ready(function(){   

                // For Wice Grid Embedded "Export to Excel" and "Export to PDF" in grid's footer
                var csvURL = $(".wg-data").attr("data-processor-initializer-arguments");
                if (csvURL != undefined ){
                    csvURL = csvURL.split(",");
                    var exportCSVURL = csvURL[2].split("\"");
                    exportCSVURL = exportCSVURL[1];
                    $(document).on("click", ".export-to-excel-button", function(){ 
                        window.location = exportCSVURL.replace(/export%5D=csv/, "export%5D=excel");
                    });

                    $(document).on("click", ".export-to-pdf-button", function(){ 
                        window.location = exportCSVURL.replace(/export%5D=csv/, "export%5D=pdf");
                    });
                }
            });
        }
    };
    $(window).load($.WGSExport.Common.init);
})(jQuery);