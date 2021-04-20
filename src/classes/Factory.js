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
        this.actualIngredients;
        this.actualAppliances;
        this.actualUstensils;
        this.filters = {};
    }

    factoring() {
        this.generateRecipes();
        this.setButtons();
    }

    generateRecipes() {
        for (let recipe of this.recipes) {
            recipe = new Recipe(recipe);
            recipe.generateRecipe();
        }
    }

    setButtons() {
        let ingredientButton = new IngredientButton(this.allIngredients);
        ingredientButton.setIngredientButton();
        let applianceButton = new ApplianceButton(this.allAppliances);
        applianceButton.setApplianceButton();
        console.log(this.allUstensils);
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
