const $ = require('jQuery')
const FS = require('../services/foodService')
const FoodService = new FS

$(document).ready(() => {
  FoodService.populateFoodTable();

  $('form input[value="submit"]').on('click', (event) => {
    event.preventDefault();
    FoodService.postFood();
  });

  $('#foods-table').on('click', (event) => {
     event.stopPropagation();
    if (event.target.className == 'delete-food') {
      FoodService.deleteFood(event.target);
    } else if (event.target.className.length > 0){
      FoodService.editBox(event.target);
    }
  });

  $('#filter-food-form').on('keyup', (event) => {
    FS.displayWith($(event.target).val())
  });

});
