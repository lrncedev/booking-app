const cards = document.querySelectorAll('.card');

cards.forEach(card => card.addEventListener('click', (e)=> {
  console.log(e.currentTarget);
}))