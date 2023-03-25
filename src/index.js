import Notiflix from 'notiflix';
const debounce = require('lodash.debounce');
import { fetchCountries } from './fetchCountries.js';

import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const input = document.getElementById('search-box');
const ulCountryName = document.querySelector(".country-list");
const divCountryInfo = document.querySelector(".country-info");
ulCountryName.style.listStyleType = 'none';





const hendlerInput = e => {
    const inputValue = e.target.value.trim();
    if (inputValue === '') {
        clearAll ();
        return;
      }
      
    fetchCountries(inputValue).then(countries => {
        if (countries.length === 0) {
          Notiflix.Notify.warning('Oops, there is no country with that name');
          searchResults.innerHTML = '';
          return;
        }
        else {
            VisualInit(countries);
        }
    }).catch(error => {
        Notiflix.Notify.failure(`Oops, there is no country with that name`);
    })
};


input.addEventListener("input", debounce(hendlerInput , DEBOUNCE_DELAY));




const VisualInit = (countries) => {

if (countries.length > 10 ) {
    Notiflix.Notify.warning('Too many matches found. Please enter a more specific name.')
    divCountryInfo.innerHTML = '';
}
else if (countries.length > 1) {
    clearAll ();
    const countryMarkup = countries.map(country => `
    <li>
    <img src="${country.flags.svg}" alt="Flag of ${country.name}" width = 25px>
    <span><strong>${country.name}</strong></span>
    </li>
  `).join('');
  ulCountryName.insertAdjacentHTML("beforeend", countryMarkup);
  divCountryInfo.innerHTML = '';
}
else if (countries.length === 1) {
    clearAll ();
    const country = countries[0];
ulCountryName.innerHTML = `<li>
            <img src="${country.flags.svg}" alt="${country.name} flag" width = 25px>
            <span><strong>${country.name}</strong></span>
          </li>
        `;
divCountryInfo.innerHTML = `
      <div><strong>Capital:</strong> ${country.capital}</div>
      <div><strong>Population:</strong> ${country.population}</div>
      <div><strong>Languages:</strong> ${country.languages.map(lang => lang.name).join(', ')}</div>
  `;
}  
else {
    ulCountryName.innerHTML = '';
    divCountryInfo.innerHTML = '<p>No country found</p>';
  }  
}


function clearAll () {
    ulCountryName.innerHTML = '';
    divCountryInfo.innerHTML = '';
}