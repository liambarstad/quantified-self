const $ = require('jQuery');
const FoodHelper = require('../html_helpers/foodHelper')
const QuantifiedApi = require('../requests/quantified_api')

class FoodService {
  constructor() {
    this._editing = false;
  }

  get editing() {
    return this._editing
  }

  populateFoodTable() {
    QuantifiedApi.getAllFoods()
      .then(data => {
        data.forEach((food) => {
          FoodHelper.addFood(food.id, food.name, food.calories);
        })
      })
  }

  deleteFood(target) {
    QuantifiedApi.deleteFood(target.dataset.id)
      .then(data => {
        $(`.food-${target.dataset.id}`).remove();
      })
  }


  postFood() {
    let $nameBox = $('#new-food-name')
    let $caloriesBox = $('#new-food-calories')
    let name = $nameBox.find('input').val();
    let calories = $caloriesBox.find('input').val();
    if (FoodHelper.validateFoodInput(name, $nameBox, calories, $caloriesBox)) {
      QuantifiedApi.sendPostRequest(name, calories.toString())
    .then(data => FoodHelper.addFood(data.id, data.name, data.calories, false))
    }
  }

  editBox(target) {
    if ((target.className === 'food-name' || 'food-calories') && !this._editing) {
      this._editing = true;
      FoodHelper.addEditBox(target)
      this.addEditListener(target)
    };
  }

  addEditListener(target) {
    FoodHelper.addEditButton(target);
    let id = target.dataset.id;
    let attr = target.className.split("-")[1];
    let $button = $('button[data-id=' + id + ']');
    $($button).on('click', (event) => {
      event.stopPropagation;
      this.editFood(id, attr);
    });
  }

  editFood(id, attr) {
    let $inputBox = $(`input[data-id=${id}]`);
    let body = { food: {}};
    body['food'][attr] = $inputBox.val();
    QuantifiedApi.makeEditRequest(id, body)
    .then(data => {
      $(`tr[class="food-${data['id']}"]`).remove();
      FoodHelper.addFood(data['id'], data['name'], data['calories']);
    })
    this._editing = false
  }

  static displayWith(name) {
    let foods = $('.food-name')
    foods.each((ind, food) => {
      let $element = $(food)
      let $row = $(`tr.food-${food.dataset.id}`)
      let text = $element.text()
      let span = name.length
      if (text.toLowerCase().slice(0, span) != name.toLowerCase()) {
        $row.addClass("disabled")
      } else {
        $row.removeClass("disabled")
      }
    })
  }

}

module.exports = FoodService
