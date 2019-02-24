
import { elements } from './base';


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
