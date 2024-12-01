const gamesData = [
  { name: 'Game 1', link: 'catan',  rating: 4, price: '$20', image: '../images/game1.png' },
  { name: 'Game 2', link: 'scythe',  rating: 5, price: '$40', image: '../images/game2.jpg' },
  { name: 'Game 3', link: 'scythe',  rating: 3, price: '$35', image: '../images/game3.png' },
  { name: 'Game 4', link: 'catan',  rating: 1, price: '$15', image: '../images/game4.jpg' },
  { name: 'Game 5', link: 'catan',  rating: 4, price: '$24', image: '../images/game5.jpg' },
  { name: 'Game 6', link: 'catan',  rating: 4, price: '$36', image: '../images/game1.png' },
  { name: 'Game 7', link: 'catan',  rating: 5, price: '$44', image: '../images/game1.png' },
  { name: 'Game 8', link: 'catan',  rating: 2, price: '$33', image: '../images/game3.png' },
  { name: 'Game 9', link: 'catan',  rating: 2, price: '$32', image: '../images/best-seller.png' },
  { name: 'Game 10', link: 'catan',  rating: 3, price: '$43', image: '../images/best-seller.png' },
  { name: 'Game 11', link: 'catan',  rating: 4, price: '$13', image: '../images/game3.png' },
  { name: 'Game 12', link: 'catan',  rating: 5, price: '$23', image: '../images/best-seller.png' },
];

const cart = [];

document.addEventListener('DOMContentLoaded', function () {
  const filters = {
    rating: document.getElementById('rating-filter'),
    price: document.getElementById('price-filter'),
    sortSelect: document.getElementById('sort-select'),
  };

  const gamesContainer = document.querySelector('.games');

  function generateGameCard(game) {
    const card = document.createElement('div');
    card.classList.add('game-card');

    const image = document.createElement('img');
    image.classList.add('game-image');
    image.src = game.image;
    image.alt = game.name;

    const name = document.createElement('h3');
    name.textContent = game.name;

    const rating = document.createElement('p');
    rating.textContent = `Rating: ${game.rating} stars`;

    const price = document.createElement('p');
    price.classList.add('price');
    price.textContent = `Price: ${game.price}`;

    const button = document.createElement('div');
    button.classList.add('button', 'game-card-button');
    button.textContent = 'See Details';
    button.addEventListener('click', function () {
      console.log(`Added ${game.name} to the shopping cart`);
      window.location.href = "catalog/" + game.link + ".html";
    });

    card.appendChild(image);
    card.appendChild(name);
    card.appendChild(rating);
    card.appendChild(price);
    card.appendChild(button);

    gamesContainer.appendChild(card);
  }

  function renderGames() {
    gamesContainer.innerHTML = '';

    const ratingFilter = filters.rating.value;
    const priceFilter = filters.price.value;
    const sortCriteria = filters.sortSelect.value;

    let filteredGames = gamesData;

    if (ratingFilter) {
      filteredGames = filteredGames.filter(
        (game) => game.rating == ratingFilter
      );
    }

    if (priceFilter) {
      const [minPrice, maxPrice] = priceFilter.split('-').map(Number);
      filteredGames = filteredGames.filter((game) => {
        const gamePrice = parseInt(game.price.substring(1));
        return gamePrice >= minPrice && gamePrice <= maxPrice;
      });
    }

    if (sortCriteria === 'rating') {
      filteredGames.sort((a, b) => b.rating - a.rating);
    } else if (sortCriteria === 'price') {
      filteredGames.sort(
        (a, b) =>
          parseInt(a.price.substring(1)) - parseInt(b.price.substring(1))
      );
    } else if (sortCriteria === 'name') {
      filteredGames.sort((a, b) => a.name.localeCompare(b.name));
    }

    filteredGames.forEach((game) => generateGameCard(game));
  }

  filters.rating.addEventListener('change', renderGames);
  filters.price.addEventListener('change', renderGames);
  filters.sortSelect.addEventListener('change', renderGames);

  renderGames();
});
