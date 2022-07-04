/* eslint-disable no-console */
import messageConstructor from './rendering/messageConstructor';
import Login from './Login';
import sendNotification from './logic/notification';
import reminder from './logic/reminder';
import createFixSend from './rendering/createFixSend';
import command from './logic/command';
import geo from './logic/geo';
import addMsg from './logic/addMsg';
import createAudio from './rendering/createAudio';

export default class Chat {
  constructor(element, server, serverWs) {
    this.server = server;
    this.serverWs = serverWs;
    this.parentElement = element;
    this.windowElement = this.parentElement.querySelector('.chat_window');
    this.chatElement = this.parentElement.querySelector('.chat_messages');
    this.chatFormElement = this.parentElement.querySelector('.chat_form');
    this.chatInputElement = this.parentElement.querySelector('.chat_input');
    this.buttonSend = this.parentElement.querySelector('.button_Send');
    this.fileInput = this.parentElement.querySelector('#file-input');
    this.buttonRec = document.querySelector('.button_Rec');
    this.buttonStop = document.querySelector('.button_Stop');
    this.buttonGeo = document.querySelector('.button_Geo');
    this.pop = document.querySelector('#pop');
    this.tooltip = document.querySelector('#tooltip');
    this.arrow = document.querySelector('#arrow');
    this.state = 0;
    this.time = 0;
    this.login = new Login(this.parentElement, this.serverWs);
    this.chat = this.chat.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.audio = this.audio.bind(this);
  }

  init() {
    this.parentElement.style.display = 'inline';
    this.allChats();
    this.toolTrip();
    this.login.login();
    this.addEventListener();
    reminder(this.time);
    sendNotification('Приветствую тебя, я бот!', {
      body: 'Если ты меня видишь, значит разрешил уведомления)',
      icon: 'https://flyclipart.com/thumb2/ufo-clipart-blue-38284.png',
      dir: 'auto',
    });
  }

  addEventListener() {
    this.buttonGeo.addEventListener('click', (evt) => {
      evt.preventDefault();
      geo(this.login);
    });
    this.buttonStop.addEventListener('click', (evt) => {
      evt.preventDefault();
    });
    document.body.addEventListener('click', (evt) => {
      createFixSend(evt, this.windowElement);
    });
    this.buttonRec.addEventListener('click', this.audio);
    this.parentElement.addEventListener('connect', this.chat);
    this.fileInput.addEventListener('change', (evt) => {
      const file = Array.from(evt.target.files)[0];
      this.readerRequest(file);
    });
    this.chatInputElement.addEventListener('dragover', (evt) => {
      evt.preventDefault();
    });
    this.chatInputElement.addEventListener('drop', (evt) => {
      evt.preventDefault();
      const file = Array.from(evt.dataTransfer.files)[0];
      this.readerRequest(file);
    });
  }

  onSubmit(evt) {
    evt.preventDefault();
    this.tooltip.classList.toggle('hide');
    this.arrow.classList.toggle('hide');
  }

  toolTrip() {
    this.tooltip.style.top = `${this.pop.offsetHeight + this.arrow.offsetHeight * 1}px`;
    this.tooltip.style.left = `${this.pop.offsetLeft}px`;
    this.arrow.style.top = `${0 - this.arrow.offsetWidth / 2}px`;
    this.arrow.style.left = `${this.arrow.offsetWidth / 2}px`;
    this.pop.addEventListener('click', (evt) => this.onSubmit(evt));
  }

  readerRequest(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', () => {
      const formData = new FormData();
      formData.append('files', reader.result);
      formData.append('event', 'file');
      (async () => {
        await fetch(this.server, {
          method: 'POST',
          body: formData,
        });
      })();
      const message = JSON.stringify({
        event: 'chat',
        message: reader.result,
      });
      this.login.socket.send(message);
    });
  }

  chat() {
    this.login.socket.addEventListener('message', (evt) => {
      const msg = JSON.parse(evt.data);
      if (msg.event === 'chat') {
        const msgElement = messageConstructor(
          msg.event,
          msg.message.date,
          msg.message.text,
        );
        this.chatElement.append(msgElement);
        this.chatElement.scrollTop = this.chatElement.scrollHeight
          - this.chatElement.getBoundingClientRect().height;
      }
      if (msg.event === 'system') {
        this.systemMessageShow(msg);
      }
    });
    this.buttonSend.addEventListener('click', this.sendMessage);
  }

  audio(e) {
    e.preventDefault();
    this.state = 1;
    this.buttonRec.style.opacity = 0.5;
    this.buttonStop.style.opacity = 1;
    createAudio(this.login, this.buttonStop, this.buttonRec, this.state);
  }

  sendMessage(e) {
    e.preventDefault();
    command(this.chatInputElement, this.login);
    if (Array.from(this.chatInputElement.value)[0] !== '@') {
      const message = JSON.stringify({
        event: 'chat',
        message: this.chatInputElement.value,
      });
      this.login.socket.send(message);
      (async () => {
        await fetch(this.server, {
          method: 'POST',
          body: message,
        });
      })();
    }
    this.chatInputElement.value = '';
  }

  allChats() {
    const message = JSON.stringify({
      event: 'allChats',
    });
    (async () => {
      const response = await fetch(this.server, { method: 'POST', body: message });
      const msg = await response.json();
      const arr = msg;
      if (arr.length > 0) {
        addMsg(arr, msg, this.chatElement);
      }
    })();
  }
}
