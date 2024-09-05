'use strict';

const showModal = document.querySelectorAll('.show-modal');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeModal = document.querySelector('.close-modal');

function open() {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

function close() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}

for (let i = 0; i < showModal.length; i++) {
  showModal[i].addEventListener('click', open);
}

closeModal.addEventListener('click', close);
overlay.addEventListener('click', close);

document.addEventListener('keydown', function (key) {
  if (key.key === 'Escape' && !modal.classList.contains('hidden')) {
    close();
  }
});
