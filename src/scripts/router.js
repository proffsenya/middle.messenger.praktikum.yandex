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
import profileEditTemplateRaw from '../templates/profile-edit.hbs?raw';
import changePasswordTemplate from '../templates/changePassword.hbs?raw';
import formFieldRaw from '../templates/partials/form-field.hbs?raw'
import profileSidebarRaw from '../templates/partials/profile-sidebar.hbs?raw'

Handlebars.registerPartial('error-layout', errorLayout);
Handlebars.registerPartial('form-field', formFieldRaw);
Handlebars.registerPartial('error-links', errorLinks);
Handlebars.registerPartial('profile-sidebar', profileSidebarRaw);
Handlebars.registerPartial('navigation', navigationTemplate);

const profileEditTemplate = Handlebars.compile(profileEditTemplateRaw)

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

const routes = {
  '/auth': {
    template: authTemplate,
    script: 'auth'
  },
  '/register': {
    template: registerTemplate,
    script: 'register'
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
    script: 'chats'
  },
  '/profile': {
    template: profileTemplate,
    data: profileData,
    script: 'profile'
  },
  '/profile/edit': {
    template: profileEditTemplate({
      email: 'pochta@yandex.ru',
      login: 'Ivankanov',
      firstName: 'Иван',
      lastName: 'Иванов',
      displayName: 'Иван',
      phone: '+7 (909) 967 30 30'
    }),
    script: 'profile-edit'
  },
  '/profile/changepswd': {
    template: changePasswordTemplate,
    script: null,
  }
};

function renderPage(route) {
  const app = document.getElementById('app');
  
  if (!app) {
    console.error('Элемент с id "app" не найден!');
    return;
  }
  
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

const scripts = import.meta.glob('./scripts/*.js');

if (route.script) {
  const scriptPath = `./scripts/${route.script}.js`;
  if (scripts[scriptPath]) {
    scripts[scriptPath]().then((module) => {
      console.log(`Скрипт ${route.script} загружен`);
      if (module && module.default) {
        module.default();
      }
    }).catch((err) => {
      console.error(`Ошибка при загрузке скрипта ${route.script}:`, err);
    });
  }
}

}

function router() {
  let path = window.location.pathname;

  if (path === '/') {
    path = '/chats';
    window.history.replaceState({}, '', path);
  }

  const route = routes[path] || handleNotFound;
  if (route) renderPage(route);
  else handleNotFound();
}


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

