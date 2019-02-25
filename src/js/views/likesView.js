
import { elements } from './base';
import { limitRecipeTitle } from './searchView';


// Toggle the like button
export const toggleLikeBtn = isLiked => {
    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';

    // Update like button status
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconString}`);
};

// Toggle the like menu
export const toggleLikeMenu = numLikes => {
    elements.likesMenu.style.visibility = (numLikes > 0) ? 'visible' : 'hidden';
};

export const renderClearListBtn = () => {
    const markup = `
        <li class="recipe__delete">
            <button class="btn">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
                <span>Clear List</span>
            </button>
        </li>
    `;

    // Insert like item
    elements.likesList.insertAdjacentHTML('beforeend', markup);
}

// Render like menu item
export const renderLikeItem = like => {
    const markup = `
        <li>
            <a class="likes__link" href="#${like.id}">
                <figure class="likes__fig">
                    <img src="${like.img}" alt="${like.title}">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${limitRecipeTitle(like.title)}</h4>
                    <p class="likes__author">${like.author}</p>
                </div>
            </a>
        </li>
    `;

    // Insert like item
    elements.likesList.insertAdjacentHTML('beforeend', markup);
};

// Delete like item
export const deleteLikeItem = id => {
    const el = document.querySelector(`.likes__link[href*="${id}"]`).parentElement;

    // If there is a like item then remove it
    if(el) el.parentElement.removeChild(el);
};
