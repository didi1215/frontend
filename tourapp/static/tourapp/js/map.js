// 创建地图
function createMap(tourLat, tourLon) {
    // console.log('------------------------')
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;

            // 获取HTML模板中的经纬度值
            // var tourStartLat = parseFloat("{{ tour_starting_point_lat }}");
            // var tourStartLon = parseFloat("{{ tour_starting_point_lon }}");

            var lineData = [{
                type: 'scattermapbox',
                mode: 'lines',
                lon: [longitude, tourLon, null],
                lat: [latitude, tourLat, null],
                marker: {
                    size: 14
                },
                text: ['Current Location', 'Tour Starting Point']
            }];
            // console.log(lineData+'.....')
            // var data = [
                // lineData,
                // {
                //     type: 'scattermapbox',
                //     lat: [tourLat],
                //     lon: [tourLon],
                //     mode: 'markers',
                //     marker: {
                //         size: 14
                //     },
                //     text: ['Starting Point']
                // }
            // ];

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

            Plotly.newPlot('mymap', lineData, layout);
        });
    }
}
