
import axios from 'axios';


export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    // Fetch data for the given id
    async getRecipe() {
        try {
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);

            // Store response data
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
        }
        catch(err) {
            console.log(err);
            alert('Something went wrong... :(');
        }
    }

    // Calculate time for each recipe to prepare
    calcTime() {
        // Assuming that we need 15 min for each 3 ingredients
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }

    // Calculate serving time
    calcServings() {
        this.servings = 4;
    }

    // Parse recipe ingredients
    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds', 'kilograms', 'kilogram', 'grams', 'gram'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound', 'kg', 'kg', 'g', 'g'];

        // Parse every ingredients
        const newIngredients = this.ingredients.map(element => {
            // 1. Uniform units
            let ingredient = element.toLowerCase();
            unitsLong.forEach((unit, i) => {
                // Replace every units with the short unit version
                ingredient = ingredient.replace(unit, unitsShort[i]);
            });

            // 2. Remove parentheses from ingredient
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            // 3. Parse ingredients into count, unit and ingredient
            const arrIng = ingredient.split(' ');
            // Find the index of unit in `unitsShort` array in `arrIng`
            const unitIndex = arrIng.findIndex(el => unitsShort.includes(el));
            
            let objIng;
            if(unitIndex > -1) { // If there is a unit
                const arrCount = arrIng.slice(0, unitIndex);

                let count;
                if(arrCount.length === 1) { // If the ingredient count has no decimal part
                    count = eval(arrIng[0].replace('-', '+'));
                }
                else { // If the ingredient count has decimal part
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                }

                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                };
            }
            else if(parseInt(arrIng[0], 10)) { // If there is no unit but first element is an integer
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                }
            }
            else if(unitIndex === -1) { // If there is no unit
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient
                }
            }

            return objIng;
        });

        // 4. Update ingredients
        this.ingredients = newIngredients;
    }

    updateServings(type) {
        const newServings = type === 'dec' ? (this.servings - 1) : (this.servings + 1);

        // ingredients
        this.ingredients.forEach(ing => {
            ing.count *= (newServings / this.servings);
        });

        // Update servings
        this.servings = newServings;
    }
}
