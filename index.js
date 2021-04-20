import { recipes } from "./src/recipes/recipes.js";
import { generateRecipes } from "./src/functions/generateRecipes.js";
import { Factory } from "./src/classes/Factory.js";

let factory = new Factory(recipes);
factory.factoring();


let ingredientPanel = document.getElementById("ingredientPanel")
let appareilsPanel = document.getElementById("appareilPanel")
let ustenstilesPanel = document.getElementById("ustensilesPanel")


