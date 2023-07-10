let tinydata = null;

$(document).ready(function() {
    $("#category-btn").click(function() {
        // console.log('test1')
        getTours();
    });
    // console.log('test2')
    // var userLocation = '';
    function getTours() {
        // console.log('test3')
        var userInput = $("#user-input").val();

        // 获取用户位置信息
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            userLocation = latitude + ',' + longitude;
            var payload = {
            sentence: userInput,
            location: userLocation,
            n: 50
        };

        // 发送 POST 请求到 API
        $.ajax({
            url: "http://127.0.0.1:8000/recommend-tours/",
            type: "POST",
            data: JSON.stringify(payload),
            contentType: "application/json",
            success: function (response) {
                // 清空餐厅列表
                $("#tours-list").empty();
                // var responseData = JSON.parse(response);
                var responseData = response;
                // console.log(response)
                // 获取用户查询和推荐旅行的列表
                var userQuery = responseData.user_query;
                var recommendedTours = responseData.recommended_tours;
                // window.location.href = "/details"
                // window.location.href = "/details/?response=" + encodeURIComponent(JSON.stringify(response));
                tinydata = recommendedTours
                // 在控制台打印结果，以便调试
                // console.log(userQuery);
                // console.log(recommendedTours);

                // var resultElement = $("#result");
                // resultElement.html("<p>User Query: " + userQuery + "</p>");

                if (recommendedTours.length > 0) {
                    // 循环添加餐厅卡片
                    for (var i = 0; i < recommendedTours.length; i++) {
                        var tour = recommendedTours[i];
                        console.log(i)

                        var card = $("#newTour").clone();
                        console.log(card)
                        // var card_id = i;
                        card.attr("card_id", i);
                        // card.removeAttr("id");
                        card.find(".tour-text").text(tour.tour_title);
                        // card.find(".rating").text(restaurant.tour_duration);
                        card.find(".card-img-top").attr("src", tour.image_url);
                        // card.find(".pricing").text(restaurant.tour_id);
                        // JavaScript code to handle card click event
                        // $("#restaurants-list a").on("click", function(e) {
                        //     e.preventDefault();
                        //     var cardId = $(this).data("card-id");
                        //     var url = "/tourapp/resto/" + cardId + "/details/";
                        //     window.location.href = url;
                        // });
                        $("#tours-list").append(card);
                        card.show();
                        card.on("click", function() {
                        // Get the tour_id of the clicked card
                        var tourId = $(this).attr("card_id");
                        $.ajax({
                            url: "http://127.0.0.1:8001/tourapp/resto/"+ tourId +"/details/",
                            type: "POST",
                            data: JSON.stringify(tinydata),
                            contentType: "application/json",
                            success: function (tinyresponse) {
                                // var responseData = JSON.parse(response);
                                var tinyresponseData = tinyresponse;
                                // 获取用户查询和推荐旅行的列表
                                document.write(tinyresponseData);
                                console.log(tinyresponseData);
                                var img = tinyresponseData[img_url]
                            },

                        // window.location.href = "/tourapp/resto/details/"
                        // Redirect to the details page with the corresponding tour_id


                        // window.location.href = "/tourapp/resto/" + tourId + "/details/" + '?userInput=' + userInput;
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
        // 构建请求数据对象

    }
});

