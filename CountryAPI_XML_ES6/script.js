'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

function getCountry(data) {
  const currency = Object.entries(data.currencies)[0][0];
  const language = Object.entries(data.languages)[0][1];
  const html = `<article class="country">
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)}</p>
      <p class="country__row"><span>🗣️</span>${language}</p>
      <p class="country__row"><span>💰</span>${currency}</p>
    </div>
  </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
}

function getCountryNeighbor(country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    getCountry(data);
    console.log(data);

    const neighboor = data.borders;

    neighboor.forEach(neighboor => {
      const request2 = new XMLHttpRequest();
      request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighboor}`);
      request2.send();

      request2.addEventListener('load', function () {
        const [data] = JSON.parse(this.responseText);
        getCountry(data);
      });
    });
  });
}

//getCountryNeighbor('greece');

// const fountry = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => {
//       if (!response.ok) {
//         alert('API connected but cant fetch the data');
//       } else {
//         return response.json();
//       }
//     })
//     .then(data => getCountryNeighbor(country));
// };

// fountry('greece');
