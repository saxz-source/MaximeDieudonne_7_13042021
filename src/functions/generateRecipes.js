import { Recipe } from "../classes/Recipe.js";

export function generateRecipes(recipes) {
    console.log(recipes[0]);
    for (let recipe of recipes) {
        recipe = new Recipe(recipe);
        recipe.generateRecipe()
    }
}
