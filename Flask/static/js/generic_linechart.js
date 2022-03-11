function linechart(dataset)
{
    var margin = 80;

    // Fix svg Height
    var svgHeight = 500;
    var chartHeight = svgHeight - 2 * margin;

    // svg Width scaling with number of items in dataset
    var chartWidth = 800;
    var svgWidth = chartWidth + 2 * margin;
    
    // Create svg container
    var svg = d3
        .select('#chart')
            .append('svg')
            .attr('width', svgWidth)
            .attr('height', svgHeight);

    // Create scale dimensions. x is time scale, y is numeric linear.
    var xScale = d3.scaleTime().range([0,chartWidth]);
    var yScale = d3.scaleLinear().range([chartHeight, 0]);

    // Create subcontainer containing the actual plotting, with margin to parent container
    var g = svg.append("g")
        .attr("transform", `translate(${margin}, ${margin})`);

    // Create values for the axes.
    xScale.domain(d3.extent(dataset, item => {return new Date(item.label);}));
    yScale.domain([0, d3.max(dataset, item => {return item.value;})]);
    // The next step is to create the rectangles that will make up the bars in our bar chart.
    
    // Draw x axis at bottom of plot
    g.append("g")
        .attr("transform", `translate(${0}, ${chartHeight})`)
        .call(d3.axisBottom(xScale))
        .selectAll("text")
        .style("text-anchor", "start")
        .attr("transform", " rotate(10)");

    // Draw y axis
    g.append("g")
        .call(d3.axisLeft(yScale));
    // Add data to plot
    g.append("path")
        .datum(dataset)
            .attr("fill", "none")
            .attr("stroke", "black")
            .attr("stroke-width", 1.0)
            .attr("d", d3.line()
                .x(item => {return xScale(new Date(item.label));})
                .y(item => yScale(item.value))
            );
}

