import Chat from './Chat';

const chat = new Chat(document.querySelector('.chat'), 'http://localhost:7050/', 'ws://localhost:7050/ws');

chat.init();
