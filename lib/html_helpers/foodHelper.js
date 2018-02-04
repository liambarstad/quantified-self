const $ = require('jQuery')

class FoodHelper {
  
  addFood(id, name, calories, bottom=true) {
    let newRow = `<tr class="food-${id}"></tr>`
    if (bottom) {
      $('#foods-table').append(newRow);
    } else {
      $(newRow).insertAfter('#foods-table-headers');
    }
      this.addInfo(id, name, calories, $(`.food-${id}`))
  }

  addInfo(id, name, calories, targetNode) {
    if (window.location.href === "http://localhost:8080/foods.html"){
      this.addFoodInfo(id, name, calories, targetNode)
    } else {
      this.addMealInfo(id, name, calories, targetNode)
    }
  }

  addFoodInfo(id, name, calories, targetNode) { 
    targetNode.append(`<td class="food-name" data-id="${id}">${name}</td>`)
    targetNode.append(`<td class="food-calories" data-id="${id}">${calories}</td>`)
    targetNode.append(`<td><img class="delete-food" data-id="${id}" src="./lib/assets/delete1.png"></td>`)
  }

  addMealInfo(id, name, calories, targetNode) {
    targetNode.append(`<td><input type="checkbox" value="${id}"></td>`)
    targetNode.append(`<td class="food-name" data-id="${id}">${name}</td>`)
    targetNode.append(`<td class="food-calories" data-id="${id}">${calories}</td>`)
  }

  validateFoodInput(name, nameBox, calories, caloriesBox) {
    this.clearAlerts()
    if (name === "" && calories === ""){
      nameBox.append('<p class="alert">Please enter a food name</p>');
      caloriesBox.append('<p class="alert">Please enter a calorie amount</p>')
    } else if (name === "") {
      nameBox.append('<p class="alert">Please enter a food name</p>');
    } else if (calories === "") {
      caloriesBox.append('<p class="alert">Please enter a calorie amount</p>')
    } else { 
      return true
    }
  }

  clearAlerts() {
    $('#new-food-form .alert').empty();
    $('#new-food-name input').val('');
    $('#new-food-calories input').val('');
  }

  addEditBox(target) {
    let input = document.createElement('input');
    input.type = "text";
    input.className = "editBox";
    input.dataset.id = target.dataset.id;
    target.replaceWith(input);
  }

  addEditButton(target) {
    let id = target.dataset.id;
    let deleteButton = $('td').find(`img[data-id="${id}"]`);
    $(`<button data-id="${id}">Edit</button>`).insertAfter(deleteButton);
  }
}

module.exports = new FoodHelper
