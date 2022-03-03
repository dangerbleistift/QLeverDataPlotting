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
SELECT DISTINCT ?countryLabel ?count
{
  ?country wdt:P31 wd:Q6256 ;
           wdt:P1082 ?count .
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en" }
}
GROUP BY ?count ?countryLabel`;

const sparqlQuery_birth = `#Population growth in Suriname from 1960 onward
#defaultView:LineChart
SELECT ?year ?count {
  wd:Q730 p:P1082 ?p .
  ?p pq:P585 ?year ;
     ps:P1082 ?count .
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en" }
}
ORDER BY ?year`;


function executeQuery(sparqlQuery) {
    var endpointUrl = 'https://query.wikidata.org/sparql';
    var queryDispatcher = new SPARQLQueryDispatcher( endpointUrl );
    return queryDispatcher.query( sparqlQuery ).then( result => {
        return result.results.bindings;
    } );

}