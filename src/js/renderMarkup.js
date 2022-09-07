

     function createMarkupInfo(result) {
    
  
    return result.data.hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
   `           <div class="photo-card">
   <div class="overflow"><img class = "card-image" src="${webformatURL}" alt="${tags}" loading="lazy"/></div>
                <div class="info">
                    <p class="info-item">
                        <b>likes:</b> 
                        ${likes}
                    </p>
                    <p class="info-item">
                        <b>views:</b> 
                        ${views}
                    </p>
                    <p class="info-item">
                        <b>comments:</b>
                        ${comments}
                    </p>
                    <p class="info-item">
                        <b>downloads:</b>
                        ${downloads}
                    </p>
                </div>
            </div>`)
}

export {  createMarkupInfo}