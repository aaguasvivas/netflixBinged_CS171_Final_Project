// https://www.macrotrends.net/stocks/charts/NFLX/netflix/revenue

// Append svg to correct html
let svgRevenue = d3.select("div#revenueNetflix.col.revenue").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// get the data, using promises
let revenueData = d3.csv("data/revenueNetflix.csv");
revenueData.then(function(data) {
    data.map(function(d) {
        d.revenue = parseInt(d.revenue)
        return d;
    });
});

console.log("revenue", revenueData)

revenueData.then(function(data) {
    // Set domains
    x.domain(data.map(function(d) { return d.year; }));
    y.domain([0, d3.max(data, function(d) { return d.revenue; })]);

    // appending rectangles
    svgRevenue.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.year); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(d.revenue); })
        .attr("height", function(d) { return height - y(d.revenue);
        })
        .attr("fill", "white");

    // add x-axis
    svgRevenue.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // add y-axis
    svgRevenue.append("g")
        .call(d3.axisLeft(y));

    // text label for the x axis
    svgRevenue.append("text")
        .attr("transform",
            "translate(" + (width/2) + " ," +
            (height + margin.top + 20) + ")")
        .style("text-anchor", "middle")
        .text("Year")
        .attr("fill", "white")
        .attr("fontSize", 22);

    // text label for the y axis
    svgRevenue.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Revenue (in Millions US Dollars)")
        .attr("fill", "white")
        .attr("fontSize", 22);

    // TODO add labels to bars
    svgRevenue.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .text(function(d) { return d.revenue; })
        .attr("x", function(d){
            return x(d.year) + x.bandwidth() / 2;
        })
        .attr("y", function(d){
            return height - y(d.revenue) + 14;
        })
        .attr("font-family" , "sans-serif")
        .attr("font-size" , 18)
        .attr("fill" , "red")
        .attr("text-anchor", "middle");


})