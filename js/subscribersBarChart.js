// set the dimensions and margins of the graph
let margin = {top: 20, right: 20, bottom: 40, left: 70},
    width = 700 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

// set the ranges
let x = d3.scaleBand()
    .range([0, width])
    .padding(0.1);
let y = d3.scaleLinear()
    .range([height, 0]);

let color = ["#E50914", "#00A8E1", "#b8d6e9", "#3DBB3D", "#c4302b", "#f6f3ed"]

// Append svg to correct html
let svgSubscribers = d3.select("div#subscribersByPlatform.col").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// get the data, using promises
let subsDataset = d3.csv("data/streamingPlatformsSubscribers.csv");
subsDataset.then(function(data) {
    data.map(function(d) {
        d.numSubscribers = parseInt(d.numSubscribers);
        return d;
    });
});

var subscribers_tip = d3.tip()
    .attr('class', 'd3-tip subscribers')
    .html(function(d) {
        return "<strong>Platform:</strong> <span style='color:red'>" + d.platform + "<br>" + "</span>" +
            "<strong>Number of Subscribers:</strong> <span style='color:red'>" + parseInt(d.numSubscribers) + " Million" + "</span>";
    })

svgSubscribers.call(subscribers_tip);

subsDataset.then(function(data) {
    // Set domains
    x.domain(data.map(function(d) { return d.platform; }));
    y.domain([0, d3.max(data, function(d) { return d.numSubscribers; })]);

    let bars = svgSubscribers.selectAll(".bar")
        .data(data)

    // appending rectangles
    bars.enter()
        .append("rect")
        .attr("class", "bar")
        .attr("fill", (d, i) => {
            return color[i % 6]
        })
        .merge(bars)
        .attr("pointer-events", "all")
        .attr("x", function(d) { return x(d.platform); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(d.numSubscribers); })
        .attr("height", function(d) { return height - y(d.numSubscribers);
        })
        .on('mouseover', function (event, d) {
            subscribers_tip.show(d, this);
        })
        .on("mouseout", function (event, d) {
            subscribers_tip.hide(d, this);
        });

    // add x-axis
    svgSubscribers.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // add y-axis
    svgSubscribers.append("g")
        .call(d3.axisLeft(y));

    // text label for the x axis
    svgSubscribers.append("text")
        .attr("transform",
            "translate(" + (width/2) + " ," +
            (height + margin.top + 20) + ")")
        .style("text-anchor", "middle")
        .text("Platform")
        .attr("fill", "white")
        .attr("fontSize", 22);

    // text label for the y axis
    svgSubscribers.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Subscribers (in Millions)")
        .attr("fill", "white")
        .attr("fontSize", 22);


})

