import { recipes } from "../data/recipes.js";
import { filters, searchFilter } from "../data/filters.js";
import { Factory } from "../classes/Factory.js";

/**
 * Lauch factory from index.js
 */
export function launchFactory() {
    let ustensilOptions = document.querySelectorAll(".ustensilsOptions");

    if (ustensilOptions.length > 0)
        ustensilOptions.forEach((el) => el.remove());
    let applianceOptions = document.querySelectorAll(".applianceOptions");
    if (applianceOptions.length > 0)
        applianceOptions.forEach((el) => el.remove());

    let ingredientOptions = document.querySelectorAll(".ingredientOptions");
    if (ingredientOptions.length > 0)
        ingredientOptions.forEach((el) => el.remove());

    let factory = new Factory(recipes, filters, searchFilter);
    factory.factoring();
}
