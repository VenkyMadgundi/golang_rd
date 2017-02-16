//Customizing the export to EXCEL/PDF - Also customized WiceGrid library
function getURLPatten(evt){
  var urlPattern;
  urlPattern = $(evt.target).closest(".wice-grid-container").find(".wg-data").attr("data-processor-initializer-arguments");
  return urlPattern;
}

$(document).on("click", ".export-to-pdf-button", function(evt){
  var csvURL= getURLPatten(evt);
  if (csvURL != undefined ){
      csvURL            = csvURL.split(",");
      var exportCSVURL  = csvURL[2].split("\"");
      exportCSVURL      = removeExtraParamsAccountList(exportCSVURL[1])
      window.location   = exportCSVURL.replace(/export%5D=csv/, "export%5D=pdf");
  }
  else{
    var csvURL = $(this).parent().parent().parent().parent().parent().parent().find(".wg-data").attr("data-processor-initializer-arguments");
    if (csvURL != undefined ){
      csvURL            = csvURL.split(",");
      var exportCSVURL  = csvURL[2].split("\"");
      exportCSVURL      = removeExtraParamsAccountList(exportCSVURL[1]);
      window.location   = exportCSVURL.replace(/export%5D=csv/, "export%5D=pdf");
    }
  }
});

$(document).on("click", ".export-to-excel-button", function(evt){
  var csvURL= getURLPatten(evt);
  if (csvURL != undefined ){
      csvURL            = csvURL.split(",");
      var exportCSVURL  = csvURL[2].split("\"");
      exportCSVURL      = removeExtraParamsAccountList(exportCSVURL[1]);
      window.location   = exportCSVURL.replace(/export%5D=csv/, "export%5D=excel");
  }
  else{
    var csvURL = $(this).parent().parent().parent().parent().parent().parent().find(".wg-data").attr("data-processor-initializer-arguments");
    if (csvURL != undefined ){
      csvURL            = csvURL.split(",");
      var exportCSVURL  = csvURL[2].split("\"");
      exportCSVURL      = removeExtraParamsAccountList(exportCSVURL[1])
      window.location   = exportCSVURL.replace(/export%5D=csv/, "export%5D=excel");
    }
  }
});

function removeExtraParamsAccountList(urlString){
  var exportCSVURL  = urlString;
  exportCSVURL      = exportCSVURL.replace(/&target_grid%5Bf%5D%5Bcreator_id%5D%5B%5D=[^&]*/g, "");
  exportCSVURL      = exportCSVURL.replace(/&key_grid%5Bf%5D%5Bcreator_id%5D%5B%5D=[^&]*/g, "");
  exportCSVURL      = exportCSVURL.replace(/&key_grid%5Bf%5D%5Buser_id%5D%5B%5D=[^&]*/g, "");
  return exportCSVURL;
}

function removeParam(urlString, parameter)
{
  var url=urlString;
  var queryString=urlString; 
  var prefix = encodeURIComponent(parameter)+'=';
  var pars = queryString.split(/[&;]/g);
  for (var i= pars.length; i-->0;)               
      if (pars[i].lastIndexOf(prefix, 0)!==-1)   
          pars.splice(i, 1);
  url = pars.join('&');
  return url;
}

function updateURLParameterTwo(url, param1, param1Val, param2, param2Val){
    var newAdditionalURL = "";
    var tempArray = url.split("?");
    var baseURL = tempArray[0];
    var additionalURL = tempArray[1];
    var temp = "";
    if (additionalURL) {
        tempArray = additionalURL.split("&");
        for (i=0; i<tempArray.length; i++){
            if((tempArray[i].split('=')[0] != param1 || tempArray[i].split('=')[0] != param2) && tempArray[i].split('=')[0] != "grid%5Bpage%5D" ){
                newAdditionalURL += temp + tempArray[i];
                temp = "&";
            }
        }
    }
    newAdditionalURL = removeParam(newAdditionalURL, param1);
    newAdditionalURL = removeParam(newAdditionalURL, param2);
    var rows_txt = temp + "" + param1 + "=" + param1Val + "&" + param2 + "=" + param2Val;
    var newURL = baseURL + "?" + newAdditionalURL + rows_txt;
    newURL = newURL.replace(/^\?&/, "?");
    return newURL
}