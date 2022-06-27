/* eslint-disable no-console */
export default class Login {
  constructor(container, server) {
    this.server = server;
    this.container = container;
    this.login = this.login.bind(this);
  }

  login() {
    this.socket = new WebSocket(this.server);

    this.socket.addEventListener('open', () => {
      this.socket.send(JSON.stringify({
        event: 'login',
      }));
    });

    this.socket.addEventListener('message', (evt) => {
      const msg = JSON.parse(evt.data);
      if (msg.event === 'connect') {
        this.container.dispatchEvent(new Event('connect'));
        console.log('Connect');
      }
    });

    this.socket.addEventListener('error', (evt) => {
      console.error(evt);
    });
  }
}
