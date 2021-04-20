export class Ingredients {
    constructor(ingredient) {
        this.name = ingredient.ingredient;
        this.quantity = ingredient.quantity ? ingredient.quantity : "";
        this.unit = ingredient.unit ? ingredient.unit : "";
    }

    getIngredientString() {
        let quantityString = "";
        if (this.quantity) quantityString = ": " + this.quantity;
        let string =
            "<span class='ingredientName'>" +
            this.name +
            "</span>" +
            quantityString +
            " " +
            this.unit;

        return string;
    }
}
