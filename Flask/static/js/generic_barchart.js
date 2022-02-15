


function barchart(dataset)
{
    var margin = 80
    var padding = 5
    var barWidth = 60

    // Fix svg Height
    var svgHeight = 500
    var chartHeight = svgHeight - 2 * margin

    // svg Width scaling with number of items in dataset
    var chartWidth = barWidth * dataset.length + padding * (dataset.length - 1)
    var svgWidth = chartWidth + 2 * margin
    
    // Create svg container
    var svg = d3
        .select('#chart')
            .append('svg')
            .attr('width', svgWidth)
            .attr('height', svgHeight)

    // Create scale dimensions. x has labels, y is numeric linear.
    var xScale = d3.scaleBand().range([0,chartWidth]).padding(0)
    var yScale = d3.scaleLinear().range([chartHeight, 0])

    // Create subcontainer containing the actual plotting, with margin to parent container
    var g = svg.append("g")
        .attr("transform", `translate(${margin}, ${margin})`)

    // Create values for the axes.
    xScale.domain(dataset.map(item => {return item.label}))
    yScale.domain([0, d3.max(dataset, item => {return item.value})])
    // The next step is to create the rectangles that will make up the bars in our bar chart.
    
    // Draw x axis at bottom of plot
    g.append("g")
        .attr("transform", `translate(${0}, ${chartHeight})`)
        .call(d3.axisBottom(xScale))

    // Draw y axis
    g.append("g")
        .call(d3.axisLeft(yScale))

    // Add data bars to plot
    var bars = g.selectAll('rect')
        .data(dataset)
        .enter()
        .append('rect')
            .attr('x', item => {return xScale(item.label) + padding})
            .attr('y', item => {return yScale(item.value)})
            .attr('width', xScale.bandwidth() - 2*padding)
            .attr('height', item => {return chartHeight - yScale(item.value)})
            .attr('fill', 'pink')
}

/**
 *  Gets the maximum value in a collection of {'label', 'value'} objects
 */
 function getMax(collection) {
    var max = 0
    collection.forEach(element => {
        var value = element.value
        max = value > max ? value : max
    })
    return max;
}

