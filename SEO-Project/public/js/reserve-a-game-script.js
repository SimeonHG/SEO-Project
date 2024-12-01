document.addEventListener('DOMContentLoaded', function () {
  const reserveButtons = document.querySelectorAll('.reserve-button');

  reserveButtons.forEach(function (button) {
    button.addEventListener('click', function (event) {
      event.preventDefault();
      const gameCard = button.closest('.game-card');
      gameCard.classList.toggle('selected');
    });
  });
});
