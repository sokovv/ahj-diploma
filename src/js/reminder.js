import sendNotification from './notification';

export default function reminder() {
  setInterval(() => {
    const dateFormat = new Date();
    const timeOptions = {
      minute: '2-digit',
      hour: '2-digit',
    };
    sendNotification('Надеюсь ты не забыл обо мне)', {
      body: `Время на часах ${dateFormat.toLocaleString('ru-RU', timeOptions)}`,
      icon: 'https://flyclipart.com/thumb2/ufo-clipart-blue-38284.png',
      dir: 'auto',
    });
  }, 120000);
}
