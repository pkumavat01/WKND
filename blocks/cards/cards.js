/*import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const ul = document.createElement('ul');

  [...block.children].forEach((row) => {
    const li = document.createElement('li');

    // Move all children of row to the <li>
    while (row.firstElementChild) li.appendChild(row.firstElementChild);

    // Apply card styling
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        div.className = 'cards-card-image';
      } else {
        div.className = 'cards-card-body';
      }
    });

    ul.appendChild(li);
  });

  // Optimize pictures
  ul.querySelectorAll('picture > img').forEach((img) => {
    img.closest('picture').replaceWith(
      createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])
    );
  });

  block.textContent = '';
  block.appendChild(ul);
}
*/
/*
export default async function decorate(block) {
  [...block.children].forEach((row) => {
    console.log(row.firstChildElement)
  })
  try {
    const res = await fetch('/query-index.json');
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
}*/
import { createOptimizedPicture } from '../../scripts/aem.js';

export default async function decorate(block) {
  // Fetch query-index.json
  let indexData = [];
  try {
    const res = await fetch('/query-index.json');
    if (res.ok) {
      const json = await res.json();
      indexData = json.data || [];
    } else {
      console.warn('Failed to fetch query-index.json');
    }
  } catch (e) {
    console.warn('Error fetching query-index.json:', e);
  }

  // Filter for /magazine/ entries only
  const magazineArticles = indexData.filter(entry =>
    entry.path && entry.path.startsWith('/magazine/')
  );

  const ul = document.createElement('ul');

  magazineArticles.forEach((article) => {
    const li = document.createElement('li');
    li.className = 'cards-card';

    const a = document.createElement('a');
    a.href = article.path || '/404.html';
    a.style.display = 'block';
    a.style.color = 'inherit';
    a.style.textDecoration = 'none';

    // --- Image ---
    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'cards-card-image';
    if (article.image) {
      const optimizedPicture = createOptimizedPicture(article.image, article.title || '', false, [{ width: '750' }]);
      imageWrapper.appendChild(optimizedPicture);
    }

    // --- Body ---
    const bodyWrapper = document.createElement('div');
    bodyWrapper.className = 'cards-card-body';

    const titleEl = document.createElement('h3');
    titleEl.textContent = article.title || 'Untitled';

    const descEl = document.createElement('p');
    descEl.textContent = article.description || '';

    bodyWrapper.appendChild(titleEl);
    bodyWrapper.appendChild(descEl);

    // Combine
    a.appendChild(imageWrapper);
    a.appendChild(bodyWrapper);
    li.appendChild(a);
    ul.appendChild(li);
  });

  // Clear the original block and append new content
  block.textContent = '';
  block.appendChild(ul);
}

