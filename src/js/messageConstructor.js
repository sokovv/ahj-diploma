import isValidHttpUrl from './isValidHttpUrl';
import isValidDataUrl from './isValidDataUrl';
import isValidAudioUrl from './isValidAudioUrl';
import isValidVideoUrl from './isValidVideoUrl';
import isValidBlobUrl from './isValidBlobUrl';

export default function messageConstructor(event, date, text) {
  const msgElement = document.createElement('div');
  msgElement.classList.add('chat_message');
  if (event === 'chat' || event === 'file') {
    msgElement.classList.add('chat_message_you');
  }
  const msgHeader = document.createElement('div');
  msgHeader.classList.add('chat_message_container');
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

  let msgText;

  if (isValidHttpUrl(text) === true) {
    msgText = document.createElement('a');
    msgText.classList.add('chat_message_text');
    msgText.innerText = text;
    msgText.href = text;
  }

  if (isValidDataUrl(text) === true) {
    msgText = document.createElement('div');
    msgText.classList.add('chat_message_text');
    const img = document.createElement('img');
    img.src = text;
    msgText.append(img);
  }

  if (isValidBlobUrl(text) === true) {
    msgText = document.createElement('a');
    msgText.classList.add('chat_message_text');
    msgText.innerHTML = `<audio controls>
    <source src=${text} type="audio/mpeg">
    <source src=${text} type="audio/ogg">
  </audio>
  `;
  }

  if (isValidAudioUrl(text) === true) {
    msgText = document.createElement('div');
    msgText.classList.add('chat_message_text');
    msgText.innerHTML = `<audio controls>
    <source src=${text} type="audio/mpeg">
    <source src=${text} type="audio/ogg">
  </audio>
  <a href=${text} download="Звук"class="dwdButtn"></a>
  `;
  }

  if (isValidVideoUrl(text) === true) {
    msgText = document.createElement('div');
    msgText.classList.add('chat_message_text');
    msgText.innerHTML = ` <video width="300" height="225" controls="controls" poster="video/duel.jpg">
    <source src=${text} type='video/ogg; codecs="theora, vorbis"'>
    <source src=${text} type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
    <source src=${text} type='video/webm; codecs="vp8, vorbis"'>
   </video>
   <a href=${text} download="Видео" class="dwdButtn"></a>`;
  }

  if (
    isValidVideoUrl(text) === false
    && isValidHttpUrl(text) === false
    && isValidDataUrl(text) === false
    && isValidBlobUrl(text) === false
    && isValidAudioUrl(text) === false) {
    msgText = document.createElement('div');
    msgText.classList.add('chat_message_text');
    msgText.innerText = text;
  }

  const fix = document.createElement('div');
  fix.classList.add('fix');

  msgHeader.append(msgDate);
  msgHeader.append(fix);
  msgElement.append(msgHeader, msgText);
  return msgElement;
}
