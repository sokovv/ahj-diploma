/* eslint-disable no-console */
export default function createAudio(login, butStop, butRec, stat) {
  let state = stat; const buttonStop = butStop; const buttonRec = butRec;
  (async () => {
    if (!navigator.mediaDevices) { return; }
    try {
      const audio = document.createElement('audio');
      audio.controls = true;
      document.body.appendChild(audio);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      audio.srcObject = stream;
      audio.play();
      if (!window.MediaRecorder) { return; }
      const recorder = new MediaRecorder(stream);
      const chunks = [];
      recorder.addEventListener('start', () => {});
      recorder.addEventListener('dataavailable', (evt) => { chunks.push(evt.data); });
      recorder.addEventListener('stop', () => {
        const blob = new Blob(chunks);
        audio.src = URL.createObjectURL(blob);
        const message = JSON.stringify({ event: 'chat', message: audio.src });
        login.socket.send(message);
      });
      recorder.start();
      buttonStop.addEventListener('click', () => {
        if (state === 1) {
          recorder.stop();
          stream.getTracks().forEach((track) => track.stop());
          audio.srcObject = null;
          document.body.removeChild(audio);
          state = 0; buttonRec.style.opacity = 1; buttonStop.style.opacity = 0.5;
        }
      });
    } catch (e) { console.error(e); }
  })();
}
