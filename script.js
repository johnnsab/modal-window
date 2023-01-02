const showModalBtn = document.querySelector('#btnShow');
const modal = document.querySelector('.modal')
const closeModalBtn = document.querySelector('#btnClose');
const modalWindow = modal.querySelector('.modal__window');
const overlay = modal.querySelector('.overlay');
const form = modal.querySelector('.modal__form');
const inputName = modal.querySelector('input[type="text"]');

function openModal() {
  modalWindow.classList.remove('animate__rotateOut');
  modal.style.display = 'block';
  setTimeout(function() {
    modal.style.opacity = 1;
  }, 0);
  modalWindow.classList.add('animate__rotateIn');
}

function closeModal() {
  modalWindow.classList.remove('animate__rotateIn');
  modal.style.opacity = 0;
  modalWindow.classList.add('animate__rotateOut');
  setTimeout(function() {
   modal.style.display = 'none';
  }, 500);
  form.reset();  
}

showModalBtn.addEventListener('click', function(event) {
  event.preventDefault();
  openModal();
  inputName.focus();
});

closeModalBtn.addEventListener('click', closeModal);

// clickOutside
// modalWindow.addEventListener('click', function(e) {
//   e.stopPropagation();
// });

overlay.addEventListener('click', function(event) {
  if(!modalWindow.contains(event.target)) {
    closeModal()
  }
});

document.addEventListener('keyup', function(event) {
  if(event.code === 'Escape') {
    closeModal();
  }
});

form.addEventListener('submit', function(event) {
  event.preventDefault();
  closeModal();
});