const axios = require('axios').default;

export default class ImagesApiService {
    constructor() {
        this.searchQuery = ''
        this.per_page = 39
        this.page = 1
    }
   async feachImages() {
        const URL = 'https://pixabay.com/api/'
       
      return  axios.get(URL, {
            params: {
            key: '29744257-c594c594fd182235a7d0b53c9',
            q: this.searchQuery,
            image_type: 'photo',
            orientation: 'horizontal',
              safesearch: true,
              per_page: this.per_page,
            page: this.page
            }
        }).then(response => {
            if (response.data.hits.length === 0) {
                return Promise.reject(new Error());

            }
            return response
            } )
            
    }
    incrementPage() { 
        this.page += 1;
    }

    resetPage() { 
        this.page = 1;
    }
    get query() {
        return this.searchQuery
    }
    set query(newQuery) {
        this.searchQuery = newQuery
    }
    
}
