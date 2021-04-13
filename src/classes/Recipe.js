import { Ingredients } from "./Ingredients.js";

export class Recipe {
    constructor(recipe) {
        this.id = recipe.id;
        this.name = recipe.name;
        this.servings = recipe.servings;
        this.time = recipe.time;
        this.ingredients = recipe.ingredients;
        this.description = recipe.description;
        this.appliance = recipe.appliance;
        this.ustensils = recipe.ustensils;
    }

    generateRecipe() {
        // create Recipe Element
        let oneRecipe = document.createElement("article");
        oneRecipe.classList.add("oneRecipe");
        let resultSection = document.getElementById("resultSection");
        resultSection.appendChild(oneRecipe);

        // Add Recipe IMG
        let recipeImg = this.createRecipeImg();
        oneRecipe.appendChild(recipeImg);

        // Create Recipe Body
        let recipeBody = document.createElement("div");
        recipeBody.classList.add("recipeBody");
        oneRecipe.appendChild(recipeBody);
        // Create Recipe body Parts
        let recipeTopBody = document.createElement("div");
        recipeTopBody.classList.add("recipeTopBody");
        recipeBody.appendChild(recipeTopBody);
        let recipeBottomBody = document.createElement("div");
        recipeBottomBody.classList.add("recipeBottomBody");
        recipeBody.appendChild(recipeBottomBody);

        // Fill Recipe Body Top Part
        let recipeTitle = this.createRecipeTitle(this.name);
        console.log(recipeTitle);
        recipeTopBody.appendChild(recipeTitle);
        let recipeTime = this.createRecipeTime(this.time);
        recipeTopBody.appendChild(recipeTime);

        // Fill Recipe Body Bottom Part
        let recipeIngredients = this.createRecipeIngredients(this.ingredients);
        recipeBottomBody.appendChild(recipeIngredients);
        let recipeDesc = this.createRecipeDesc(this.description);
        recipeBottomBody.appendChild(recipeDesc);
    }

    createRecipeDesc(description) {
        let recipeDesc = document.createElement("p");
        recipeDesc.classList.add("recipeDesc");
        recipeDesc.innerHTML = description;
        return recipeDesc;
    }

    createRecipeTime(time) {
        let timeDiv = document.createElement("div");
        timeDiv.classList.add("recipeTime");
        timeDiv.textContent = time + " min";
        return timeDiv;
    }

    createRecipeTitle(name) {
        let recipeTitle = document.createElement("h2");
        recipeTitle.classList.add("recipeTitle");
        recipeTitle.textContent = name;
        return recipeTitle;
    }

    createRecipeIngredients(ingredientsList) {
        let ingredientsDiv = document.createElement("ul");
        ingredientsDiv.classList.add("ingredientDiv");
        for (let ingredient of ingredientsList) {
            let itemLi = document.createElement("li");
            itemLi.classList.add("ingredientLi");
            ingredient = this.formatIngredients(ingredient);
            itemLi.innerHTML = ingredient;
            ingredientsDiv.appendChild(itemLi);
        }
        return ingredientsDiv;
    }

    formatIngredients(ingredient) {
        ingredient = new Ingredients(ingredient);
      let ingredientString =  ingredient.getIngredientString();

        return ingredientString;
    }

    createRecipeImg() {
        let recipeImg = document.createElement("div");
        recipeImg.classList.add("recipeImg");
        return recipeImg;
    }

    createIngredients(ingredients) {
        for (let ingredient of ingredients) {
            let newIngredient = new Ingredients(
                ingredient.ingredient,
                ingredient.quantity
            );
        }
    }
}
