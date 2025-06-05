/*import { createOptimizedPicture } from '../../scripts/aem.js';

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
*/
export default async function decorate(block) {
  try {
    const res = await fetch('https://main--wknd--pkumavat01.aem.page/query-index.json');
    if (!res.ok) throw new Error('Failed to fetch query-index.json');

    const json = await res.json();
    const allEntries = json.data || [];

    // Filter only magazine articles
    const magazineArticles = allEntries.filter(item =>
      item.path && item.path.startsWith('/magazine/')
    );

    // Clear block contents
    block.innerHTML = '';

    // Build cards
    magazineArticles.forEach(article => {
      const card = document.createElement('div');
      card.className = 'magazine-card';

      // Add image if available
      if (article.image) {
        const img = document.createElement('img');
        img.src = article.image;
        img.alt = article.title || 'Magazine Article';
        img.className = 'magazine-image';
        card.appendChild(img);
      }

      // Title link
      const link = document.createElement('a');
      link.href = article.path;
      link.textContent = article.title || 'Untitled Article';
      link.className = 'magazine-link';
      card.appendChild(link);

      // Optional description
      if (article.description) {
        const desc = document.createElement('p');
        desc.className = 'magazine-description';
        desc.textContent = article.description;
        card.appendChild(desc);
      }

      block.appendChild(card);
    });

  } catch (err) {
    console.error('Error decorating magazine-listing block:', err);
    block.innerHTML = '<p>Failed to load magazine articles.</p>';
  }
}
