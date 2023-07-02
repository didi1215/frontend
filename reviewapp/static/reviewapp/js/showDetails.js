function showDetails(restaurantId) {
  window.location.href = "{% url 'reviewapp:details' restaurant_id=restaurantId %}";
}
