import { launchFactory } from "./src/functions/launchFactory.js";
import {SearchBar} from "./src/classes/SearchBar.js"

launchFactory();

let searchBar = new SearchBar()
searchBar.setSearchBar()