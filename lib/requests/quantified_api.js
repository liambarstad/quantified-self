const API = "https://quantified-self-back-end.herokuapp.com/api/v1/"
class QuantifiedApi {

  getAllFoods() {
      return fetch(API + 'foods', {
          method: 'GET',
          mode: 'no-cors'
      })
      .then(response => response.json())
    }

  deleteFood(id) {
    return fetch(API + 'foods/' + id.toString(), { method: 'DELETE', mode: 'no-cors' })
  }

  sendPostRequest(name, calories) {
    return fetch(API + 'foods', {
      method: 'POST',
      mode: 'no-cors',
      headers:
      { 'Content-Type': 'application/json' },
      body: JSON.stringify({ food: { name: name, calories: calories }})
    }).then(response => response.json())
  }

  makeEditRequest(id, body) {
    return fetch(API + 'foods/' + id.toString(), {
        method: 'PATCH',
        mode: 'no-cors',
        headers:
        { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    }).then(response => response.json())
  }

  getAllMeals() {
    return fetch(API + 'meals', { mode: 'no-cors' })
      .then(response => response.json())
  }

  deleteFromMeal(mealId, foodId) {
    return fetch(API + `meals/${mealId}/foods/${foodId}` , { method: 'DELETE', mode: 'no-cors' })
  }

  postFoodMeal(mealId, foodId) {
    return fetch(API + `meals/${mealId}/foods/${foodId}`,{
      method: "POST",
      mode: 'no-cors'
    })
    .then(response => response.json())
  }

}

module.exports = new QuantifiedApi
