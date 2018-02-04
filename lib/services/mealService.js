const $ = require('jQuery');
const MealHelper = require('../html_helpers/mealHelper')

class MealService {
  constructor() {
    this._total = 0
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
      }).then(data => { this.initializeTotalsTable() })
  }

  initializeTotalsTable() {
    let remaining = 2000 - this._total
    let $remainingBox = $('#remaining-calories')
    $('#calories-consumed').text(this._total)
    $remainingBox.text(remaining)
    $remainingBox.addClass(this.colorOfRemaining(remaining))
  }

  deleteFromMeal(mealId, foodId) {
    debugger
    fetch(API + `meals/${mealId}/foods/${foodId}` , { method: 'DELETE' })
      .then(response => { debugger })
  }

  sendFood(mealId) {
    this._arrayOfFood.forEach((foodId) => {
      $(`table#foods-table input[value=${foodId}]`)[0].checked = false
      this.updateMeals(mealId)
      this.postFood(mealId, foodId)
      this._arrayOfFood = []
    })
  }

  postFood(mealId, foodId) {
    fetch(API + `meals/${mealId}/foods/${foodId}`,{
      method: "POST"
    })
    .then(response => response.json())
    .then(data => {
      let $foodRow = $(`table#foods-table .food-${foodId}`)
      let $name = $foodRow.find('.food-name').text()
      let $calories = $foodRow.find('.food-calories').text()
      let $newRow = $(`<tr data-id=${mealId}></tr>`)
      let $lastTotal = $(`.meal[data-id=${mealId}]`).find('.darker')[0]
      $newRow.insertBefore($lastTotal)
      this.addInfo(mealId, $name, $calories, $newRow)
    })
  }

  updateMeals(id) {
    debugger
    let $table = $(`table.meal[data-id=${id}]`)
    $table.find('.darker').remove()
    let $calories = $table.find('td.food-calories')
    let subtotal = 0
    $calories.each((ind, calorie) => {
      subtotal += parseInt(calorie.textContent)
    })
    this._total += subtotal
    $table.append(`<tr class='darker'><td>Total Calories</td><td class="total">${subtotal}</td></td>`)
    let remaining = this.remainingCalories(parseInt(id), subtotal)
    let color = this.colorOfRemaining(remaining)
    let remainingElement = $(`<tr class='darker'><td>Remaining Calories</td><td class=${color}>${remaining}</td></tr>`)
    $table.append(remainingElement)
  }

}

module.exports = MealService
