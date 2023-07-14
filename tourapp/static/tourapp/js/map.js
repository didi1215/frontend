<<<<<<< HEAD
function createMap(tourLat, tourLon) {
=======
function createMap(tourLat, tourLon) {    
>>>>>>> d9b22fe99abcf02375160146949661983b7c89af
    // console.log('------------------------')
    if (navigator.geolocation) {        
        navigator.geolocation.getCurrentPosition(function (position) {
            var latitude = position.coords.latitude;            
            var longitude = position.coords.longitude;
<<<<<<< HEAD

            var data = [
                {
                    type: 'scattermapbox',
                    lat: [tourLat],
                    lon: [tourLon],
                    mode: 'markers',
                    marker: {
                        size: 14
                    },
                    text: ['Starting Point']
                },
                {
                    type: 'scattermapbox',
                    lat: [latitude],
                    lon: [longitude],
                    mode: 'markers',
                    marker: {
                        size: 14
                    },
                    text: ['Current Location']
                }
            ];

=======
                        
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
>>>>>>> d9b22fe99abcf02375160146949661983b7c89af
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
<<<<<<< HEAD

            Plotly.newPlot('mymap', data, layout);
=======
            Plotly.newPlot('mymap', data, layout);        
>>>>>>> d9b22fe99abcf02375160146949661983b7c89af
        });
    }}
