// variables
const showModalBtn = document.querySelector('#btnShow');
const modal = document.querySelector('.modal');
const closeModalBtn = modal.querySelector('#btnClose');
const modalWindow = modal.querySelector('.modal__window');
const overlay = modal.querySelector('.overlay');
const form = modal.querySelector('.modal__form');
const inputName = modal.querySelector('input[type="text"]');
const inputPassword = modal.querySelector('input[type="password"]');
const submitBtn = modal.querySelector('button');

const numberRegexp = /^([^0-9]*)$/;
const passwordRegexp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{7,}$/;

submitBtn.setAttribute('disabled', true)

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
  hideAllErrors();
}

function showError(text, context) {
  context.parentElement.classList.add('has-error')
  context.parentElement.childNodes[3].textContent = text;
  setTimeout(function() {
    context.parentElement.childNodes[3].classList.add('animate__headShake');
  }, 500);
}

function hideError(context) {
  context.parentElement.classList.remove('has-error');
  context.parentElement.childNodes[3].textContent = '';
  context.parentElement.childNodes[3].classList.remove('animate__headShake');
}

function hideAllErrors() {
  let formGroups = modal.querySelectorAll('.form-group');
  formGroups.forEach(function(formGroup) {
    formGroup.classList.remove('has-error');
    formGroup.childNodes[3].classList.remove('animate__headShake');
  })
}

function isNameAndPasswordValid(name, password) {
  return name.length && name.length >= 3 && numberRegexp.test(name) && password.length && password.length >= 7 && passwordRegexp.test(password);
}

function checkValidation() {
  const name = inputName.value.trim();
  const password = inputPassword.value.trim();
  
  if (isNameAndPasswordValid(name, password)) {
    submitBtn.removeAttribute('disabled');
  } else {
    submitBtn.setAttribute('disabled', true);
  }
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

inputName.addEventListener('input', function() {
  hideError(this);
  
  checkValidation();
})

inputPassword.addEventListener('input', function() {
  hideError(this);
  checkValidation();
})

inputName.addEventListener('blur', function() {
  if (!this.value.trim().length) {
    showError('"Name" field is required!', this)
  } else if (this.value.trim().length < 3) {
    showError('the "name" field must be at least 3 characters long!', this);
  } else if (!numberRegexp.test(this.value.trim())) {
    showError('the "name" field must not include numbers!', this);
  }
})

inputPassword.addEventListener('blur', function() {
  if (!this.value.trim().length) {
    showError('"password" field is required!', this);
  } else if (this.value.trim().length < 7) {
    showError('the "password" field must be at least 7 characters long!', this);
  } else if (!passwordRegexp.test(this.value.trim())) {
    showError('the password must consist of uppercase and lowercase letters, have numbers and symbols in it', this);
  }
})

