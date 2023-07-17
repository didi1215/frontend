let tinydata = null;

$(document).ready(function() {
    $("#category-btn").click(function() {
        // console.log('test1')
        getTours();
    });

    function getTours() {
        // console.log('test3')
        var userInput = $("#user-input").val();

        // 获取用户位置信息
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            userLocation = longitude + ',' + latitude;
            var payload = {
            sentence: userInput,
            location: '',
            n: 50
        };

        // 发送 POST 请求到 API
        $.ajax({
            url: "http://127.0.0.1:8080/recommend-tours/",
            type: "POST",
            data: JSON.stringify(payload),
            contentType: "application/json",
            success: function (response) {
                $("#tours-list").empty();
                var responseData = response;
                var userQuery = responseData.user_query;
                var recommendedTours = responseData.recommended_tours;

                tinydata = recommendedTours

                if (recommendedTours.length > 0) {
                    for (var i = 0; i < recommendedTours.length; i++) {
                        var tour = recommendedTours[i];
                        var card = $("#newTour").clone();
                        card.attr("card_id", i);
                        card.find(".tour-text").text(tour.tour_title);
                        card.find(".card-img-top").attr("src", tour.image_url);
                        $("#tours-list").append(card);
                        card.show();
                        card.on("click", function() {
                        // Get the tour_id of the clicked card
                        var tourId = $(this).attr("card_id");
                        $.ajax({
                            url: "http://127.0.0.1:8001/tourapp/tour/"+ tourId +"/details/",
                            type: "POST",
                            data: JSON.stringify(tinydata),
                            contentType: "application/json",
                            success: function (tinyresponse) {
                                var tinyresponseData = tinyresponse;
                                document.write(tinyresponseData);
                                console.log(tinyresponseData);
                            },
                        });

                    })
                }
                }
            },
            error: function(error) {
                console.log(error);
            }
        });
            })
        }

    }
});

