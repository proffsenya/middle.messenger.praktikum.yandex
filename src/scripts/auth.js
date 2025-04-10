document.getElementById('authForm').addEventListener('submit', (e) => {
    e.preventDefault()
    
    const formData = {
      login: document.getElementById('login').value,
      password: document.getElementById('password').value
    }
  
    console.log('Данные для входа:', formData)
  })
  
  document.querySelector('.auth-footer span').addEventListener('click', () => {
    console.log('Переход к регистрации')
  })
