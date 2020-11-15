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
let svg = d3.select("div#subscribersByPlatform.col").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// get the data, using promises
let dataset = d3.csv("data/streamingPlatformsSubscribers.csv");
dataset.then(function(data) {
    data.map(function(d) {
        d.numSubscribers = parseInt(d.numSubscribers);
        return d;
    });
});

console.log(dataset)

dataset.then(function(data) {
    // Set domains
    x.domain(data.map(function(d) { return d.platform; }));
    y.domain([0, d3.max(data, function(d) { return d.numSubscribers; })]);

    // appending rectangles
    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.platform); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(d.numSubscribers); })
        .attr("height", function(d) { return height - y(d.numSubscribers);
        })
        .attr("fill", (d, i) => {
            return color[i % 6]
        });

    // add x-axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // add y-axis
    svg.append("g")
        .call(d3.axisLeft(y));

    // text label for the x axis
    svg.append("text")
        .attr("transform",
            "translate(" + (width/2) + " ," +
            (height + margin.top + 20) + ")")
        .style("text-anchor", "middle")
        .text("Platform")
        .attr("fill", "white")
        .attr("fontSize", 22);

    // text label for the y axis
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Subscribers (in Millions)")
        .attr("fill", "white")
        .attr("fontSize", 22);

    // TODO add labels to bars
    // svg.selectAll("text")
    //     .data(data)
    //     .enter()
    //     .append("text")
    //     .text(function(d) { return d.numSubscribers; })
    //     .attr("x", function(d){
    //         return x(d.platform) + x.bandwidth() / 2;
    //     })
    //     .attr("y", function(d){
    //         return height - y(d.numSubscribers) + 14;
    //     })
    //     .attr("font-family" , "sans-serif")
    //     .attr("font-size" , 18)
    //     .attr("fill" , "white")
    //     .attr("text-anchor", "middle");


})

