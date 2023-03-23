const debounce = require('lodash.debounce');


import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const input = document.getElementById('search-box');

const fetchCountries = name => {
const url = `https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`;
  fetch(url).then(res => {
        if (!res.ok) {
            throw new Error(res.status);
        }
        return res.json()
    })
}

const hendlerInput = e => {
    console.log(e.target.value)
    const inputValue = e.target.value;
    
    fetchCountries(inputValue).then(console.log);
 } 
input.addEventListener("input", debounce(hendlerInput ,300));