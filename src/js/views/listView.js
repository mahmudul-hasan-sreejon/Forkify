
import { elements } from './base';


// Render list item(s)
export const renderItem = item => {
    const markup = `
        <li class="shopping__item" data-itemid=${item.id}>
            <div class="shopping__count">
                <input type="number" value="${item.count}" step="${item.count}" class="shopping__count-value">
                <p>${item.unit}</p>
            </div>

            <p class="shopping__description">${item.ingredient}</p>

            <button class="shopping__delete btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
        </li>
    `;

    // Add list item(s) in the UI
    elements.shopping.insertAdjacentHTML('beforeend', markup);
};

// Delete list item(s)
export const deleteItem = id => {
    // Find the item of given `id`
    const item = document.querySelector(`[data-itemid="${id}"]`);

    // Remove the item if there is one
    if(item) item.parentElement.removeChild(item);
};
