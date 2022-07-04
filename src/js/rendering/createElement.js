export default class CreateElement {
  constructor(text) {
    this.text = text;
    this.msgText = null;
  }

  elHttpUrl() {
    this.msgText = document.createElement('a');
    this.msgText.classList.add('chat_message_text');
    this.msgText.innerText = this.text;
    this.msgText.href = this.text;
    return this.msgText;
  }

  elDataUrl() {
    this.msgText = document.createElement('div');
    this.msgText.classList.add('chat_message_text');
    const img = document.createElement('img');
    img.src = this.text;
    this.msgText.append(img);
    return this.msgText;
  }

  elBlobUrl() {
    this.msgText = document.createElement('a');
    this.msgText.classList.add('chat_message_text');
    this.msgText.innerHTML = `<audio controls>
    <source src=${this.text} type="audio/mpeg">
    <source src=${this.text} type="audio/ogg">
  </audio>
  `;
    return this.msgText;
  }

  elAudioUrl() {
    this.msgText = document.createElement('div');
    this.msgText.classList.add('chat_message_text');
    this.msgText.innerHTML = `<audio controls>
    <source src=${this.text} type="audio/mpeg">
    <source src=${this.text} type="audio/ogg">
  </audio>
  <a href=${this.text} download="Звук"class="dwdButtn"></a>
  `;
    return this.msgText;
  }

  elVideoUrl() {
    this.msgText = document.createElement('div');
    this.msgText.classList.add('chat_message_text');
    this.msgText.innerHTML = ` <video width="300" height="225" controls="controls" poster="video/duel.jpg">
    <source src=${this.text} type='video/ogg; codecs="theora, vorbis"'>
    <source src=${this.text} type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
    <source src=${this.text} type='video/webm; codecs="vp8, vorbis"'>
   </video>
   <a href=${this.text} download="Видео" class="dwdButtn"></a>`;
    return this.msgText;
  }

  el() {
    this.msgText = document.createElement('div');
    this.msgText.classList.add('chat_message_text');
    this.msgText.innerText = this.text;
    return this.msgText;
  }
}
