/* eslint-disable no-console */
import renderElement from '../rendering/renderElement';

export default function showImages(url) {
  const el = renderElement(url);
  console.log(el);
  return el;
}
