
// DOM selector strings
export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchRes: document.querySelector('.results'),
    searchResList: document.querySelector('.results__list'),
    searchResPages: document.querySelector('.results__pages'),
    recipe: document.querySelector('.recipe'),
    shopping: document.querySelector('.shopping__list'),
    likesMenu: document.querySelector('.likes__field'),
    likesList: document.querySelector('.likes__list')
};

export const elementStrings = {
    loader: 'loader'
};

// Render a loader on the UI
export const renderLoader = parent => {
    const loader = `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;

    // Add a loader after a search
    parent.insertAdjacentHTML('afterbegin', loader);
};

// Clear loader from the UI
export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);

    // If loader exists the remove loader from the parent element
    if(loader) loader.parentElement.removeChild(loader);
};
