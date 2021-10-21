import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

const setup = () => {
  const app = render(<App />);

  userEvent.click(app.getByText('Add Recipe'));

  // Add the submit button to your setup method:
  const submitButton = app.getByRole('button')
  const instructionsInput = app.getByLabelText('Instructions:')
  const nameInput = app.getByLabelText('Recipe name:')

  return {
    instructionsInput,
    nameInput,
    submitButton
  }
}

test('Add recipe button toggles visibility of a form on the page ', () => {

  render(<App />);
  // `queryBy...` methods will return null if the element is not found:
  const recipeForm = screen.queryByText("Instructions:");

  // `getBy...` methods will "throw" an error if the element is not found:
  // const recipeForm = screen.getByText("Instructions:");

  expect(recipeForm).toBeNull();
  userEvent.click(screen.getByText("Add Recipe"));

  expect(screen.getByLabelText("Instructions:")).toBeInTheDocument();
});

test('typing in the recipe name makes the recipe name appear in the input', async () => {
  render(<App />);

  const recipeName = 'No pockets';
  userEvent.click(screen.getByText("Add Recipe"));
  await userEvent.type(screen.getByLabelText('Recipe name:'), recipeName);

  expect(screen.getByLabelText('Recipe name:').value).toEqual(recipeName);
})

test('typing in the recipe instructions makes the instructions appear in the form', async () => {
  const { instructionsInput } = setup();

  const recipeInstructions = "kinda hard to write instructions without knowing what I'm cooking"

  await userEvent.type(instructionsInput, recipeInstructions)
  expect(instructionsInput.value).toEqual(recipeInstructions);
})

test('recipe name from state appears in an unordered list', async () => {
  const { instructionsInput, nameInput, submitButton } = setup();
  const recipeName = "Lean Pockets"
  const recipeInstructions = "place in toaster oven on 350 for 45 minutes"

  await userEvent.type(instructionsInput, recipeInstructions)
  await userEvent.type(nameInput, recipeName)
  userEvent.click(submitButton);

  expect(screen.getByRole('listitem')).toBeInTheDocument();
  expect(screen.getByText(recipeName)).toBeInTheDocument();
})

test('recipe names all appear in the unordered list', async () => {
  const { instructionsInput, nameInput, submitButton } = setup();
  const recipeName1 = "Lean Pockets"
  const recipeInstructions1 = "place in toaster oven on 350 for 45 minutes"
  const recipeName2 = "Hot Pockets"
  const recipeInstructions2 = "place in microwave for 2 minutes"

  await userEvent.type(nameInput, recipeName1)
  await userEvent.type(instructionsInput, recipeInstructions1)
  userEvent.click(submitButton);
  await userEvent.type(nameInput, recipeName2)
  await userEvent.type(instructionsInput, recipeInstructions2)
  userEvent.click(submitButton);

  expect(screen.getByText(recipeName1)).toBeInTheDocument();
  expect(screen.getByText(recipeName2)).toBeInTheDocument();
})