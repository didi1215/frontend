// function getRestaurants(categoryId){
//     var endpoint = "/reviewapp/api/restaurants/list/";
//
//     $.ajax({
//         method: "GET",
//         url: endpoint,
//         data: {
//             category_id: categoryId,
//         },
//         success: function(data) {
//             if (data.restaurants){
//                 changeCategoryBackground(categoryId);
//                 displayRestaurants(data.restaurants);
//             }
//         }
//     });
// }
$(document).ready(function() {
    $("#category-btn").click(function() {
        getRestaurants();
    });
    function createTourCard(tour) {
      var card = $("<div>").addClass("card");
      var tourTitle = $("<div>").addClass("tour-title").text(tour.tour_title);
      // var tourDuration = $("<div>").addClass("tour-duration").text("Duration: " + tour.tour_duration + " minutes");
      // 添加其他旅行信息的显示元素

      card.append(tourTitle, tourDuration, /* 其他旅行信息的显示元素 */);
      return card;
    }

    function getRestaurants() {
        var userInput = $("#user-input").val();

        // 构建请求数据对象
        var payload = {
            sentence: "Käsealpe abwärts",
            n: 2
        };

        // 发送 POST 请求到 API
        $.ajax({
            url: "http://127.0.0.1:8000/recommend-tours/",
            type: "POST",
            data: JSON.stringify(payload),
            contentType: "application/json",
            success: function (response) {
                // 清空餐厅列表
                $("#restaurants-list").empty();
                // var responseData = JSON.parse(response);
                var responseData = response;
                // 获取用户查询和推荐旅行的列表
                var userQuery = responseData.user_query;
                var recommendedTours = responseData.recommended_tours;
                window.location.href = "/details/?response=" + encodeURIComponent(JSON.stringify(response));


                // 在控制台打印结果，以便调试
                console.log(userQuery);
                console.log(recommendedTours);
                // var resultElement = $("#result");
                // resultElement.html("<p>User Query: " + userQuery + "</p>");

                if (recommendedTours.length > 0) {
                    // 循环添加餐厅卡片
                    for (var i = 0; i < recommendedTours.length; i++) {
                        var restaurant = recommendedTours[i];
                        var card = $("#newRestaurant").clone();

                        // var card = createTourCard(restaurant);
                        // $("#newRestaurant").append(card);

                        // card.removeAttr("id");
                        // card.find(".restaurant-text").text(restaurant.name);
                        // card.find(".rating").text(restaurant.rating);
                        // card.find(".pricing").text(restaurant.pricing);
                        // card.find(".reviews").text(restaurant.reviews);
                        // card.find("img").attr("src", restaurant.image);
                        // card.find("tour_id").text(restaurant.name);

                        // card.find(".tour-id").text(restaurant.name);
                        // card.find(".tour-id").text(restaurant.rating);
                        card.find(".restaurant-text").text(restaurant.tour_title);
                        card.find(".rating").text(restaurant.tour_duration);
                        // card.find("img").attr("src", restaurant.reviews);
                        card.find(".pricing").text(restaurant.tour_id);



                        $("#restaurants-list").append(card);
                        card.show();
                    }
                } else {
                    // 显示错误提示
                    $("#none-found").show();
                }
            },
            error: function(error) {
                console.log(error);
            }
        });
    }
});

function changeCategoryBackground(categoryId){
    imageURL = "url('/static/reviewapp/images/cat"+categoryId+".jpg')";
    $('#category-banner').css("background-image", imageURL); 
}

function displayRestaurants(restaurants){
    console.log(restaurants);
    var restaurantsDiv = $("#restaurants-list");
    restaurantsDiv.empty();

    if (!restaurants.length){
        $("#none-found").fadeIn('slow');
        return;
    }

    $("#none-found").hide();
    restaurants.forEach(restaurant => {
        var newRestaurant = $("#newRestaurant").clone().removeAttr("id");
        newRestaurant.find("span.restaurant-id").text(restaurant.id);
        newRestaurant.find("span.restaurant-text").text(restaurant.restaurant_text);
        newRestaurant.find("span.address").text(restaurant.restaurant_address);
        newRestaurant.find("span.reviews").text(restaurant.review_amount);
        newRestaurant.find("span.category").text(restaurant.category);
        createStarRatings(newRestaurant.find("span.rating"), restaurant.rating);
        createPriceRatings(newRestaurant.find("span.pricing"), restaurant.pricing);
        var imgsrc = "/static/reviewapp/images/" + restaurant.id + ".jpg";
        newRestaurant.find("img").attr("src", imgsrc);
        var ahref = "/reviewapp/resto/" + restaurant.id + "/";
        newRestaurant.find("a").attr("href", ahref);
        newRestaurant.show();
        restaurantsDiv.prepend(newRestaurant[0]).hide().fadeIn('slow');
    });
}
function createStarRatings(ratingSpan , number){
    for (var i = 0; i < parseInt(number); i++) {
        ratingSpan.append('<i class="fas fa-star"/></i>');
    }
}
function createPriceRatings(priceSpan , number){
    for (var i = 0; i < parseInt(number); i++) {
        priceSpan.append('<i class="fas fa-dollar-sign"></i>');
    }
}