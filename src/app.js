import ImagesApiService from './js/ImagesApiService'
import Notiflix from 'notiflix'
import { createMarkupInfo } from './js/renderMarkup'
import './styles.css'



const imagesApiService = new ImagesApiService()
 const refs = {
    form: document.querySelector('#search-form'),
    input: document.querySelector('[name="searchQuery"]'),
    submitBtn: document.querySelector('[type="submit"]'),
     gallery: document.querySelector('.gallery'),
     loadMoreBtn: document.querySelector('.load-more')
}
// refs.loadMoreBtn.addEventListener('click', onLoadMore)
refs.form.addEventListener('submit', onSubmit)
refs.input.addEventListener('input', (e) =>imagesApiService.query = e.target.value)

function onSubmit(e) {
    e.preventDefault()
    resetMarkup()
    imagesApiService.feachImages()
        .then(result => {
        renderMarkup (result)
            })
            .catch(error => {
      Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
    })
        
}
 
function renderMarkup(result) {
    const info = createMarkupInfo(result)
 refs.gallery.innerHTML = info
} 
 
// function onLoadMore() {
    
// }
 

function resetMarkup() {
  refs.gallery.innerHTML = ''
}
