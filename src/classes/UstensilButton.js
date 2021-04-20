import { Tag } from "./Tag.js";

export class UstensilButton {
    constructor(ustensilArray) {
        this.ustensilArray = ustensilArray;
        this.inputField = document.getElementById("ustensilInput");
        this.button = document.getElementById("ustensilButton");
        this.panel = document.getElementById("ustensilPanel");
        this.list = document.getElementById("ustensilList");
        this.color = "#ed6454";
        this.open = false;
        this.inputFocus = false;
    }

    setUstensilButton() {
        this.activateTextInput();
        this.activateButton();
        this.generateOptions();
    }

    activateButton() {
        console.log(this.button);
        this.button.addEventListener("click", (e) => {
            e.preventDefault();
            if (this.open === false) {
                this.panel.style.display = "block";
                this.inputField.setAttribute(
                    "placeholder",
                    "Recherche un ustensile"
                );
                this.open = true;
                return;
            }
            this.panel.style.display = "none";
            this.open = false;
            this.inputField.setAttribute("placeholder", "Ustensiles");
            return;
        });
    }

    activateTextInput() {
        this.inputField.addEventListener("focus", (e) => {
            this.inputField.setAttribute(
                "placeholder",
                "Recherche un ustensile"
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
            this.list.appendChild(option);
        }
    }

    createOptionDiv(item) {
        let option = document.createElement("li");
        option.classList.add("ustensilsOptions");
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
