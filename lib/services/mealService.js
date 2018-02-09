const $ = require('jQuery');
const MealHelper = require('../html_helpers/mealHelper')
const FoodHelper = require('../html_helpers/foodHelper')
const QuantifiedApi = require('../requests/quantified_api')

class MealService {
  constructor() {
    this._arrayOfFood = []
  }

  arrayOfFood(event) {
    if (event.target.checked) {
      this._arrayOfFood.push(event.target.value)
    } else {
      this._arrayOfFood = this._arrayOfFood.filter(e => e !== event.target.value);
    }
  }

  addMeals() {
    QuantifiedApi.getAllMeals()
      .then(data => {
        MealHelper.addTablesFromJSON(data)
      }).then(data => { MealHelper.initializeTotalsTable() })
  }

  deleteFromMeal(event) {
    let mealId = event.currentTarget.dataset.id
    let foodId = event.target.dataset.id
    QuantifiedApi.deleteFromMeal(mealId, foodId)
      .then(data => { 
        MealHelper.removeFromMeal(event)
      })
  }

  sendFood(mealId) {
    this._arrayOfFood.forEach((foodId) => {
      MealHelper.addToTotals(mealId, foodId)
      this.postFood(mealId, foodId)
      this._arrayOfFood = []
    })
    MealHelper.initializeTotalsTable()
  }

  postFood(mealId, foodId) {
    QuantifiedApi.postFoodMeal(mealId, foodId)
      .then(data => {
        let $foodRow = $(`table#foods-table .food-${foodId}`)
        let $name = $foodRow.find('.food-name').text()
        let $calories = $foodRow.find('.food-calories').text()
        let $newRow = $(`<tr data-id=${mealId}></tr>`)
        let $lastTotal = $(`.meal[data-id=${mealId}]`).find('.darker')[0]
        $newRow.insertBefore($lastTotal)
        FoodHelper.addFoodInfo(mealId, $name, $calories, $newRow)
      })
  }

}

module.exports = MealService
