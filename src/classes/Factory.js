import { IngredientButton } from "./IngredientButton.js";
import { UstensilButton } from "./UstensilButton.js";
import { ApplianceButton } from "./ApplianceButton.js";
import { Recipe } from "./Recipe.js";
import { searchFilter } from "../data/filters.js";
import { formatString } from "../functions/formatCompareString.js";

export class Factory {
    constructor(recipes, filters, searchFilter) {
        this.noMessage = document.getElementById("noMessage");
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
  
        // Select recipes based on searchBar Filter
        if (searchFilter[0]) {
            this.actualRecipes = this.recipes.filter((r) => {
                return (
                    formatString(r.name).includes(this.searchFilter[0]) ||
                    formatString(r.description).includes(this.searchFilter[0]) ||
                    JSON.stringify(
                        r.ingredients.map((r) => formatString(r.ingredient))
                    ).includes(this.searchFilter[0])
                );
            });
        } else {
            this.actualRecipes = this.recipes
        }

        // Select recipes based on tags filters
       let finalRecipes = []
        for (let recipe of this.actualRecipes) {
            if (!this.checkIfTagFiltered(recipe)) continue; 
            finalRecipes.push(recipe)
            recipe = new Recipe(recipe);
            recipe.generateRecipe();
        }

        // Signal the lack of result, if no result
        this.handleNoRecipeMessage(finalRecipes.length);

        // Set the tag buttons
        this.allIngredients = this.getAllIngredients(finalRecipes);
        this.allAppliances = this.getAllAppliances(finalRecipes);
        this.allUstensils = this.getAllUstensils(finalRecipes);
    }

  

    /**
     * Check if the Recipe contains one of the selected tags
     * @param oneRecipe One recipe
     * @returns a true or false
     */
    checkIfTagFiltered(oneRecipe) {
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
                            formatString(el.ingredient) === formatString(item)
                    ).length > 0
                )
                    haveFilteredItem++;
            }
            for (let item of this.filters.appliance) {
                if (formatString(oneRecipe.appliance) === formatString(item))
                    haveFilteredItem++;
            }
            for (let item of this.filters.ustensil) {
                if (
                    oneRecipe.ustensils
                        .flat()
                        .filter((el) => formatString(el) === formatString(item))
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

    handleNoRecipeMessage(recipeLength) {
        if (recipeLength < 1) {
            document.getElementById("resultSection").innerHTML = "";
            let noMess = document.createElement("p");
            noMess.id = "noMess";
            noMess.textContent =
                "Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.";
            document.getElementById("resultSection").appendChild(noMess);
        } else {
            if (document.getElementById("noMess"))
                document.getElementById("noMess").remove();
        }
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
