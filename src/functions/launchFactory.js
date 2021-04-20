import { recipes } from "../data/recipes.js";
import { filters } from "../data/filters.js";
import { Factory } from "../classes/Factory.js";


export function launchFactory (){
    let factory = new Factory(recipes, filters);
    factory.factoring();
}