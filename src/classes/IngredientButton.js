import { Tag } from "./Tag.js";
import { filters } from "../data/filters.js";

export class IngredientButton {
    constructor(ingredientsArray) {
        this.ingredientsArray = ingredientsArray;
        this.inputField = document.getElementById("ingredientInput");
        this.button = document.getElementById("ingredientButton");
        this.panel = document.getElementById("ingredientPanel");
        this.list = document.getElementById("ingredientList");
        this.color = "#3282f7";
        this.open = false;
        this.actualArray = ingredientsArray;
        this.type = "ingredient";
    }

    /**
     * set the ingredient Button
     */
    setIngredientButton() {
        this.activateTextInput();
        this.activateButton();
        this.generateOptions();
    }

    /**
     * Set the click listener
     */
    activateButton() {
        this.button.addEventListener("click", (e) => {
            e.preventDefault();
            if (this.open === false) {
                this.setOpenState();
                return;
            }
            this.setClosedState();
            return;
        });
    }

    /**
     * set the Input listener
     */
    activateTextInput() {
        this.inputField.addEventListener("focus", (e) => {
            this.setOpenState();
        });

        this.inputField.addEventListener("input", (e) => {
            e.preventDefault();
            this.changeOptions(e.target.value);
        });
    }

    setOpenState() {
        this.open = true;
        this.panel.style.display = "block";
        this.button.innerHTML = "&wedge;"
        this.inputField.setAttribute("placeholder", "Recherche un ingrédient");
        this.inputField.style.borderBottomLeftRadius = "0";
        this.inputField.style.borderBottomRightRadius = "0";
    }

    setClosedState() {
        this.open = false;
        this.inputField.setAttribute("placeholder", "Ingrédients");
        this.panel.style.display = "none";
        this.button.innerHTML = "&xvee;"
        this.inputField.style.borderBottomLeftRadius = "5px";
        this.inputField.style.borderBottomRightRadius = "5px";
    }

    changeOptions(inputString) {
        let lowInputString = inputString.toLowerCase();
        let optRemoving = document.querySelectorAll(".ingredientOptions");
        optRemoving.forEach((el) => el.remove());
        for (let item of this.ingredientsArray) {
            let lowItem = item.toLowerCase();
            if (!lowItem.includes(lowInputString)) continue;
            let option = this.createOptionDiv(item);
            this.list.appendChild(option);
        }
    }

    generateOptions() {
        for (let item of this.actualArray) {
            let option = this.createOptionDiv(item);
            this.list.appendChild(option);
        }
    }

    createOptionDiv(item) {
        let option = document.createElement("li");
        option.classList.add("ingredientOptions");
        option.textContent = item;
        option.addEventListener("click", (e) => {
            if (!filters.ingredient.includes(item))
                this.createATag(item, this.color, this.type);
        });
        return option;
    }

    createATag(item, color, type) {
        let tag = new Tag(item, color, type);
        tag.createATag();
    }
}
