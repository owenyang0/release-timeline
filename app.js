var margin = {top: 300, right: 50, bottom: 50, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var t1 = new Date(2015, 0, 1),
    t2 = new Date(2015, 3, 1),
    t0 = d3.time.month.offset(t1, 0),
    t3 = d3.time.month.offset(t2, 0);


var x = d3.time.scale()
    .domain([t0, t3])
    .range([t0, t3].map(d3.time.scale()
      .domain([t1, t2])
      .range([0, width])))

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks(d3.time.weeks, 1)
    .tickSize(10, 10);

var xLinear = d3.scale.linear()
    .domain([0, width])
    .range([0, width]);

var xAxisPot = d3.svg.axis()
    .scale(xLinear)
    .orient("bottom")
    .ticks(120)
    .tickSize(10, 0);

var svg = d3.select(".main").append("svg")
    .attr('class', 'tick-mark')
    .attr("width", width + margin.left + margin.right)
    .attr("height", 500)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var svg2 = d3.select(".main").append("svg")
    .attr('class', 'tick-pot')
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + 5 + ")");

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + 100 + ")")
    .call(xAxis)
  .selectAll("text")
    .attr("y", 20)
    .attr("x", -10)
    .style("text-anchor", "start")

// svg2.append("g")
//     .attr("class", "x axis x-ticks")
//     .call(xAxisPot)
//   .selectAll("text")
//     .style("display", "none")

var format = d3.time.format("%Y-%m");

svg.select('.x')
    .append("g")
    .attr("class", "date-start")
    .append('text')
    .attr("x", -30)
    .attr("y", 28)
    .style("text-anchor", "start")
    .text(format(t1));

svg.select('.x')
    .append("g")
    .attr("class", "date-end")
    .append('text')
    .attr("x", width)
    .attr("y", 28)
    .style("text-anchor", "start")
    .text(format(t2));

var ticks = svg.selectAll('.tick');

ticks.select('g')
  .append("text")
  .attr("y", 220)
  .attr("x", -10)
  .text('Text')

ticks.each(function (t) {
  // d3.select(this).selectAll('line').remove();
  // d3.select(this).append('circle').attr('r', 3).attr('fill', randomColor())
})

function randomColor() {
  var r = Math.random() * 255;
  var g = Math.random() * 255;
  var b = Math.random() * 255;

  return d3.rgb(r, g, b);
}


var dropPath = "M747.037,114.424c-0.091,27.814-17.808,50.303-39.568,50.229s-39.329-22.682-39.237-50.497 c0.092-27.815,17.808-50.303,39.568-50.229C729.562,64.001,747.129,86.609,747.037,114.424z"

function addDate(date, text) {
  var xPos = x(date);

  var g = svg.select('.axis')
    .append('g')
    .attr('class', 'ticks-new')
    .attr("transform", "translate(" + xPos + ",0)");

  var y2 = -getRandomArbitrary(60, 300);

  function mo() {
    var parent = d3.select(this.parentNode);

    parent.select('line')
      .style('stroke-opacity', 1);
    parent.select('.water-drop')
      .style('fill-opacity', 1)
  }

  function mout() {
    var parent = d3.select(this.parentNode);

    parent.select('line')
      .style('stroke-opacity', .5);
    parent.select('.water-drop')
      .style('fill-opacity', 0.5)
  }

  var lineColor = randomColor();

  g.append('circle')
    .attr('transform', 'translate(0, ' + 0 +')')
    .attr('r', 3)
    .attr('fill', randomColor())


  g
    .append('path')
    .attr('class', 'water-drop')
    .attr({d: dropPath})
    .attr('transform', 'translate(-355, ' + (y2 - 28) +') scale(0.5)')
    .style('fill', lineColor)
    .style("stroke", 'none')
    .on('mouseenter', mo)
    .on('mouseout', mout)

  g
    .append('line')
    .attr('x1', 0)
    .attr('y1', 0)
    .attr('x2', 0)
    .attr('y2', y2 + 50)
    .style("stroke-width", 1)
    .style("stroke", lineColor)
    .style("stroke-opacity", .5)
    .style("fill", "none")
    .on('mouseover', mo)
    .on('mouseout', mout)

  g.append('text')
    .attr('class', 'release-desc')
    .attr("y", y2)
    .attr("x", -20)
    .text(text)
}

function r() {
  var date = getRandomArbitrary(t1.valueOf(), t2.valueOf());
  addDate(date, 'Random')
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

for (var i = 8; i >= 0; i--) {
  r();
};
