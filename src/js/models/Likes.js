
export default class Likes {
    constructor() {
        this.likes = [];
    }

    // Add a like
    addLike(id, title, author, img) {
        const like = {
            id,
            title,
            author,
            img
        };

        // Add new like item
        this.likes.push(like);

        // Persist data
        this.persistData();

        return like;
    }

    // Delete a like
    deleteLike(id) {
        // Find the index of the like item with the given `id`
        const index = this.likes.findIndex(el => el.id === id);

        // Delete like
        this.likes.splice(index, 1);

        // Persist data
        this.persistData();
    }

    // Find whether a recipe is liked or not
    isLiked(id) {
        return this.likes.findIndex(el => el.id === id) !== -1;
    }

    // Number of likes
    getNumLikes() {
        return this.likes.length;
    }

    // Persist data in localStorage
    persistData() {
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    // Read localStorage data
    readStorage() {
        const storage = JSON.parse(localStorage.getItem('likes'));

        // Restore likes form the localStorage
        if(storage) this.likes = storage;
    }
}
