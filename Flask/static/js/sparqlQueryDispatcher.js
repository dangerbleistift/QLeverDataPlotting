class SPARQLQueryDispatcher {
	constructor( endpoint ) {
		this.endpoint = endpoint;
	}

	query( sparqlQuery ) {
		const fullUrl = this.endpoint + '?query=' + encodeURIComponent( sparqlQuery );
		const headers = { 'Accept': 'application/sparql-results+json' };

		return fetch( fullUrl, { headers } ).then( body => body.json() );
	}
}

const sparqlQuery_eyeColors = `#Popular eye colors among humans
#title:Popular eye colors among humans
#illustrates bubblechart view, count

#defaultView:BubbleChart
SELECT ?eyeColorLabel (COUNT(?human) AS ?count)
WHERE
{
  ?human wdt:P31 wd:Q5.
  ?human wdt:P1340 ?eyeColor.
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
}
GROUP BY ?eyeColorLabel`;

const sparqlQuery_population = `#Countries sorted by population
# defaultView:BubbleChart
SELECT DISTINCT ?countryLabel ?population
{
  ?country wdt:P31 wd:Q6256 ;
           wdt:P1082 ?population .
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en" }
}
GROUP BY ?population ?countryLabel`


function executeQuery(sparqlQuery) {
    var endpointUrl = 'https://query.wikidata.org/sparql';
    var queryDispatcher = new SPARQLQueryDispatcher( endpointUrl );
    return queryDispatcher.query( sparqlQuery ).then( result => {
        return result.results.bindings
    } );

}