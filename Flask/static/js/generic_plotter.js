// global datasets
var currentDataset;
var currentPlotName;

function plot(plotName) {
    currentPlotName = plotName
    document.getElementById('chart').innerHTML=""
    switch(plotName) {
        case 'chart_bar':
            barchart(currentDataset);
            break;
        case 'chart_circle':
            break;
        case 'chart_lineplot':
            break;
        default:
            console.error('Unknown plot type: ' + plotName);
    }
}


function data(datasetName) {
    switch(datasetName) {
        case 'data_eyes':
            currentDataset = convertToLabelValueList(datasets['eyes'])
            break;
        case 'data_eyes_half':
            currentDataset = convertToLabelValueList(datasets['halfeyes'])
            break;
        default:
            console.error('Unknown dataset: ' + datasetName);
    }
    plot(currentPlotName)
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
        var propertyValue = dataObject[key]
        var propertyValueAsNumber = Number(propertyValue)
        // Check if property is a number or NAN and set return objects property accordingly
        if (propertyValueAsNumber) {
            object.value = propertyValueAsNumber
        }
        else {
            object.label = propertyValue
        }

    })

    return object

}

data('data_eyes_half');
plot('chart_bar');



