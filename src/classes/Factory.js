import { IngredientButton } from "./IngredientButton.js";
import { UstensilButton } from "./UstensilButton.js";
import { ApplianceButton } from "./ApplianceButton.js";

import { Recipe } from "./Recipe.js";

export class Factory {
    constructor(recipes, filters) {
        this.recipes = recipes;
        this.allIngredients = this.getAllIngredients(this.recipes);
        this.allAppliances = this.getAllAppliances(this.recipes);
        this.allUstensils = this.getAllUstensils(this.recipes);
        this.actualRecipes;
        this.ingredientTags = [];
        this.actualAppliances;
        this.actualUstensils;
        this.filters = filters;
    }

    factoring() {
        this.removeOldRecipes();
        this.generateRecipes();
        this.setButtons();
    }

    removeOldRecipes() {
        let recipeHTML = document.querySelectorAll(".oneRecipe");
        recipeHTML.forEach((el) => el.remove());
    }

    generateRecipes() {
        let actualRecipes = [];
        for (let recipe of this.recipes) {
            console.log(this.checkIfFiltered(recipe));
            if (this.checkIfFiltered(recipe)) continue;
            actualRecipes.push(recipe);
            recipe = new Recipe(recipe);
            recipe.generateRecipe();
        }
        this.actualRecipes = actualRecipes;
    }

    checkIfFiltered(oneRecipe) {
        for (let item of this.filters.ingredient) {
            console.log(item);
            console.log(
                oneRecipe.ingredients.filter((el) => el.ingredient === item)
                    .length
            );
            if (
                oneRecipe.ingredients.filter((el) => el.ingredient === item)
                    .length > 0
            )
                return true;
        }
        // for (let item of this.filters.appliance) {
        //     if (oneRecipe.appliance.includes(item)) return true;
        // }
        // for (let item of this.filters.ustensil) {
        //     if (oneRecipe.ustensils.flat().includes(item)) return true;
        // }
        return false;
    }

    setButtons() {
        let ingredientButton = new IngredientButton(this.allIngredients);
        ingredientButton.setIngredientButton();
        let applianceButton = new ApplianceButton(this.allAppliances);
        applianceButton.setApplianceButton();
        let ustensilButton = new UstensilButton(this.allUstensils);
        ustensilButton.setUstensilButton();
    }

    getAllIngredients(recipes) {
        let allIngredientArray = [];
        for (let recipe of recipes) {
            for (let ingredient of recipe.ingredients)
                allIngredientArray.push(ingredient.ingredient);
        }
        let uniqIngredientList = [...new Set(allIngredientArray)];
        return uniqIngredientList;
    }

    getAllAppliances(recipes) {
        let allApplianceArray = [];
        for (let recipe of recipes) {
            allApplianceArray.push(recipe.appliance);
        }
        let uniqApplianceList = [...new Set(allApplianceArray)];
        return uniqApplianceList;
    }

    getAllUstensils(recipes) {
        let allUstensilArray = [];
        for (let recipe of recipes) {
            allUstensilArray.push(recipe.ustensils);
        }
        let flatUstensilArray = allUstensilArray.flat();
        let uniqAllUstensilArray = [...new Set(flatUstensilArray)];
        return uniqAllUstensilArray;
    }

    static addAFilter(newFilter) {
        this.filters = [...this.filters, newFilter];
    }
}
