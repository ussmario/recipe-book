import './App.css';

import React from 'react';

export default class App extends React.Component {
  state = {
    isAddRecipeFormDisplayed: false
  }

  render(){
    const addNewRecipeForm = (
      <form id="recipe-form" >
        <label htmlFor="newRecipeName">Recipe name: </label>
        <input type="text" id="newRecipeName" />
        <label htmlFor="newRecipeInstructions">Instructions:</label>
        <textarea id="newRecipeInstructions" placeholder="write recipe instructions here..." />
        <input type="submit" />
      </form>
    )

    return (
      <div className="App">
        <h1 className="App-header">My Recipes</h1>
        {
          this.state.isAddRecipeFormDisplayed
           ? addNewRecipeForm
          : <button id="add-recipe" > Add Recipe</button>
        }
        <p>There are no recipes to list.</p>
      </div>
    )
  }
}