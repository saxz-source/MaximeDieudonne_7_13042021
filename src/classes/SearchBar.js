import { searchFilter } from "../data/filters.js";
import { launchFactory } from "../functions/launchFactory.js";
import {formatString} from "../functions/formatCompareString.js"

export class SearchBar {
    constructor() {
        this.inputField = document.getElementById("searchInput");
        this.lastInput 
    }

    /**
     * set the search bar
     */
    setSearchBar() {
        this.activateSearchInput();
        if (this.lastInput) this.inputField.value = this.lastInput
    }

    /**
     * set the input listener
     */
    activateSearchInput() {
      
        this.inputField.addEventListener("input", (e) => {
            e.preventDefault();
           // performance.mark("init input");

            let searchInput = e.target.value;
            if (searchInput.length >= 3) {
                this.sendTheSearchInput(searchInput);
            }
            if (searchInput.length === 2) {
                this.resetFiltersAndHTML();
            }
        });
    }

    /**
     * clean the filter, remove the "no found" message, and launch the factory
     */
    resetFiltersAndHTML() {
        document.getElementById("resultSection").innerHTML = "";
        searchFilter.pop(searchFilter[0]);
        this.lastInput = null
        launchFactory();
    }

    /**
     * Set the filter and trigger the factory
     * @param inputString the input string from search bar
     */
    sendTheSearchInput(inputString) {
       // const t0 = performance.now();
       this.lastInput = this.inputString
        searchFilter.pop(searchFilter[0]);
     
        searchFilter.push(formatString(inputString));
       
        launchFactory();
    }
}
