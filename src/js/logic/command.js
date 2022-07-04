import geo from './geo';

export default function command(chatInputElement, login) {
  if (Array.from(chatInputElement.value)[0] === '@') {
    if (chatInputElement.value === '@surf') {
      const surf = document.querySelector('.surf');
      if (surf.style.display === 'inline-block') {
        surf.style.display = 'none';
      } else {
        surf.style.display = 'inline-block';
      }
    }
    if (chatInputElement.value === '@geo') {
      geo(login);
    }
    if (
      chatInputElement.value !== '@surf'
          && chatInputElement.value !== '@geo'
    ) {
      const message = JSON.stringify({
        event: 'command',
        message: chatInputElement.value,
      });
      login.socket.send(message);
    }
  }
}
