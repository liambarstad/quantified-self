const $ = require('jQuery')
const MS = require('../services/mealService')
const FoodService = require('../services/foodService')
const MealService = new MS

$(document).ready(() => {
  MealService.addMeals();

  $('#filter-food').on('keyup', (event) => {
    FoodService.displayWith($(event.target).val())
  });
  
  $('table.meal').on('click', (event) => {
    if (event.target.hasClass('delete-food')) {
      let mealId = event.currentTarget.dataset.id
      let foodId = event.target.dataset.id
      MealService.deleteFromMeal(mealId, foodId) 
    }
  });

})
