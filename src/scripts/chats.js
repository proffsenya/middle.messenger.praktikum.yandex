requestAnimationFrame(() => {
    const chats = [
      { name: 'Андрей', message: 'Изображение', time: '10:49', unread: 2 },
      { name: 'Киноклуб', message: 'Вы: стикер', time: '12:00' },
      { name: 'Илья', message: 'Друзья, у меня для вас…', time: '15:12', unread: 4 },
      { name: 'Вадим', message: 'Вы: Круто!', time: 'Пт', selected: true },
      { name: 'тет-а-теты', message: 'И Human Interface...', time: 'Ср' },
      { name: '1, 2, 3', message: 'Миллионы россиян...', time: 'Пн' }
    ]
  
    const chatList = document.getElementById('chat-list')
  
    chatList.innerHTML = chats.map(chat => `
      <li class="chat-item ${chat.selected ? 'selected' : ''}">
        <div class="avatar"></div>
        <div class="chat-info">
          <div class="name">${chat.name}</div>
          <div class="message">${chat.message}</div>
        </div>
        <div class="meta">
          <div class="time">${chat.time}</div>
          ${chat.unread ? `<div class="badge">${chat.unread}</div>` : ''}
        </div>
      </li>
    `).join('')
  })


  