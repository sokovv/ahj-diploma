export default function createFixSend(evt, windowElement) {
  if (
    evt.target.classList.contains('fix')
    && document.querySelector('.fix_send') === null
  ) {
    const fixSend = document.createElement('div');
    fixSend.classList.add('fix_send');
    const fixClose = document.createElement('div');
    const fixText = document.createElement('div');
    fixText.classList.add('fix_text');
    fixText.textContent = evt.target.parentElement.nextElementSibling.textContent;
    fixClose.classList.add('fix_close');
    fixSend.textContent = 'ЗАКРЕПЛЕННОЕ СООБЩЕНИЕ:';
    fixSend.append(fixText, fixClose);
    windowElement.parentElement.parentElement.insertBefore(
      fixSend,
      windowElement.parentElement.parentElement.firstChild,
    );
  }
  if (evt.target.classList.contains('fix_close')) {
    evt.target.parentElement.remove();
  }
}
