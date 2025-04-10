import Handlebars from 'handlebars'
import chatsTemplate from '../templates/chats.hbs?raw'

Handlebars.registerPartial('chats', chatsTemplate)

const routes = {
    '/auth': {
      template: '#auth-page',
      script: '/src/scripts/auth.js'
    },
    '/register': {
      template: '#register-page',
      script: '/src/scripts/register.js'
    },
    '/404': {
    template: '#error404-page',
    script: null
  },
  '/500': {
    template: '#error500-page',
    script: null
  },
  '/chats': {
    template: '#chats-page',
    script: '/src/scripts/chats.js'
  },
  '/profile': {
    template: '#profile-page',
    script: '/src/scripts/profile.js'
  }
  }
  
  function renderPage(templateId, scriptUrl) {
    const app = document.getElementById('app')
    const template = document.querySelector(templateId)
    app.innerHTML = template.innerHTML

    requestAnimationFrame(() => {
        document.body.appendChild(script)
      })
    
    const script = document.createElement('script')
    script.type = 'module'
    script.src = scriptUrl
    document.body.appendChild(script)
  }
  
  function router() {
    const path = window.location.pathname
    const route = routes[path] || handleNotFound
    route ? renderPage(route.template, route.script) : handleNotFound()
  }
  
  document.addEventListener('click', e => {
    if (e.target.matches('[data-link]')) {
      e.preventDefault()
      const path = e.target.getAttribute('href')
      window.history.pushState({}, '', path)
      router()
    }
  })
  
  window.addEventListener('popstate', router)
  window.addEventListener('DOMContentLoaded', router)

  function handleNotFound() {
    window.history.pushState({}, '', '/404')
    renderPage('#error404-page', null)
  }