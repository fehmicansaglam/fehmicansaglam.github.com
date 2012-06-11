function barchart(_container, _data, _keyProperty, _valueProperty) {
  var barWidth = 40,
      width = (barWidth + 10) * _data.length,
      height = 150;

var x = d3.scale.linear().domain([0, _data.length]).range([0, width]),
    y = d3.scale.linear().domain([0, d3.max(_data, function(item) { return item[_valueProperty]; })]).rangeRound([0, height]);

// add the canvas to the DOM
var chart = d3.select(_container).
  append("svg:svg").
  attr("width", width).
  attr("height", height+20);

chart.selectAll("rect").
  data(_data).
  enter().
  append("svg:rect").
  attr("x", function(item, index) { return x(index); }).
  attr("y", function(item) { return height - y(item[_valueProperty]); }).
  attr("height", function(item) { return y(item[_valueProperty]); }).
  attr("width", barWidth).
  attr("fill", "#2d578b");

chart.selectAll("text").
  data(_data).
  enter().
  append("svg:text").
  attr("x", function(item, index) { return x(index) + barWidth; }).
  attr("y", function(item) { return height - y(item[_valueProperty]); }).
  attr("dx", -barWidth/2).
  attr("dy", "1.2em").
  attr("text-anchor", "middle").
  text(function(item) { return item[_valueProperty];}).
  attr("fill", "white");

chart.selectAll("text.yAxis").
  data(_data).
  enter().append("svg:text").
  attr("x", function(item, index) { return x(index) + barWidth; }).
  attr("y", height).
  attr("dx", -barWidth/2).
  attr("text-anchor", "middle").
  attr("style", "font-size: 12; font-family: Helvetica, sans-serif").
  text(function(item) { return item[_keyProperty];}).
  attr("transform", "translate(0, 18)").
  attr("class", "yAxis");
}
