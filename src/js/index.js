
// Global app controller

import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements, renderLoaded, clearLoader } from './views/base';

// Global state of the app
// - Search object
// - Current recipe object
// - Shopping list object
// - Liked object
const state = {};


// Search controller
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

// Event Listener for the search form
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();

    controlSearch();
});
