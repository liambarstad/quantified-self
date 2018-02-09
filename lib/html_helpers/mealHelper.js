const $ = require('jQuery')
const FoodHelper = require('./foodHelper')

class MealHelper {
  constructor() {
    this._total = 0
  }

  addTablesFromJSON(data) {
    data.forEach((table) => {
      this.addMealTable(table["id"], table["name"], $('#meals-tables'))
      this.addFoodsToMeals(table)
      this.addTotalCalories(table["id"], table["name"])
    })
  }

  addMealTable(id, name, parentNode) {
    let newTable = $(`<table class="meal" data-id=${id}><caption>${name}</caption></table>`)
    parentNode.append(newTable)
    newTable.append('<tr><th>Name</th><th>Calories</th></tr>')
  }

  addFoodsToMeals(table) {
    table["foods"].forEach((food) => {
      this.addFood(food["id"], food["name"], food["calories"], table["id"], table["name"].toLowerCase())
      })
  }
  
  addFood(id, name, calories, mealId, mealName, bottom=true) {
    let newRow = $(`<tr data-id=${id}></tr>`)
    if (bottom) {
      $(`.meal[data-id=${mealId}]`).append(newRow);
    } else {
      $(newRow).insertAfter('#meal-table-headers');
    }
    FoodHelper.addFoodInfo(id, name, calories, newRow)
  }

  addTotalCalories(id) {
    let $table = $(`table.meal[data-id=${id}]`)
    $table.find('.darker').remove()
    let $calories = $table.find('td.food-calories')
    let subtotal = 0
    $calories.each((ind, calorie) => {
      subtotal += parseInt(calorie.textContent)
    })
    this._total += subtotal
    $table.append(`<tr class='darker'><td>Total Calories</td><td class="total">${subtotal}</td></td>`)
    let remaining = this.remainingCalories(id, subtotal)
    let color = this.colorOfRemaining(remaining)
    let remainingElement = $(`<tr class='darker'><td>Remaining Calories</td><td class=${color}>${remaining}</td></tr>`)
    $table.append(remainingElement)
  }

  initializeTotalsTable() {
    let remaining = 2000 - this._total
    let $remainingBox = $('#remaining-calories')
    $('#calories-consumed').text(this._total)
    $remainingBox.text(remaining)
    $remainingBox.addClass(this.colorOfRemaining(remaining))
  }

  removeFromMeal(event) {
    let calories = parseInt($(event.target).parents('tr').find('.food-calories').text())
    this.subtractFromTotals(event.currentTarget, calories)
    $(event.target).parents('tr').remove()
  }

  subtractFromTotals(table, calories) {
    let $subtotal = $(table).find('.total')
    let newSubtotal = parseInt($subtotal.text()) - calories
    $subtotal.text(`${newSubtotal}`)
    this._total -= calories
    this.initializeTotalsTable()
  }

  addToTotals(mealId, foodId) {
    let $subtotal = $(`table[data-id=${mealId}]`).find('.total')
    let $foodsTable = $('table#foods-table')
    let calories = parseInt($foodsTable.find(`td.food-calories[data-id=${foodId}]`).text())
    let newSubtotal = parseInt($subtotal.text()) + calories
    $subtotal.text(newSubtotal) 
    this._total += calories
    $foodsTable.find(`input[value=${foodId}]`)[0].checked = false
  }

  remainingCalories(tableId, total) {
    if (tableId == "2") {
      return 200 - total
    } else if (tableId == "1") {
      return 400 - total
    } else if (tableId == "3") {
      return 600 - total
    } else if (tableId == "4") {
      return 800 - total
    } else {
      return "N/A"
    }
  }

  colorOfRemaining(remaining) {
    if (remaining > 0) {
      return "green"
    } else {
      return "red"
    }
  }
}

module.exports = new MealHelper
