/**
 * All of our fonts should use `rem` units, Root EMs.
 * Because of this, all we have to do to increment site-wide fonts is to change
 * the 'font-size' on the root HTML node.
 * This is probably not the best way to do this, but I wanna get this shipped!
 */
export const changeFontSize = direction => {
  const rootElem = document.querySelector('html');

  const sizes = [12, 14, 16, 18, 20, 22, 24];

  let currentSize = Number(rootElem.style.fontSize.replace('px', ''));
  if (!currentSize) {
    currentSize = 16;
  }

  const currentSizeIndex = sizes.indexOf(currentSize);
  const nextSizeIndex =
    direction === 'increment' ? currentSizeIndex + 1 : currentSizeIndex - 1;

  let newSize = sizes[nextSizeIndex];
  if (typeof newSize !== 'number') {
    newSize = direction === 'increment' ? sizes[0] : sizes[sizes.length - 1];
  }

  rootElem.style.fontSize = `${newSize}px`;
};
