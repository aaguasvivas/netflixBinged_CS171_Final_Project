let margin = {top: 10, right: 10, bottom: 10, left: 10};
let width = 960 - margin.left - margin.right;
let height = 500 - margin.top - margin.bottom;
let projection = d3.geoNaturalEarth1()
    .center([0, 15])
    .rotate([-9,0])
    .scale([1300/(2*Math.PI)])
    .translate([450,300]);

let  path = d3.geoPath()
    .projection(projection);

// Append svg to correct html
let worldMapSVG = d3.select("div#worldMap.col").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");