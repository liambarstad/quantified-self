// const API = "https://quantified-self-back-end.herokuapp.com/api/v1/"
const API = "https://ml-quantified-self.herokuapp.com/api/v1/"
class QuantifiedApi {

  getAllFoods() {
      return fetch(API + 'foods')
      .then(response => response.json())
    }

  deleteFood(id) {
    return fetch(API + 'foods/' + id.toString(), { method: 'DELETE' })
  }

  sendPostRequest(name, calories) {
    return fetch(API + 'foods', {
      method: 'POST',
      headers:
      { 'Content-Type': 'application/json' },
      body: JSON.stringify({ food: { name: name, calories: calories }})
    }).then(response => response.json())
  }

  makeEditRequest(id, body) {
    return fetch(API + 'foods/' + id.toString(), {
        method: 'PATCH',
        headers:
        { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    }).then(response => response.json())
  }

  getAllMeals() {
    return fetch(API + 'meals')
      .then(response => response.json())
  }

  deleteFromMeal(mealId, foodId) {
    return fetch(API + `meals/${mealId}/foods/${foodId}` , { method: 'DELETE' })
  }

  postFoodMeal(mealId, foodId) {
    return fetch(API + `meals/${mealId}/foods/${foodId}`,{
      method: "POST"
    })
    .then(response => response.json())
  }

}

module.exports = new QuantifiedApi
