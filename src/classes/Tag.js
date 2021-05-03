import { filters } from "../data/filters.js";
import { launchFactory } from "../functions/launchFactory.js";

export class Tag {
    constructor(item, color, type) {
        this.item = item;
        this.color = color;
        this.type = type;
        this.tagFiltersArray = [];
    }

    /**
     * Build tag element
     */
    createATag() {
        let choosenTags = document.getElementById("choosenTags");
        let oneTag = this.generateHTMLTag();
        choosenTags.appendChild(oneTag);
        this.addTagFilters();
    }

    /**
     * add tag filters to filters array
     */
    addTagFilters() {
        if (this.type === "ingredient") filters.ingredient.push(this.item);
        if (this.type === "appliance") filters.appliance.push(this.item);
        if (this.type === "ustensil") filters.ustensil.push(this.item);

        launchFactory();
    }

    /**
     * remove tag filters from filters array
     * @param  divTag the tag html element
     */
    removeTageFilters(divTag) {
        divTag.remove();
        if (this.type === "ingredient") {
            let ingredientTags = filters.ingredient;
            let newIngredientTags = ingredientTags.filter(
                (el) => el !== this.item
            );
            filters.ingredient = newIngredientTags;
        }

        if (this.type === "appliance") {
            let applianceTags = filters.appliance;
            let newApplianceTags = applianceTags.filter(
                (el) => el !== this.item
            );
            filters.appliance = newApplianceTags;
        }
        if (this.type === "ustensil") {
            let ustensilTags = filters.ustensil;
            let newUstensilTags = ustensilTags.filter((el) => el !== this.item);
            filters.ustensil = newUstensilTags;
        }
        launchFactory();
    }

    /**
     * create the html tag element
     * @returns the tag html element
     */
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
            this.removeTageFilters(divTag);
        });
        divTag.appendChild(cross);
        return divTag;
    }
}
