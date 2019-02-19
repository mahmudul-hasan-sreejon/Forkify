
// DOM selector strings
export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchRes: document.querySelector('.results'),
    searchResList: document.querySelector('.results__list')
};

// Render a loader on the UI
export const renderLoaded = parent => {
    const loader = `
        <div class="loader">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;

    // Add a loader after a search
    parent.insertAdjacentHTML('afterbegin', loader);
};
