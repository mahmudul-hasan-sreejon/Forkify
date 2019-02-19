
import { elements } from './base';

// Get the search input field
export const getInput = () => elements.searchInput.value;

// Clear the search input field
export const clearInput = () => {
    elements.searchInput.value = '';
};

// Clear the search result list
export const clearResults = () => {
    elements.searchResList.innerHTML = '';
};

// Limit Recipe Title view chars to 17 chars
const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if(title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if(acc + cur.length <= limit) newTitle.push(cur);

            return (acc + cur.length);
        }, 0);

        return (`${newTitle.join(' ')} ...`);
    }
    return title;
};

// Render recipe results on the UI
const renderRecipe = recipe => {
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;

    // Add a recipe at the end of the recipe list
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

// Render results on the UI
export const renderResults = recipes => {
    recipes.forEach(renderRecipe);
};
