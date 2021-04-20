import { filters } from "../data/filters.js";
import { launchFactory } from "../functions/launchFactory.js";

export class Tag {
    constructor(item, color, type) {
        this.item = item;
        this.color = color;
        this.type = type;
        this.tagFiltersArray = [];
    }

    createATag() {
        let choosenTags = document.getElementById("choosenTags");
        let oneTag = this.generateHTMLTag();
        choosenTags.appendChild(oneTag);
        this.changeFilters();

    }

    changeFilters() {
        if (this.type === "ingredient") filters.ingredient.push(this.item);
        if (this.type === "appliance") filters.appliance.push(this.item);
        if (this.type === "ustensil") filters.ustensil.push(this.item);
        launchFactory();
        console.log(filters)
    }

    generateHTMLTag() {
        let divTag = document.createElement("div");
        divTag.classList.add("tag");
        divTag.style.background = this.color;
        let text = document.createElement("p");
        text.textContent = this.item;
        divTag.appendChild(text);
        let cross = document.createElement("div");
        cross.textContent = "X";
        cross.addEventListener("click", (e) => {
            e.preventDefault();
            divTag.remove();
        });
        divTag.appendChild(cross);
        return divTag;
    }
}
