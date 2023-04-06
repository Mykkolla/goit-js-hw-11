import Notiflix from 'notiflix';
const axios = require('axios');
const debounce = require('lodash.debounce');
import { fetchCountries } from './fetchCountries.js';

import './css/styles.css';


document.getElementById('search-form').addEventListener('submit', handleLoadMoreButtonClick)
const gallery = document.querySelector('.gallery');
// const loadMoreBtn = document.querySelector('.load-more')

const API_KEY = '35143561-a246dd3ff16ac48132d2e40aa'; // Замініть на свій API-ключ Pixabay
const MAX_PER_PAGE = 40; // Максимальна кількість зображень на сторінці
let currentPage = 1; // Поточна сторінка
let currentKeyword = ''; // Поточне ключове слово

async function handleLoadMoreButtonClick(event) {
  event.preventDefault();
  const searchQuery = event.target.elements.searchQuery.value;
  if (searchQuery === '') {
    alert('Please enter a search query');
    return;
}
  try {
   const response = await fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}&page=${currentPage}&per_page=${MAX_PER_PAGE}`
  );
  const data = await response.json();
  if (data.hits.length === 0) {
  gallery.innerHTML = '<p>Sorry, there are no images matching your search query. Please try again.</p>';
}
else {renderImageCards(data.hits);}
} 
catch (error) {
      console.error('Error fetching images:', error);
      return null;
}
};

function renderImageCards(images) {

  gallery.innerHTML = '';
  images.forEach(image => {
    const imageCard = `
      <div class="photo-card">
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
        <div class="info">
          <p class="info-item"><b>Likes:</b> ${image.likes}</p>
          <p class="info-item"><b>Views:</b> ${image.views}</p>
          <p class="info-item"><b>Comments:</b> ${image.comments}</p>
          <p class="info-item"><b>Downloads:</b> ${image.downloads}</p>
        </div>
      </div>
    `;
    
    gallery.insertAdjacentHTML('beforeend', imageCard);
  });
}

const button = document.querySelector('.load-more');
    button.addEventListener('click', loadMore);



function createImageCard(image) {
  const card = document.createElement('div');
  card.className = 'photo-card';

  const img = document.createElement('img');
  img.src = image.webformatURL;
  img.alt = image.tags;
  img.loading = 'lazy';

  const info = document.createElement('div');
  info.className = 'info';

  const likes = document.createElement('p');
  likes.className = 'info-item';
  likes.innerHTML = `<b>Likes:</b> ${image.likes}`;

  const views = document.createElement('p');
  views.className = 'info-item';
  views.innerHTML = `<b>Views:</b> ${image.views}`;

  const comments = document.createElement('p');
  comments.className = 'info-item';
  comments.innerHTML = `<b>Comments:</b> ${image.comments}`;

  const downloads = document.createElement('p');
  downloads.className = 'info-item';
  downloads.innerHTML = `<b>Downloads:</b> ${image.downloads}`;

  info.appendChild(likes);
  info.appendChild(views);
  info.appendChild(comments);
  info.appendChild(downloads);

  card.appendChild(img);
  card.appendChild(info);

  return card;
}

// axios.get('https://pixabay.com/api/', {
//   params: {
//     key: apiKey,
//     q: searchQuery,
//     image_type: imageType,
//     orientation: orientation,
//     safesearch: safeSearch,
//     per_page: perPage,
//     page: page
//   }
// })
// .then(response => {
//   // Обробка відповіді
//   const images = response.data.hits; // Масив зображень
//   if (images.length === 0) {
//     // Показ повідомлення про відсутність зображень
//     console.log("Sorry, there are no images matching your search query. Please try again.");
//   } else {
//     // Відображення зображень на сторінці
//     images.forEach(image => {
//       // Отримання необхідних властивостей зображення
//       const webformatURL = image.webformatURL;
//       const largeImageURL = image.largeImageURL;
//       const tags = image.tags;
//       const likes = image.likes;
//       const views = image.views;
//       const comments = image.comments;
//       const downloads = image.downloads;

//       // Додавання розмітки картки зображення до галереї
//       const gallery = document.querySelector('.gallery');
//       const photoCard = document.createElement('div');
//       photoCard.classList.add('photo-card');
//       photoCard.innerHTML = `
//         <img src="${webformatURL}" alt="${tags}" loading="lazy" />
//         <div class="info">
//           <p class="info-item"><b>Likes:</b> ${likes}</p>
//           <p class="info-item"><b>Views:</b> ${views}</p>
//           <p class="info-item"><b>Comments:</b> ${comments}</p>
//           <p class="info-item"><b>Downloads:</b> ${downloads}</p>
//         </div>
//       `;
//       gallery.appendChild(photoCard);
//     });
//   }
// })
// .catch(error => {
//   // Обробка помилки
//   console.error('Error fetching images:', error);
// });