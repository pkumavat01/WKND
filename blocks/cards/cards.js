import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const ul = document.createElement('ul');

  [...block.children].forEach((row) => {
    const li = document.createElement('li');

    let url = '';
    const lastChild = row.lastElementChild;
    console.log(lastChild)
    
    if (lastChild) {
      const link = lastChild.querySelector('a');
      if (link && link.href) {
        url = link.href;
        const linkP = link.closest('p');
        if (linkP) linkP.remove();
      }
    }

    while (row.firstElementChild) li.appendChild(row.firstElementChild);

    if (url) {
      const a = document.createElement('a');
      a.href = url;
      a.style.display = 'block';       
      a.style.color = 'inherit';       
      a.style.textDecoration = 'none'; 
      while (li.firstChild) a.appendChild(li.firstChild);
      li.appendChild(a);
    }

    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });

    ul.appendChild(li);
  });

  ul.querySelectorAll('picture > img').forEach((img) => {
    img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]));
  });

  block.textContent = '';
  block.appendChild(ul);
}
