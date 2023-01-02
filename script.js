// variables
const showModalBtn = document.querySelector('#btnShow');
const modal = document.querySelector('.modal')
const closeModalBtn = document.querySelector('#btnClose');
const modalWindow = modal.querySelector('.modal__window');
const overlay = modal.querySelector('.overlay');
const form = modal.querySelector('.modal__form');
const inputName = modal.querySelector('input[type="text"]');
const inputPassword = modal.querySelector('input[type="password"]');
const inputFormGroup = modal.querySelector('.form-group');
const passwordFormGroup = modal.querySelectorAll('.form-group')[1];

// functions
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

// EventListeners
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

inputName.addEventListener('blur', function() {
  if(!this.value.length) {
    inputFormGroup.classList.add('has-error')
    inputFormGroup.childNodes[3].textContent = '"Name" field is required!';
  } else {
      inputFormGroup.classList.remove('has-error')
      inputFormGroup.childNodes[3].textContent = '';
  }
})

inputPassword.addEventListener('blur', function() {
  if(!this.value.length) {
    passwordFormGroup.classList.add('has-error')
    passwordFormGroup.childNodes[3].textContent = '"password" field is required!';
  } else {
      passwordFormGroup.classList.remove('has-error')
      passwordFormGroup.childNodes[3].textContent = '';
  }
})