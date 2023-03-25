export const fetchCountries = name => {
    const url = `https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`;
      return fetch(url).then(res => {
            if (!res.ok) {
                throw new Error(response.status);
            }
            return res.json()
        })
    }