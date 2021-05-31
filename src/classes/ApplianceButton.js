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
        this.actualArray = appliancesArray;
        this.type = "appliance";
        this.formElement = document.getElementById("searchTags")

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
        this.inputField.setAttribute("placeholder", "Rechercher un appareil");
        this.inputField.classList.add("greyedPlaceholder");
        this.inputField.style.borderBottomLeftRadius = "0";
        this.inputField.style.borderBottomRightRadius = "0";
    }

    setClosedState() {
        this.open = false;
        this.inputField.setAttribute("placeholder", "Appareils");
        this.panel.style.display = "none";
        this.button.innerHTML = "&xvee;";
        this.inputField.style.borderBottomLeftRadius = "5px";
        this.inputField.style.borderBottomRightRadius = "5px";
        this.inputField.classList.remove("greyedPlaceholder");

    }

    changeOptions(inputString) {
        let lowInputString = inputString.toLowerCase();
        let optRemoving = document.querySelectorAll(".applianceOptions");
        optRemoving.forEach((el) => el.remove());
        for (let item of this.ingredientsArray) {
            let lowItem = item.toLowerCase();
            if (!lowItem.includes(lowInputString)) continue;
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
