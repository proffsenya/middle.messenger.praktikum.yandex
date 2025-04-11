function initRegistration() {
  const registerForm = document.getElementById('registerForm');
  
  if (!registerForm) console.warn("error");

  const validatePhone = (phone) => /^\+7\d{10}$/.test(phone);

  const validatePassword = (password) => password.length >= 8;

  const showError = (message) => {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    registerForm.prepend(errorElement);
    setTimeout(() => errorElement.remove(), 3000);
  };

  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const existingErrors = document.querySelectorAll('.error-message');
    existingErrors.forEach(error => error.remove());

    const getValue = (id) => registerForm.querySelector(`#${id}`)?.value.trim();

    const formData = {
      email: getValue('email'),
      login: getValue('login'),
      firstName: getValue('first_name'),
      lastName: getValue('second_name'),
      phone: getValue('phone'),
      password: getValue('password'),
      confirmPassword: getValue('confirmPassword')
    };

    if (formData.password !== formData.confirmPassword) {
      showError('Пароли не совпадают!');
      return;
    }

    if (!validatePassword(formData.password)) {
      showError('Пароль должен быть не менее 8 символов');
      return;
    }

    if (!validatePhone(formData.phone)) {
      showError('Неверный формат телефона (+79991234567)');
      return;
    }

    const submitButton = registerForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      window.location.href = '/auth';
    } catch (error) {
      showError('Ошибка регистрации');
    } finally {
      submitButton.disabled = false;
    }
  });
}

document.addEventListener('DOMContentLoaded', initRegistration);
