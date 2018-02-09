const $ = require('jQuery')
const MS = require('../services/mealService')
const FoodService = require('../services/foodService')
const MealService = new MS

$(document).ready(() => {
  MealService.addMeals();

  $('#filter-food').on('keyup', (event) => {
    FoodService.displayWith($(event.target).val())
  });
  
  setTimeout(() => {
    $('table.meal').on('click', (event) => {
      if ($(event.target).hasClass('delete-food')) {
        let mealId = event.currentTarget.dataset.id
        let foodId = event.target.dataset.id
        MealService.deleteFromMeal(event)
      }
    });
  }, 3000)

  $('#foods-table').on('click', (event) => {
    event.stopPropagation();
    if (event.target.type === "checkbox") {
      MealService.arrayOfFood(event);
    }
  });

  $('.add-to-meal-button').on('click', (event) => {
     event.stopPropagation();
     let mealId = event.target.dataset.id;
     MealService.sendFood(mealId)

  })

})
