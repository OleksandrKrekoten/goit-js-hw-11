import ImagesApiService from './js/ImagesApiService'
import Notiflix from 'notiflix'
import { createMarkupInfo } from './js/renderMarkup'
import './styles/styles.css'
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


const imagesApiService = new ImagesApiService()
 const refs = {
    form: document.querySelector('#search-form'),
    input: document.querySelector('[name="searchQuery"]'),
    submitBtn: document.querySelector('[type="submit"]'),
     gallery: document.querySelector('.gallery'),
     loadMoreBtn: document.querySelector('.load-more')
}
let simpleLightBox;
refs.form.addEventListener('submit', onSubmit)
refs.input.addEventListener('input', (e) =>imagesApiService.query = e.target.value)
refs.loadMoreBtn.addEventListener('click', onLoadMore)

function onSubmit(e) {
    e.preventDefault()
  resetMarkup()
    imagesApiService.feachImages()
      .then(result => {
        Notiflix.Notify.success(`Hooray! We found  ${result.data.totalHits}images.`);
          renderMarkup(result)
          simpleLightBox = new SimpleLightbox('.gallery a').refresh();
        refs.loadMoreBtn.classList.remove('d-none')
        if (result.data.totalHits < imagesApiService.per_page) {
            refs.loadMoreBtn.classList.add('d-none')
          }
            })
      .catch(error => {
              refs.loadMoreBtn.classList.add('d-none')
      Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
    })
        
}
 
function renderMarkup(result) {
  const markup = createMarkupInfo(result)
 refs.gallery.insertAdjacentHTML('beforeend',markup) 
} 
 
function onLoadMore() {
  imagesApiService.incrementPage()
  simpleLightBox.destroy()
    imagesApiService.feachImages()
        .then(result => {
          renderMarkup(result)
          simpleLightBox = new SimpleLightbox('.gallery a').refresh();
          refs.loadMoreBtn.classList.remove('d-none')
          const pages = Math.ceil(result.data.totalHits / imagesApiService.per_page)
          
          
          if( imagesApiService.page == pages) {
            refs.loadMoreBtn.classList.add('d-none')
          }
        }).catch(error => {
          console.log(error);
        })
  
}
 

function resetMarkup() {
  refs.gallery.innerHTML = ''
}
