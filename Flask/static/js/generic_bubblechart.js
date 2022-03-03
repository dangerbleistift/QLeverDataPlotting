function bubblechart(dataset)
{
    // setup sizes
    var margin = 50;
    var svgHeight = 200 * Math.log(dataset.length);
    var svgWidth = 300 * Math.log(dataset.length);


    var chartHeight = svgHeight -2 * margin;
    var chartWidth = svgWidth - 2 * margin;

    var rMin = 20;
    var rMax = 200;

    // Create container
    var svg = d3
        .select('#chart')
            .append('svg')
            .attr('width', svgWidth)
            .attr('height', svgHeight);

    // Scale values linearly between min and max value
    var rScale = d3.scaleLinear()
        .range([rMin, rMax])
        .domain([d3.min(dataset, item => item.value), d3.max(dataset, item => item.value)]);
    
    // Simulate spreading of bubbles
    var simulation = d3.forceSimulation(dataset)
        .force("center", d3.forceCenter().strength(0.1).x(Math.random() * 100 - 50 ).y(Math.random() * 100 - 50))
        .force("charge", d3.forceManyBody().strength([1]))
        .force("collide", d3.forceCollide().strength(0.2).radius(item => 1.1 * rScale(item.value)).iterations(1))
        //.force("x", d3.forceX())
        //.force("y", d3.forceY())
        .on("tick", ticked);

		function ticked(e) {
			node.attr("transform",function(d) {
				return "translate(" + [d.x+(chartWidth / 2), d.y+((chartHeight+margin) / 2)] +")";
			})
            .attr('x', 1000)
            ;
		}

    // Create cirecles
    var node = svg.selectAll('circle')
        .data(dataset)
        .enter()
        .append('g')
        .attr("transform", `translate(${10}, ${10})`)
        .attr('fx', 1000);

    
    // Add Bubble visuals
    node.append('circle')
            .attr('r', item => {return rScale(item.value);})
            .attr('cx', 0)
            .attr('fill', 'pink');
    
    // Add bubble label
    node.append('text')
        .attr("text-anchor", "middle")
        .text(item => item.label)
        .attr("fill", "black");

    
}