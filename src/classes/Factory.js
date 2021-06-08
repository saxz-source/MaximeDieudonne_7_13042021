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
        //initialise the displayed recipes
        let actualRecipes = [];

        // for each recipe, check if it corresponds :
        // 1/ to the searchBar filter
        // 2/ to the tag filters
        // then display recipes
        for (let recipe of this.recipes) {
            if (!this.checkIfSearchFiltered(recipe)) continue;
            if (!this.checkIfTagFiltered(recipe)) continue; //removed for speed test
            actualRecipes.push(recipe);
            recipe = new Recipe(recipe);
            recipe.generateRecipe();
        }
        this.actualRecipes = actualRecipes;

        // Display the lack of recipe with a message
        this.handleNoRecipeMessage(this.actualRecipes.length);

        // Set the tag buttons
        this.allIngredients = this.getAllIngredients(this.actualRecipes);
        this.allAppliances = this.getAllAppliances(this.actualRecipes);
        this.allUstensils = this.getAllUstensils(this.actualRecipes);
    }

    /**
     * Return true if there is no filter or if the filter-string is in the recipe
     * @param  oneRecipe a recipe
     * @returns true or false
     */
    checkIfSearchFiltered(oneRecipe) {
        if (searchFilter[0]) {
            let fullString =
                JSON.stringify(oneRecipe.name) +
                JSON.stringify(oneRecipe.description) +
                JSON.stringify(
                    oneRecipe.ingredients.map((el) => el.ingredient)
                );
            fullString = formatString(fullString);
            if (fullString.includes(formatString(searchFilter[0]))) return true;
            return false;
        }
        return true;
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
        console.log(recipeLength);
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
