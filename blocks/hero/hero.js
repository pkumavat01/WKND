export default function decorate(block) {
  // 'block' is the .hero.left.block element passed in by the caller

  // Access the first child div (the one holding the picture)
  const firstDiv = block.querySelector('div:first-child');

  if (!firstDiv) return;

  // Access the picture element inside that div
  const picture = firstDiv.querySelector('picture');
  picture.classList.add('pic')
  if (!picture) return;
}
