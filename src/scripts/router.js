import Handlebars from 'handlebars';
import profileTemplate from '../templates/profile.hbs?raw';
import chatsTemplate from '../templates/chats.hbs?raw';
import errorLayout from '../templates/partials/error-layout.hbs?raw';
import errorLinks from '../templates/partials/error-links.hbs?raw';
import error500Template from '../templates/error500.hbs?raw';
import error404Template from '../templates/error404.hbs?raw';
import authTemplate from '../templates/auth.hbs?raw';
import registerTemplate from '../templates/register.hbs?raw';
import navigationTemplate from '../templates/partials/navigation.hbs?raw';

// Регистрируем компоненты
Handlebars.registerPartial('error-layout', errorLayout);
Handlebars.registerPartial('error-links', errorLinks);
Handlebars.registerPartial('navigation', navigationTemplate);

// Моки
const profileData = {
  email: 'pochta@yandex.ru',
  login: 'Ivankanov',
  firstName: 'Иван',
  lastName: 'Иванов',
  displayName: 'Иван',
  phone: '+7 (909) 967 30 30'
};

const chatData = {
  chats: [
    { name: 'Андрей', message: 'Изображение', time: '10:49', unread: 2 },
    { name: 'Киноклуб', message: 'Вы: стикер', time: '12:00' },
    { name: 'Илья', message: 'Друзья, у меня для вас…', time: '15:12', unread: 4 },
    { name: 'Вадим', message: 'Вы: Круто!', time: 'Пт', selected: true },
    { name: 'тет-а-теты', message: 'И Human Interface...', time: 'Ср' },
    { name: '1, 2, 3', message: 'Миллионы россиян...', time: 'Пн' }
  ]
};

// Маршруты
const routes = {
  '/auth': {
    template: authTemplate,
    script: '/src/scripts/auth.js'
  },
  '/register': {
    template: registerTemplate,
    script: '/src/scripts/register.js'
  },
  '/404': {
    template: error404Template,
    script: null
  },
  '/500': {
    template: error500Template,
    script: null
  },
  '/chats': {
    template: chatsTemplate,
    data: chatData,
    script: '/src/scripts/chats.js'
  },
  '/profile': {
    template: profileTemplate,
    data: profileData,
    script: '/src/scripts/profile.js'
  }
};

function renderPage(route) {
  const app = document.getElementById('app');
  
  if (!app) {
    console.error('Элемент с id "app" не найден!');
    return;
  }
  
  // Компиляция и рендеринг шаблона
  if (route.template) {
    const compiledTemplate = Handlebars.compile(route.template);
    const html = compiledTemplate(route.data || {});
    app.innerHTML = html;
  } else if (route.templateId) {
    const template = document.querySelector(route.templateId);
    if (template) {
      app.innerHTML = template.innerHTML;
    } else {
      console.error('Шаблон не найден:', route.templateId);
    }
  }

  // Подключение скрипта, если он существует
  if (route.script) {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = route.script;
    document.body.appendChild(script);
  }
}



function router() {
  const path = window.location.pathname;
  const route = routes[path] || handleNotFound;
  if (route) renderPage(route);
  else handleNotFound();
}

// SPA переходы
document.addEventListener('click', e => {
  if (e.target.matches('[data-link]')) {
    e.preventDefault();
    const path = e.target.getAttribute('href');
    window.history.pushState({}, '', path);
    router();
  }
});

window.addEventListener('popstate', router);
window.addEventListener('DOMContentLoaded', router);

function handleNotFound() {
  window.history.pushState({}, '', '/404');
  renderPage(routes['/404']);
}
