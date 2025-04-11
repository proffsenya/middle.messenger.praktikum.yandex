document.addEventListener('DOMContentLoaded', () => {
  const authForm = document.getElementById('authForm')
  const loginInput = document.getElementById('login')
  const passwordInput = document.getElementById('password')
  const registerSpan = document.querySelector('.auth-footer span')

  if (!authForm) console.warn("error")

  if (authForm && loginInput && passwordInput) {
    authForm.addEventListener('submit', (e) => {
      e.preventDefault()

      const formData = {
        login: loginInput.value,
        password: passwordInput.value
      }

      console.log('Данные для входа:', formData)
    })
  }

  if (registerSpan) {
    registerSpan.addEventListener('click', () => {
      console.log('Переход к регистрации')
    })
  }
})

