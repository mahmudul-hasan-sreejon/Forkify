
import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    // Fetch data using the food2fork API
    async getResults() {
        const key = '274b65f392b95ce28cf43e8972cb61b3';

        try {
            const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = res.data.recipes;

            // console.log(this.result);
        }
        catch(err) {
            alert(err);
        }
    }
}
