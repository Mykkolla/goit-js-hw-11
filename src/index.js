import './sass/index.scss';
import NewsApiService from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox = new SimpleLightbox('.photo-card a', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
  });
 
  const searchForm = document.querySelector('.search-form');
  const galleryContainer = document.querySelector('.gallery');
  const loadMoreBtn = document.querySelector('.load-more');

let isShown = 0;
const newsApiService = new NewsApiService();

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);
loadMoreBtn.style.display = 'none';
const options = {
  rootMargin: '50px',
  root: null,
  threshold: 0.3,
};
new IntersectionObserver(onLoadMore, options);

function onSearch(e) {
  e.preventDefault();

  galleryContainer.innerHTML = '';
  newsApiService.query = e.currentTarget.elements.searchQuery.value.trim();
  newsApiService.resetPage();

  if (newsApiService.query === '') {
    Notify.warning('Please, fill the main field');
    return;
  }

  isShown = 0;
  fetchGallery();
  // onRenderGallery(hits);
}

function onLoadMore() {
  newsApiService.incrementPage();
  fetchGallery();
}

async function fetchGallery() {
  loadMoreBtn.style.display = 'none';
  const gar = await newsApiService.fetchGallery();
  const { hits, total } = gar;
  isShown += hits.length;
  if (!hits.length) {
    Notify.failure(
      `Sorry, there are no images matching your search query. Please try again.`
    );
    loadMoreBtn.style.display = 'none';
    return;
  }
  onRenderGallery(hits);
  isShown += hits.length;
  if (isShown < total) {
    Notify.success(`Hooray! We found ${total} images !!!`);
    loadMoreBtn.style.display = 'block';
  }
  if (isShown >= total) {
    Notify.info("We're sorry, but you've reached the end of search results.");
    loadMoreBtn.style.display = 'block';
  }
}

function onRenderGallery(elements) {
  const markup = elements
    .map(
      ({webformatURL,largeImageURL,tags,
      likes,views,comments,downloads,
      }) => {
        return `<div class="photo-card">
    <a href="${largeImageURL}">
      <img class="photo-img" src="${webformatURL}" alt="${tags}" loading="lazy" />
    </a>
    <div class="info">
      <p class="info-item">
        <b>Likes</b>
        ${likes}
      </p>
      <p class="info-item">
        <b>Views</b>
        ${views}
      </p>
      <p class="info-item">
        <b>Comments</b>
        ${comments}
      </p>
      <p class="info-item">
        <b>Downloads</b>
        ${downloads}
      </p>
    </div>
    </div>`;
      }
    )
    .join('');
  galleryContainer.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}