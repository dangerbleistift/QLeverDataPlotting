// global datasets
var currentDataQuery = document.getElementById("query").value;
var currentPlotType = document.getElementById("plot").value;
var currentSorting = document.getElementById("sorting").value;

var currentDataSet = [];

// Button controlled loading of preset settings.
function loadPreset(preset)
{
    switch(preset) {
        case 'eyes':
            currentDataQuery = "data_eyes";
            currentPlotType = "chart_bubble";
            currentSorting = "unsorted";
            break;
        case 'population':
            currentDataQuery = "data_population";
            currentPlotType = "chart_bar";
            currentSorting = "descending";
            break;
        case 'births':
            currentDataQuery = "data_births";
            currentPlotType = "chart_line";
            currentSorting = "unsorted";
            break;
    }
    matchNavbarToPreset();
    queryAndPlot();
}

// Sets the values in the dropdown menus to the current settings.
function matchNavbarToPreset()
{
    document.getElementById("query").value = currentDataQuery;
    document.getElementById("plot").value = currentPlotType;
    document.getElementById("sorting").value = currentSorting;
}

function changePlotType(newPlotType) 
{
    currentPlotType = newPlotType;
    plot();
}

function changeDataQuery(newDataSet)
{
    currentDataQuery = newDataSet;
    queryAndPlot();
}

// Asynchronously query data from current sparql query and plot it.
function queryAndPlot() 
{
    resetChartDiv();
    // Get data async
    queryCurrentDataset().then(dataset => {
        currentDataSet = dataset;
        plot();
    });
}

function changeSorting(newSorting)
{
    currentSorting = newSorting;
    plot();
}

// Clears the div of the chart
function resetChartDiv()
{
    // Reset div
    document.getElementById('chart').innerHTML="";
}

function plot() {
    resetChartDiv();
    var sortedDataSet = sort(currentDataSet);
    switch (currentPlotType) {
        case 'chart_bar':
            barchart(sortedDataSet);
            break;
        case 'chart_bubble':
            bubblechart(sortedDataSet);
            break;
        case 'chart_line':
            linechart(sortedDataSet);
            break;
    }
}

// Async wikidata query call
function queryCurrentDataset() {
    var query;
    switch(currentDataQuery) {
        case 'data_eyes':
            query = sparqlQuery_eyeColors;
            break;
        case 'data_population':
            query = sparqlQuery_population;
            break;
        case 'data_births':
            query = sparqlQuery_birth;
            break;
    }
    return executeQuery(query).then(result => {
        return convertToLabelValueList(result);
    });

}

// Sorts an Array
function sort(array) 
{
    var sortedArray = [...array];
    if (currentSorting != "unsorted") {
        sortedArray.sort((a, b) => {return currentSorting == "descending" ? b.value - a.value : a.value - b.value;});
    }
    return sortedArray;
}


// Convert list of wikidata-results list of {'label', 'value'} objects
function convertToLabelValueList(dataset) {
    var array = [];
    // Build array of {'label', 'value'} objects
    dataset.forEach(item => {
        array.push(extractDataFromObject(item));
    });
    return array;
}

// Extract data from an Object into a {'label', 'value'} Object
function extractDataFromObject(dataObject) {    
    var object = {};
    Object.keys(dataObject).forEach(key => {
        var item = dataObject[key];

        // Value of result is stored in object containing property datatype
        if (key == "count") {
            object.value = Number(item.value);
        }
        else {
            object.label = item.value;
        }

    });

    return object;

}

queryAndPlot();


