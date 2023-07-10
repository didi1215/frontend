// function getLocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function (position) {
//       var latitude = position.coords.latitude;
//       var longitude = position.coords.longitude;
//
//       // 获取HTML模板中的经纬度值
//       var tourStartLat = parseFloat("{{ tour_starting_point_lat }}");
//       var tourStartLon = parseFloat("{{ tour_starting_point_lon }}");
//
//       createMap(latitude, longitude, tourStartLat, tourStartLon);
//     });
//   } else {
//     console.log('Geolocation is not supported by this browser.');
//   }
// }
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
                lon: [longitude, tourLon],
                lat: [latitude, tourLat],
                marker: {
                    size: 14
                },
                text: ['Current Location', 'Tour Starting Point']
            }];
            console.log(lineData)
            var data = [
                lineData,
                {
                    type: 'scattermapbox',
                    lat: [tourLat],
                    lon: [tourLon],
                    mode: 'markers',
                    marker: {
                        size: 14
                    },
                    text: ['Starting Point']
                }];

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
    }
}

// 页面加载完成后获取用户位置并创建地图
// window.onload = getLocation;

// 页面加载完成后创建地图
// document.addEventListener("DOMContentLoaded", createMap);
// window.onload = function() {
//     // 在文档加载完成后执行的代码
//     createMap(); // 调用您的createMap函数
// };
