/* eslint-disable no-console */
import messageConstructor from './messageConstructor';

import Login from './Login';

import sendNotification from './notification';

import reminder from './reminder';

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
    this.geo = this.geo.bind(this);
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
    this.buttonGeo.addEventListener('click', this.geo);
    this.buttonStop.addEventListener('click', (evt) => {
      evt.preventDefault();
    });
    document.body.addEventListener('click', (evt) => {
      if (
        evt.target.classList.contains('fix')
        && document.querySelector('.fix_send') === null
      ) {
        console.log(evt.target.parentElement.nextElementSibling.textContent);
        const fixSend = document.createElement('div');
        fixSend.classList.add('fix_send');
        const fixClose = document.createElement('div');
        const fixText = document.createElement('div');
        fixText.classList.add('fix_text');
        fixText.textContent = evt.target.parentElement.nextElementSibling.textContent;
        fixClose.classList.add('fix_close');
        fixSend.textContent = 'ЗАКРЕПЛЕННОЕ СООБЩЕНИЕ:';
        fixSend.append(fixText, fixClose);
        this.windowElement.parentElement.parentElement.insertBefore(
          fixSend,
          this.windowElement.parentElement.parentElement.firstChild,
        );
      }
      if (evt.target.classList.contains('fix_close')) {
        evt.target.parentElement.remove();
      }
    });
    this.buttonRec.addEventListener('click', this.audio);
    this.parentElement.addEventListener('connect', this.chat);

    this.fileInput.addEventListener('change', (evt) => {
      console.log(evt);
      const file = Array.from(evt.target.files)[0];
      console.log(file);
      this.readerRequest(file);
    });
    this.chatInputElement.addEventListener('dragover', (evt) => {
      evt.preventDefault();
    });
    this.chatInputElement.addEventListener('drop', (evt) => {
      evt.preventDefault();
      const file = Array.from(evt.dataTransfer.files)[0];
      console.log(file);
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
    (async () => {
      if (!navigator.mediaDevices) {
        return;
      }
      try {
        const audio = document.createElement('audio');
        audio.controls = true;
        document.body.appendChild(audio);

        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        audio.srcObject = stream;
        audio.play();

        if (!window.MediaRecorder) {
          return;
        }

        const recorder = new MediaRecorder(stream);

        const chunks = [];
        recorder.addEventListener('start', () => {
          console.log('recording started');
        });

        recorder.addEventListener('dataavailable', (evt) => {
          console.log('data available');
          chunks.push(evt.data);
        });

        recorder.addEventListener('stop', () => {
          console.log('recording stopped');
          const blob = new Blob(chunks);
          audio.src = URL.createObjectURL(blob);
          console.log(audio.src);
          const message = JSON.stringify({
            event: 'chat',
            message: audio.src,
          });
          this.login.socket.send(message);
        });
        recorder.start();

        this.buttonStop.addEventListener('click', () => {
          if (this.state === 1) {
            recorder.stop();
            stream.getTracks().forEach((track) => track.stop());
            audio.srcObject = null;
            document.body.removeChild(audio);
            this.state = 0;
            this.buttonRec.style.opacity = 1;
            this.buttonStop.style.opacity = 0.5;
          }
        });
      } catch (evt) {
        console.error(e);
      }
    })();
  }

  geo(e) {
    e.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const {
            latitude,
            longitude,
          } = position.coords;
          const message = JSON.stringify({
            event: 'chat',
            message: `Ваша геолокация (Ширина: ${latitude}, Долгота: ${longitude})`,
          });
          this.login.socket.send(message);
          window.open(
            `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`,
          );
        },
        (error) => {
          console.log(error);
        },
      );
    }
  }

  sendMessage(e) {
    e.preventDefault();

    if (Array.from(this.chatInputElement.value)[0] === '@') {
      console.log('Это команда');

      if (this.chatInputElement.value === '@surf') {
        const surf = document.querySelector('.surf');
        if (surf.style.display === 'inline-block') {
          surf.style.display = 'none';
        } else {
          surf.style.display = 'inline-block';
        }
      }

      if (this.chatInputElement.value === '@geo') {
        this.geo(e);
      }

      if (
        this.chatInputElement.value !== '@surf'
        && this.chatInputElement.value !== '@geo'
      ) {
        const message = JSON.stringify({
          event: 'command',
          message: this.chatInputElement.value,
        });
        this.login.socket.send(message);
      }
    }

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
      const response = await fetch(this.server, {
        method: 'POST',
        body: message,
      });

      const msg = await response.json();

      let arr = msg;
      if (arr.length > 0) {
        let start = arr.length - 10;

        if (start < 0) {
          start = 0;
        }

        for (let i = start; i < arr.length; i += 1) {
          const msgElement = messageConstructor(
            arr[i].event,
            arr[i].date,
            arr[i].message,
          );
          this.chatElement.append(msgElement);
          this.chatElement.scrollTop = this.chatElement.scrollHeight
            - this.chatElement.getBoundingClientRect().height;
        }
        arr = arr.slice(0, start);
        this.chatElement.addEventListener('scroll', () => {
          let startScrol;
          if (this.chatElement.scrollTop === 0 && arr.length > 0) {
            if (arr.length > 10) {
              startScrol = arr.length - 10;
            }
            if (arr.length <= 10) {
              startScrol = 0;
            }

            for (let i = arr.length - 1; i >= startScrol; i -= 1) {
              const msgElement = messageConstructor(
                msg[i].event,
                msg[i].date,
                msg[i].message,
              );

              const first = this.chatElement.querySelector('.chat_message');
              first.before(msgElement);
              this.chatElement.scrollTop = this.chatElement.getBoundingClientRect().height
                + this.chatElement.clientHeight
                + msgElement.getBoundingClientRect().height;

              if (startScrol === 0) {
                this.chatElement.scrollTop = this.chatElement.clientHeight
                  - msgElement.getBoundingClientRect().height * 2;
              }
            }
            arr = arr.slice(0, startScrol);
          }
        });
      }
    })();
  }
}
