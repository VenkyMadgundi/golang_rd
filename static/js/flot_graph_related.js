var previousPoint = null;

function showTooltip(x, y, contents) {
  $("<div id='tooltip_graph'>" + contents + "</div>").css({
    position: "absolute",
    display: "none",
    top: y + 5,
    left: x + 5,
    border: "1px solid #fdd",
    padding: "2px",
    "z-index": 3000,
    "font-size": "13px",
    "background-color": "#fee",
    opacity: 0.80
  }).appendTo("body").fadeIn(200);
}

function bind_tooltip_to_graph(graph_placeholder, horizontal){
  $(graph_placeholder).bind("plothover", function (event, pos, item) {
    if (item) {
      if (previousPoint != item.dataIndex) {

        previousPoint = item.dataIndex;

        $("#tooltip_graph").remove();
        if(horizontal == true){
          var y = item.datapoint[0],
          x = item.datapoint[1].toFixed(0);
        }
        else{
          var x = item.datapoint[0],
          y = item.datapoint[1].toFixed(0);
        }

        showTooltip(item.pageX, item.pageY,
            item.series.label + " = " + y);
      }
    } else {
      $("#tooltip_graph").remove();
      previousPoint = null;            
    }
  });  
}

// Need to set clickable : true for grid
function bind_click_to_graph(graph_placeholder){ 
  $(graph_placeholder).bind("plotclick", function (event, pos, item) {
    alert("You clicked at " + item);
    // axis coordinates for other axes, if present, are in pos.x2, pos.x3, ...
    // if you need global screen coordinates, they are pos.pageX, pos.pageY

    if (item) {
        highlight(item.series, item.datapoint);
        alert("You clicked a point!");
    }
  });
}
