import { Tag } from "./Tag.js";

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
    }

    setIngredientButton() {
        this.activateTextInput();
        this.activateButton();
        this.generateOptions();
    }

    activateButton() {
        this.button.addEventListener("click", (e) => {
            e.preventDefault();
            if (this.open === false) {
                this.panel.style.display = "block";
                this.open = true;
                this.inputField.setAttribute(
                    "placeholder",
                    "Recherche un ingédient"
                );
                return;
            }
            this.panel.style.display = "none";
            this.open = false;
            this.inputField.setAttribute("placeholder", "Ingrédients");
            return;
        });
    }

    activateTextInput() {
        this.inputField.addEventListener("focus", (e) => {
            this.inputField.setAttribute(
                "placeholder",
                "Recherche un ingédient"
            );
            this.panel.style.display = "block";
            this.open = true;
        });

        this.inputField.addEventListener("input", (e) => {
            e.preventDefault();
            console.log(e.target.value);
            this.changeOptions(e.target.value);
        });
    }

    changeOptions(inputString) {
        let optRemoving = document.querySelectorAll(".ingredientOptions");
        optRemoving.forEach((el) => el.remove());
        for (let item of this.ingredientsArray) {
            if (!item.includes(inputString)) continue;
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
            this.createATag(item, this.color);
        });
        return option;
    }

    createATag(item, color) {
        let tag = new Tag(item, color);
        tag.createATag();
    }
}
