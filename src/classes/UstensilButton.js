import { Tag } from "./Tag.js";
import { filters } from "../data/filters.js";

export class UstensilButton {
    constructor(ustensilArray) {
        this.ustensilArray = ustensilArray;
        this.inputField = document.getElementById("ustensilInput");
        this.button = document.getElementById("ustensilButton");
        this.panel = document.getElementById("ustensilPanel");
        this.list = document.getElementById("ustensilList");
        this.color = "#ed6454";
        this.open = false;
        this.actualArray = ustensilArray;
        this.type = "ustensil";
        this.formElement = document.getElementById("searchTags")

    }

    setUstensilButton() {
        this.activateTextInput();
        this.activateButton();
        this.generateOptions();
    }

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

    activateTextInput() {
        this.inputField.addEventListener("focus", (e) => {
            this.setOpenState();
        });
        this.inputField.addEventListener("input", (e) => {
            e.preventDefault();
            let theValue = e.target.value;
            if (theValue.length > 0)
                this.inputField.classList.remove("greyedPlaceholder");
            this.changeOptions(theValue);
        });
    }

    setOpenState() {
        this.open = true;
        this.panel.style.display = "block";
        this.button.innerHTML = "&wedge;";
        this.inputField.setAttribute("placeholder", "Rechercher un ustensile");
        this.inputField.classList.add("greyedPlaceholder");
        this.inputField.style.borderBottomLeftRadius = "0";
        this.inputField.style.borderBottomRightRadius = "0";
    }

    setClosedState() {
        this.open = false;
        this.inputField.setAttribute("placeholder", "Ustensiles");
        this.panel.style.display = "none";
        this.button.innerHTML = "&xvee;";
        this.inputField.style.borderBottomLeftRadius = "5px";
        this.inputField.style.borderBottomRightRadius = "5px";
        this.inputField.classList.remove("greyedPlaceholder");

    }

    changeOptions(inputString) {
        let optRemoving = document.querySelectorAll(".ustensilsOptions");
        optRemoving.forEach((el) => el.remove());
        for (let item of this.ustensilArray) {
            if (!item.includes(inputString)) continue;
            let option = this.createOptionDiv(item);
            this.list.appendChild(option);
        }
    }

    generateOptions() {
        for (let item of this.ustensilArray) {
            let option = this.createOptionDiv(item);
            option.classList.add("ustensilsOptions");

            this.list.appendChild(option);
        }
    }

    createOptionDiv(item) {
        let option = document.createElement("li");
        option.classList.add("ustensilsOptions");
        option.textContent = item;
        option.addEventListener("click", (e) => {
            if (!filters.ustensil.includes(item))
                this.createATag(item, this.color, this.type);
                this.setClosedState();
                this.formElement.reset()

        });
        return option;
    }

    createATag(item, color, type) {
        let tag = new Tag(item, color, type);
        tag.createATag();
    }
}
