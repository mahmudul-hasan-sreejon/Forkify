
// Global app controller

import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import { elements, renderLoaded, clearLoader } from './views/base';

// Global state of the app
// - Search object
// - Current recipe object
// - Shopping list object
// - Liked object
const state = {};


////////////////////////////// Search Controller //////////////////////////////

const controlSearch = async () => {
    // Get query form view
    const query = searchView.getInput();

    if(query) {
        // Create new Search object and add to the state
        state.search = new Search(query);

        // Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoaded(elements.searchRes);

        // Search for recipes
        await state.search.getResults();

        // Clear the loader from UI
        clearLoader();

        // Render results on UI
        searchView.renderResults(state.search.result);
    }
};

// Event Listener for search form
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();

    controlSearch();
});

// Event Listener for pagination button(s)
elements.searchResPages.addEventListener('click', e => {
    // Select the clicked button
    const btn = e.target.closest('.btn-inline');

    if(btn) {
        // Clear result(s)
        searchView.clearResults();

        // Get the page no.
        const goToPage = parseInt(btn.dataset.goto, 10);

        // Render results of that page no.
        searchView.renderResults(state.search.result, goToPage);
    }
});

////////////////////////////// Recipe Controller //////////////////////////////

const r = new Recipe(46956);

r.getRecipe();

console.log(r);
