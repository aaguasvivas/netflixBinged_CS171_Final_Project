class MapVis {

    constructor(parentElement, geoData, internationalData) {
        this.parentElement = parentElement;
        this.geoData = geoData;
        this.internationalData = internationalData;

        // define colors
        this.colors = ['#fee5d9','#fcae91','#fb6a4a','#cb181d']

        this.initVis()
    }

    initVis() {
        let vis = this;


        vis.margin = {top: 20, right: 20, bottom: 20, left: 20};
        vis.width = $("#" + vis.parentElement).width() - vis.margin.left - vis.margin.right;
        vis.height = $("#" + vis.parentElement).height() - vis.margin.top - vis.margin.bottom;

        // init drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width)
            .attr("height", vis.height)
            .attr('transform', `translate (${vis.margin.left}, ${vis.margin.top})`);

        // add title
        vis.svg.append('g')
            .attr('class', 'title map-title')
            .append('text')
            .text('Title for Map')
            .attr('transform', `translate(${vis.width / 2}, 20)`)
            .attr('text-anchor', 'middle');

        // TODO

        // Create a projection
        vis.projection = d3.geoNaturalEarth1().scale(220) // d3.geoStereographic()
            .translate([vis.width / 2, vis.height / 2])

        // define a geo generator and pass your projection to it
        vis.path = d3.geoPath()
            .projection(vis.projection);

        // convert your TopoJSON data into GeoJSON data structure
        vis.world = topojson.feature(vis.geoData, vis.geoData.objects.countries).features

        // sphere
        vis.svg.append("path")
            .datum({type: "Sphere"})
            .attr("class", "graticule")
            .attr('fill', '#ADDEFF')
            .attr("stroke","rgba(129,129,129,0.35)")
            .attr("d", vis.path);

        // graticule
        vis.svg.append("path")
            .datum(d3.geoGraticule())
            .attr("class", "graticule")
            .attr('fill', '#ADDEFF')
            .attr("stroke","rgba(129,129,129,0.35)")
            .attr("d", vis.path);

        // draw countries
        vis.countries = vis.svg.selectAll(".country")
            .data(vis.world)
            .enter().append("path")
            .attr('class', 'country')
            .attr("d", vis.path)
            .attr("opacity","0.2")
            .style("fill","MidnightBlue")

        // append tooltip
        vis.tooltip = d3.select("body").append('div')
            .attr('class', "tooltip")
            .attr('id', 'mapTooltip')

        // legend
        vis.legend = vis.svg.append("g")
            .attr('class', 'legend')
            .attr('transform', `translate(${vis.width * 2.8 / 4}, ${vis.height - 20})`)

        vis.legendText = vis.svg.append("g")
            .attr('class', 'legend')
            .attr('transform', `translate(${vis.width * 2.8 / 4}, ${vis.height - 20})`)

        // TODO: Get the right domain
        let dataExtent = d3.extent(vis.internationalData)
        console.log("Data Extent", dataExtent)

        vis.colorScale = d3.scaleQuantize()
            .domain(d3.extent(vis.internationalData))
            .range(vis.colors)
            .unknown("gray");


        let m0,
            o0;

        vis.svg.call(
            d3.drag()
                .on("start", function (event) {

                    let lastRotationParams = vis.projection.rotate();
                    m0 = [event.x, event.y];
                    o0 = [-lastRotationParams[0], -lastRotationParams[1]];
                })
                .on("drag", function (event) {
                    if (m0) {
                        let m1 = [event.x, event.y],
                            o1 = [o0[0] + (m0[0] - m1[0]) / 4, o0[1] + (m1[1] - m0[1]) / 4];
                        vis.projection.rotate([-o1[0], -o1[1]]);
                    }

                    // Update the map
                    vis.path = d3.geoPath().projection(vis.projection);
                    d3.selectAll(".country").attr("d", vis.path)
                    d3.selectAll(".graticule").attr("d", vis.path)
                })
        )

        vis.wrangleData()

    }

    wrangleData(){
        let vis = this;
        // console.log(vis.internationalData.country["Cuba"])
        // console.log(vis.geoData.objects.countries.geometries)

        // create random data structure with information for each land
        vis.countryInfo = {};

        // console.log("country", vis.countryList)

        vis.geoData.objects.countries.geometries.forEach( d => {
            console.log(d.properties.name)

            let country = vis.internationalData.find(c => {
                return d.properties.name === c.country
            })

            if (country) {
                vis.countryInfo[d.properties.name] = {
                    name: d.properties.name,
                    numTVShows: country.numTVShows,
                    numMovies: country.numMovies,
                    totalCatalog: (country.numTVShows + country.numMovies),
                }
            } else {
                vis.countryInfo[d.properties.name] = {
                    name: d.properties.name,
                    numTVShows: null,
                    numMovies: null,
                    totalCatalog: null,
                }
            }


        })
        console.log("Country Info", vis.countryInfo);

        vis.updateVis()
    }



    updateVis(){
        let vis = this;

        // TODO
        vis.countries
            .attr("opacity","0.8")
            .style("fill", (d) => vis.colorScale(vis.countryInfo[d.properties.name].totalCatalog))
            .on('mouseover', function(event, d){
                d3.select(this)
                    .attr('stroke-width', '2px')
                    .attr('stroke', 'black')
                    .attr('fill', 'rgba(173,222,255,0.62)')


                vis.tooltip
                    .style("opacity", 1)
                    .style("left", event.pageX + 20 + "px")
                    .style("top", event.pageY + "px")
                    .html(`
                         <div style="border: thin solid grey; border-radius: 5px; background: lightgrey; padding: 20px">
                             <h3>${d.properties.name}<h3>
                             <h4> Name: ${d.properties.name}</h4>      
                             <h4> Number of TV Shows: ${vis.countryInfo[d.properties.name].numTVShows}</h4> 
                             <h4> Number of Movies: ${vis.countryInfo[d.properties.name].numMovies}</h4>   
                             <h4> Total Catalog: ${vis.countryInfo[d.properties.name].totalCatalog}</h4>                         
                         </div>`);
            })
            .on('mouseout', function(event, d){
                d3.select(this)
                    .attr('stroke-width', '0px')
                    .attr("fill", d => vis.colorScale(vis.countryInfo[d.properties.name].totalCatalog))

                vis.tooltip
                    .style("opacity", 0)
                    .style("left", 0)
                    .style("top", 0)
                    .html(``);
            });

        // update legend
        vis.world.forEach(function(d) {
            d.properties.value = vis.countryInfo[d.properties.name].value;

        })

        var domain = d3.extent(vis.world, function(d) {
            return d.properties.value;
        });

        vis.legendText.selectAll()
            .data(vis.colors)
            .enter()
            .append('text')
            .text((d, i) => ((domain[1] - domain[0]) / 4 * i + domain[0]).toFixed(5))
            .attr("x", 80)
            .attr("y", (d, i) => i * 23 - 70)

        vis.legend.selectAll()
            .data(vis.colors)
            .enter()
            .append("rect")
            .attr("x", 50)
            .attr("y", (d, i) => i * 20 - 80)
            .attr("width", 20)
            .attr("height", 20)
            .attr("fill", d => d);


    }
}