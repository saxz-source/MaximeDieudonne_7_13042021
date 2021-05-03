import { searchFilter } from "../data/filters.js";
import { launchFactory } from "../functions/launchFactory.js";

export class SearchBar {
    constructor() {
        this.inputField = document.getElementById("searchInput");
    }

    /**
     * set the search bar
     */
    setSearchBar() {
        console.log("i");
        this.activateSearchInput();
    }

    /**
     * set the input listener 
     */
    activateSearchInput() {
        this.inputField.addEventListener("input", (e) => {
            e.preventDefault();
            console.log(e.target.value);
            let searchInput = e.target.value;
            if (searchInput.length > 3) {
                this.sendTheSearchInput(searchInput);
            }
        });
    }

    /**
     * Set the filter and trigger the factory
     * @param inputString the input string from search bar
     */
    sendTheSearchInput(inputString) {
        searchFilter.pop(searchFilter[0]);
        searchFilter.push(inputString);
        console.log(searchFilter);
        launchFactory();
    }
}
