
function createMap(tourLat, tourLon) {

    // console.log('------------------------')
    if (navigator.geolocation) {        
        navigator.geolocation.getCurrentPosition(function (position) {
            var latitude = position.coords.latitude;            
            var longitude = position.coords.longitude;

                        
            var data = [
                {                    
                    type: 'scattermapbox',
                    lat: [tourLat],                    
                    lon: [tourLon],
                    mode: 'markers',                    
                    marker: {
                        size: 14                    
                    },
                    text: ['Starting Point'],
                    name: 'Starting Point',               
                },
                {                    
                    type: 'scattermapbox',
                    lat: [latitude],                    
                    lon: [longitude],
                    mode: 'markers',                    
                    marker: {
                        size: 14                    
                    },
                    text: ['Current Location'],
                    name: 'Current Location'                
                }
            ];

            var layout = {
                autosize: true,                
                hovermode: 'closest',
                mapbox: {                    
                    center: {
                        lat: parseFloat(tourLat),                        
                        lon: parseFloat(tourLon)
                    },                   
                    zoom: 10,
                    style: 'open-street-map'                
                }
            };
            Plotly.newPlot('mymap', data, layout);

        });
    }}
