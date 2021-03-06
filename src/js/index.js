
// Global app controller

import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';

import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';

import { elements, renderLoader, clearLoader } from './views/base';


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
        renderLoader(elements.searchRes);

        try {
            // Search for recipes
            await state.search.getResults();

            // Clear the loader from UI
            clearLoader();

            // Render results on UI
            searchView.renderResults(state.search.result);
        }
        catch(err) {
            alert('Something wrong with the search...');
            clearLoader();
        }
    }
};

////////////////////////////// Recipe Controller //////////////////////////////

const controlRecipe = async () => {
    // Get id from url
    const id = window.location.hash.replace('#', '');

    if(id) {
        // Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // If there is a search state then highlight selected recipe
        if(state.search) searchView.highlightSelected(id);

        // Create new recipe object
        state.recipe = new Recipe(id);

        try {
            // Get recipe data
            await state.recipe.getRecipe();

            // Parse ingredients data
            state.recipe.parseIngredients();

            // Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            // Render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
        }
        catch(err) {
            alert('Error processing recipe!');
        }
    }
};

////////////////////////////// List Controller //////////////////////////////

const controlList = () => {
    // Create a new list if there is none
    if(!state.list) state.list = new List();

    state.recipe.ingredients.forEach(el => {
        // Add ingredients to the list
        const item = state.list.addItem(el.count, el.unit, el.ingredient);

        // Render item(s) to the UI
        listView.renderItem(item);
    });
};

////////////////////////////// Likes Controller //////////////////////////////

const controlLike = () => {
    // Create a new like if there is none
    if(!state.likes) state.likes = new Likes();

    const id = state.recipe.id;

    // If user has liked or not the current recipe
    if(!state.likes.isLiked(id)) {
        // Add like to the state
        const newLike = state.likes.addLike(id, state.recipe.title, state.recipe.author, state.recipe.img);

        // Toggle the button
        likesView.toggleLikeBtn(true);

        // Add like to UI list
        likesView.renderLikeItem(newLike);
    }
    else {
        // Remove like from the state
        state.likes.deleteLike(id);

        // Toggle the button
        likesView.toggleLikeBtn(false);

        // Remove like from UI list
        likesView.deleteLikeItem(id);
    }

    // Toggle the like menu
    likesView.toggleLikeMenu(state.likes.getNumLikes());
};


////////////////////////////// Event Handlers //////////////////////////////

// Track the recipe id on hash change
window.addEventListener('hashchange', controlRecipe);

// Track the recipe id on load
window.addEventListener('load', controlRecipe);


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


// Handle delete and update list item events
elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    // Delete item
    if(e.target.matches('.shopping__delete, .shopping__delete *')) {
        // Delete from state
        state.list.deleteItem(id);

        // Delete from UI
        listView.deleteItem(id);
    }
    // Update item value
    else if(e.target.matches('.shopping__count-value')) {
        const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id, val);
    }
});


// Restore liked recipes on page load
window.addEventListener('load', () => {
    state.likes = new Likes();

    // Restore likes
    state.likes.readStorage();

    // Toggle like menu button
    likesView.toggleLikeMenu(state.likes.getNumLikes());

    // Render the existing likes
    state.likes.likes.forEach(like => likesView.renderLikeItem(like));
});


// Handle recipe button clicks
elements.recipe.addEventListener('click', e => {
    // Check which button was clicked
    if(e.target.matches('.btn-decrease, .btn-decrease *')) {
        if(state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    }
    else if(e.target.matches('.btn-increase, .btn-increase *')) {
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    }
    else if(e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        // Add ingredients to shopping list
        controlList();
    }
    else if(e.target.matches('.recipe__love, .recipe__love *')) {
        controlLike();
    }
});


// Handle like item clear button
elements.likesList.addEventListener('click', e => {
    if(e.target.matches('.recipe__delete, .recipe__delete *')) {
        // Hide likes list from the UI
        likesView.toggleLikeMenu(0);
        
        // Remove all like items from UI
        state.likes.likes.forEach(el => likesView.deleteLikeItem(el.id));

        // Clear likes data
        state.likes.removeAllLikeItems();

        // Toggle the recipe like button
        likesView.toggleLikeBtn(false);
    }
});
