
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
    elements.searchResPages.innerHTML = '';
};

// Clear all highlighted recipe selector
const clearAllHighlightedSelector = () => {
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    resultsArr.forEach(el => {
        el.classList.remove('results__link--active');
    });
};

// Highlight selected recipe
export const highlightSelected = id => {
    clearAllHighlightedSelector();

    document.querySelector(`a[href="#${id}"]`).classList.add('results__link--active');
};

// Limit Recipe Title chars to 17 chars
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

// Create a list button
const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto="${type === 'prev' ? page - 1 : page + 1}">
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`;

// Render list buttons
const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);

    let button;
    if(page === 1 && pages > 1) {
        // Button to go to next page
        button = createButton(page, 'next');
    }
    else if(page === pages && pages > 1) {
        // Only button to go to prev page
        button = createButton(page, 'prev');
    }
    else if(page < pages) {
        // Both buttons
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `;
    }

    // Add button(s)
    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

// Render results on the UI
export const renderResults = (recipes, pageNo = 1, resPerPage = 10) => {
    // Calculate indexes for pagination
    const start = (pageNo - 1) * resPerPage;
    const end = start + resPerPage;

    // Render result(s) of current page
    recipes.slice(start, end).forEach(renderRecipe);

    // Render pagination buttons
    renderButtons(pageNo, recipes.length, resPerPage);
};
