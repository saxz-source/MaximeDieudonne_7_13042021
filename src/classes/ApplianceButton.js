import { Tag } from "./Tag.js";
import { filters } from "../data/filters.js";


export class ApplianceButton {
    constructor(appliancesArray) {
        this.appliancesArray = appliancesArray;
        this.inputField = document.getElementById("applianceInput");
        this.button = document.getElementById("applianceButton");
        this.panel = document.getElementById("appliancePanel");
        this.list = document.getElementById("applianceList");
        this.color = "#68d9a4";
        this.open = false;
        this.type = "appliance";
    }

    setApplianceButton() {
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
                    "Recherche un appareil"
                );
                return;
            }
            this.panel.style.display = "none";
            this.open = false;
            this.inputField.setAttribute("placeholder", "Appareils");

            return;
        });
    }

    activateTextInput() {
        this.inputField.addEventListener("focus", (e) => {
            this.inputField.setAttribute(
                "placeholder",
                "Recherche un appareil"
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
        let optRemoving = document.querySelectorAll(".applianceOptions");
        optRemoving.forEach((el) => el.remove());
        for (let item of this.appliancesArray) {
            if (!item.includes(inputString)) continue;
            let option = this.createOptionDiv(item);
            this.list.appendChild(option);
        }
    }

    generateOptions() {
        for (let item of this.appliancesArray) {
            let option = this.createOptionDiv(item);
            this.list.appendChild(option);
        }
    }

    createOptionDiv(item) {
        let option = document.createElement("li");
        option.classList.add("applianceOptions");
        option.textContent = item;
        option.addEventListener("click", (e) => {
            if (!filters.appliance.includes(item))
                this.createATag(item, this.color, this.type);
        });
        return option;
    }

    createATag(item, color, type) {
        let tag = new Tag(item, color, type);
        tag.createATag();
    }
}
