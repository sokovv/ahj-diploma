export default function createDate(date) {
  const msgDate = document.createElement('time');
  msgDate.classList.add('chat_message_date');
  const dateFormat = new Date(date);
  const dateOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };
  const timeOptions = {
    minute: '2-digit',
    hour: '2-digit',
  };
  msgDate.innerText = `${dateFormat.toLocaleString('ru-RU', timeOptions)} ${dateFormat.toLocaleString('ru-RU', dateOptions)}`;
  return msgDate;
}
