const form = document.getElementById('js--form');

form.addEventListener('submit', function (event) {
  event.preventDefault();
  const userName = this.username;
  const email = this.email;
  const phone = this.phone;
  const password = this.password;
  const confirmPassword = this.confirmPassword;
  validation(userName, email, phone, password, confirmPassword);
});

const sendData = (successCount, count) => {
  console.log(`success: ${successCount}, count: ${count}`);
  if (successCount === count) {
    alert('Registration successful');
    // location.href = 'login.html';
  }
};

const submitFormSuccess = () => {
  const elements = document.querySelectorAll('.form-group');
  const length = elements.length;
  let count = elements.length - 1;
  let successCount;
  let i;
  for (i = 0; i < length; i++) {
    if (elements[i].classList.contains('success')) {
      successCount = 1 + i;
      sendData(successCount, count);
    } else {
      return false;
    }
  }
};

const isEmail = (email) => {
  const atSymbol = email.indexOf('@');
  if (atSymbol < 1) return false;
  const dot = email.indexOf('.');
  if (dot <= atSymbol + 2) return false;
  if (dot === email.length - 1) return false;
  return true;
};

function validation(userName, email, phone, password, confirmPassword) {
  const userNameValue = userName.value.trim();
  const emailValue = email.value.trim();
  const phoneValue = phone.value.trim();
  const passwordValue = password.value.trim();
  const confirmPasswordValue = confirmPassword.value.trim();

  if (userNameValue === '') {
    showError(userName, 'Username can not be empty');
  } else if (userNameValue.length < 3) {
    showError(userName, 'Username should be minimum 3 characters');
  } else {
    showSuccess(userName);
  }

  if (emailValue === '') {
    showError(email, 'Email can not be empty');
  } else if (!isEmail(emailValue)) {
    showError(email, 'Please provide a valid email');
  } else {
    showSuccess(email);
  }

  if (phoneValue === '') {
    showError(phone, 'Phone number can not be empty');
  } else if (!phoneValue.match(/^[0-9]*$/)) {
    showError(phone, 'Please provide only digits (0-9)');
  } else if (phoneValue.length !== 11) {
    showError(phone, 'Phone number must be 11 characters');
  } else {
    showSuccess(phone);
  }

  if (passwordValue === '') {
    showError(password, 'Password can not be empty');
  } else if (passwordValue.length < 6 || passwordValue.length > 20) {
    showError(password, 'Password should be between 6 and 20 characters');
  } else {
    showSuccess(password);
  }

  if (confirmPasswordValue === '') {
    showError(confirmPassword, 'Confirm password can not be empty');
  } else if (confirmPasswordValue !== passwordValue) {
    showError(confirmPassword, 'Pasword does not match');
  } else {
    showSuccess(confirmPassword);
  }

  submitFormSuccess(userNameValue);
}

const handleIcon = (iconElement, visible, color, iconAdd, iconRemove) => {
  iconElement.style.visibility = visible;
  iconElement.style.color = color;
  iconElement.classList.add(iconAdd);
  iconElement.classList.remove(iconRemove);
};

function showError(element, msg) {
  element.style.borderColor = '#e74c3c';
  const msgElement = element.parentElement.querySelector('.message');
  element.parentElement.classList.add('error');
  element.parentElement.classList.remove('success');
  msgElement.style.color = '#e74c3c';
  msgElement.style.visibility = 'visible';
  msgElement.textContent = msg;
  const iconElement = element.parentElement.querySelector('.fa');
  handleIcon(
    iconElement,
    'visible',
    '#e74c3c',
    'fa-exclamation-circle',
    'fa-check-circle'
  );
}

function showSuccess(element) {
  element.style.borderColor = '#2ecc71';
  const msgElement = element.parentElement.querySelector('.message');
  element.parentElement.classList.add('success');
  element.parentElement.classList.remove('error');
  msgElement.style.visibility = 'hidden';
  const iconElement = element.parentElement.querySelector('.fa');
  handleIcon(
    iconElement,
    'visible',
    '#2ecc71',
    'fa-check-circle',
    'fa-exclamation-circle'
  );
}
