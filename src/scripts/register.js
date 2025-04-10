document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    
    if (password.value !== confirmPassword.value) {
      showError('Пароли не совпадают!');
      return;
    }
  
    const formData = {
      email: document.getElementById('email').value,
      login: document.getElementById('login').value,
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      phone: document.getElementById('phone').value,
      password: password.value
    };
  
    if (!validatePhone(formData.phone)) {
      showError('Неверный формат телефона');
      return;
    }
  
    try {
      const response = await fakeApiCall(formData);
      console.log('Успешная регистрация:', response);
      alert('Регистрация завершена!');
    } catch (error) {
      showError(error.message);
    }
  });
  
  function validatePhone(phone) {
    const regex = /^\+7\s?\(?\d{3}\)?\s?\d{3}-?\d{2}-?\d{2}$/;
    return regex.test(phone);
  }
  
  function showError(message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    document.querySelector('.auth-form').prepend(errorElement);
    setTimeout(() => errorElement.remove(), 3000);
  }
