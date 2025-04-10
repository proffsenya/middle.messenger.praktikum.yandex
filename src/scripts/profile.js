requestAnimationFrame(() => {
  const profileData = {
    email: 'pochta@yandex.ru',
    login: 'Ivankanov',
    firstName: 'Иван',
    lastName: 'Иванов',
    displayName: 'Иван',
    phone: '+7 (909) 967 30 30'
  };

  for (const key in profileData) {
    const element = document.querySelector(`[data-field="${key}"]`);
    if (element) {
      element.textContent = profileData[key];
    }
  }

  document.getElementById('editData').addEventListener('click', () => {
    console.log('Переход к редактированию данных');
  });

  document.getElementById('editPassword').addEventListener('click', () => {
    console.log('Переход к смене пароля');
  });

  document.getElementById('logout').addEventListener('click', () => {
    window.location.href = '/';
  });
});

