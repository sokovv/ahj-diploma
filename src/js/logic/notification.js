/* eslint-disable no-console */
/* eslint-disable no-alert */
export default function sendNotification(title, options) {
  if (!('Notification' in window)) {
    alert('Ваш браузер не поддерживает HTML Notifications, его необходимо обновить.');
  } else if (Notification.permission === 'granted') {
    const notification = new Notification(title, options);

    notification.onclick = () => {
      console.log('click');
    };

    notification.onclose = () => {
      console.log('closed');
    };
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission((permission) => {
      if (permission === 'granted') {
        const notification = new Notification(title, options);
        console.log(notification);
      } else {
        alert('Вы запретили показывать уведомления');
      }
    });
  }
}
