
import uniqid from 'uniqid';


export default class List {
    constructor() {
        this.items = [];
    }

    // Add an item
    addItem(count, unit, ingredient) {
        const item = {
            id: uniqid,
            count,
            unit,
            ingredient
        };

        // Add the new item
        this.items.push(item);
        return item;
    }

    // Delete an item
    deleteItem(id) {
        // Find the index of the item with the given `id`
        const index = this.items.findIndex(el => el.id === id);
        // Delete item
        this.items.splice(index, 1);
    }

    // Update ingredient count
    updateCount(id, newCount) {
        // Find item with the given `id` and update it with the new count
        this.items.find(el => el.id === id).count = newCount;
    }
}
