
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
        return like;
    }

    // Delete a like
    deleteLike(id) {
        // Find the index of the like item with the given `id`
        const index = this.likes.findIndex(el => el.id === id);

        // Delete like
        this.likes.splice(index, 1);
    }

    // Find whether a recipe is liked or not
    isLiked(id) {
        return this.likes.findIndex(el => el.id === id) !== -1;
    }

    // Number of likes
    getNumLikes() {
        return this.likes.length;
    }
}
