import { Recipe } from "../classes/Recipe.js";
import {Factory} from "../classes/Factory.js"

export function generateRecipes(recipes, filters) {
    console.log(recipes[0]);
    for (let recipe of recipes) {
        recipe = new Recipe(recipe);
        recipe.generateRecipe()
    }
}
