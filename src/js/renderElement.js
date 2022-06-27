/* eslint-disable no-console */
export default function renderElement(url) {
  const viewItem = document.createElement('div');
  viewItem.classList.add('view_item');
  const img = document.createElement('img');
  img.src = url;
  img.addEventListener('load', () => {
    URL.revokeObjectURL(url);
    console.log('load');
  });

  viewItem.append(img);
  return viewItem;
}
