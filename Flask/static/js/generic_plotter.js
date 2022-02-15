// global datasets
var currentDataset = 'data_eyes';
var currentPlotType = 'chart_bubble';

function changePlotType(newPlotType) 
{
    currentPlotType = newPlotType
    plot()
}

function changeDataset(newDataSet)
{
    currentDataset = newDataSet

    plot()
}

function plot() {
    // Reset div
    document.getElementById('chart').innerHTML=""
    // Get data async
    queryCurrentDataset().then(dataset => {
        switch (currentPlotType) {
            case 'chart_bar':
                barchart(dataset);
                break;
            case 'chart_bubble':
                bubblechart(dataset);
                break;
            case 'chart_lineplot':
                break;
        }
    })
}

// Async wikidata query call
function queryCurrentDataset() {
    var query;
    switch(currentDataset) {
        case 'data_eyes':
            query = sparqlQuery_eyeColors
            break;
        case 'data_population':
            query = sparqlQuery_population
            break;
    }
    return executeQuery(query).then(result => {
        return convertToLabelValueList(result)
    })
}


// Convert list of wikidata-results list of {'label', 'value'} objects
function convertToLabelValueList(dataset) {
    var array = []
    // Build array of {'label', 'value'} objects
    dataset.forEach(item => {
        array.push(extractDataFromObject(item))
    })
    // Sort descending
    array = array.sort((a, b) =>  {return b.value - a.value})
    return array
}

// Extract data from an Object into a {'label', 'value'} Object
function extractDataFromObject(dataObject) {    
    var object = {}
    Object.keys(dataObject).forEach(key => {
        var item = dataObject[key]

        // Value of result is stored in object containing property datatype
        if (item.hasOwnProperty('datatype')) {
            object.value = Number(item.value)
        }
        else {
            object.label = item.value
        }

    })

    return object

}

plot()



