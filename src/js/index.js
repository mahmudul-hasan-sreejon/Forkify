// Global app controller

import Search from './models/Search';


// Global state of the app
// - Search object
// - Current recipe object
// - Shopping list object
// - Liked object
const state = {};


const controlSearch = async () => {
    // Get query form view
    const query = 'pizza';

    if(query) {
        // Create new Search object and add to the state
        state.search = new Search(query);

        // Prepare UI for results

        // Search for recipes
        await state.search.getResults();

        // Render results on UI
        console.log(state.search.result);
    }
};

document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault();

    controlSearch();
});
