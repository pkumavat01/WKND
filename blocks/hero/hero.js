export default function decorate(block) {
  const firstDiv = block.querySelector('div:first-child');

  if (!firstDiv) return;
  const picture = firstDiv.querySelector('picture');
  picture.classList.add('pic')
  if (!picture) return;
}
