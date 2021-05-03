import { IngredientButton } from "./IngredientButton.js";
import { UstensilButton } from "./UstensilButton.js";
import { ApplianceButton } from "./ApplianceButton.js";
import { Recipe } from "./Recipe.js";
import { searchFilter } from "../data/filters.js";

export class Factory {
    constructor(recipes, filters, searchFilter) {
        this.recipes = recipes;
        this.allIngredients = [];
        this.allAppliances = [];
        this.allUstensils = [];
        this.actualRecipes;
        this.ingredientTags = [];
        this.actualAppliances;
        this.actualUstensils;
        this.filters = filters;
        this.searchFilter = searchFilter;
    }

    /**
     * Build the elements
     */
    factoring() {
        this.removeOldRecipes();
        this.generateRecipes();
        this.setButtons();
    }

    /**
     * Refresh the page
     */
    removeOldRecipes() {
        let recipeHTML = document.querySelectorAll(".oneRecipe");
        recipeHTML.forEach((el) => el.remove());
    }

    /**
     * Create recipes
     */
    generateRecipes() {
        let actualRecipes = [];
        console.log(this.filters);
        for (let recipe of this.recipes) {
            if (!this.checkIfSearchFiltered(recipe)) continue;
            if (!this.checkIfFiltered(recipe)) continue;
            actualRecipes.push(recipe);
            recipe = new Recipe(recipe);
            recipe.generateRecipe();
        }
        this.actualRecipes = actualRecipes;

        this.allIngredients = this.getAllIngredients(actualRecipes);
        this.allAppliances = this.getAllAppliances(actualRecipes);
        this.allUstensils = this.getAllUstensils(actualRecipes);
    }

    /**
     * Return true if there is no filter or if the filter-string is in the recipe
     * @param  oneRecipe a recipe
     * @returns true or false
     */
    checkIfSearchFiltered(oneRecipe) {
        if (searchFilter[0]) {
            let fullString =
                JSON.stringify(oneRecipe.name.toLowerCase()) +
                JSON.stringify(oneRecipe.description.toLowerCase()) +
                JSON.stringify(
                    oneRecipe.ingredients.map((el) =>
                        el.ingredient.toLowerCase()
                    )
                );
            if (fullString.includes(searchFilter[0].toLowerCase())) return true;
            return false;
        }
        return true;
    }

    /**
     * Check if the Recipe contains one of the selected tags
     * @param oneRecipe One recipe
     * @returns a true or false
     */
    checkIfFiltered(oneRecipe) {
        // if there are tags, then filter. Else, display all
        let lengthOfFilters =
            this.filters.ingredient.length +
            this.filters.ustensil.length +
            this.filters.appliance.length;
        if (lengthOfFilters > 0) {
            let haveFilteredItem = 0;
            for (let item of this.filters.ingredient) {
                if (
                    oneRecipe.ingredients.filter(
                        (el) =>
                            el.ingredient.toLowerCase() === item.toLowerCase()
                    ).length > 0
                )
                    haveFilteredItem++;
            }
            for (let item of this.filters.appliance) {
                if (oneRecipe.appliance.toLowerCase() === item.toLowerCase())
                    haveFilteredItem++;
            }
            for (let item of this.filters.ustensil) {
                if (
                    oneRecipe.ustensils
                        .flat()
                        .filter((el) => el.toLowerCase() === item.toLowerCase())
                        .length > 0
                )
                    haveFilteredItem++;
            }
            // If filteredItem = length of filters, it means the recipes elements correspond to the filters.
            if (haveFilteredItem === lengthOfFilters) return true;
            return false;
        }
        return true;
    }

    /**
     * Build the three buttons
     */
    setButtons() {
        let ingredientButton = new IngredientButton(this.allIngredients);
        ingredientButton.setIngredientButton();
        let applianceButton = new ApplianceButton(this.allAppliances);
        applianceButton.setApplianceButton();
        let ustensilButton = new UstensilButton(this.allUstensils);
        ustensilButton.setUstensilButton();
    }

    /**
     * Get all the ingredients from recipes and make sure they are uniques
     * @param recipes array of recipes
     * @returns
     */
    getAllIngredients(recipes) {
        let allIngredientArray = [];
        for (let recipe of recipes) {
            for (let ingredient of recipe.ingredients)
                allIngredientArray.push(ingredient.ingredient);
        }
        let uniqIngredientList = [...new Set(allIngredientArray)];
        return uniqIngredientList;
    }

    /**
     * Get all the appliances from recipes and make sure they are uniques
     * @param recipes array of recipes
     * @returns
     */
    getAllAppliances(recipes) {
        let allApplianceArray = [];
        for (let recipe of recipes) {
            allApplianceArray.push(recipe.appliance);
        }
        let uniqApplianceList = [...new Set(allApplianceArray)];
        return uniqApplianceList;
    }

    /**
     * Get all the ustensils from recipes and make sure they are uniques
     * @param recipes array of recipes
     * @returns
     */
    getAllUstensils(recipes) {
        let allUstensilArray = [];
        for (let recipe of recipes) {
            allUstensilArray.push(recipe.ustensils);
        }
        let flatUstensilArray = allUstensilArray.flat();
        let uniqAllUstensilArray = [...new Set(flatUstensilArray)];
        return uniqAllUstensilArray;
    }
}
