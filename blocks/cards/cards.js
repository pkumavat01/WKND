import { createOptimizedPicture } from '../../scripts/aem.js';

export default async function decorate(block) {
  const currentPath = window.location.pathname;

  // Get block name and variant(s)
  const blockName = block.dataset.blockName; // e.g., "cards"
  const classList = Array.from(block.classList); // e.g., ["cards", .]
  const variants = classList.filter(cls => cls !== blockName && cls !== 'block'); // e.g., ["click"] or ["columns"]

  // Fetch article index
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

 
  // Variant: card__click
  /*
  if (variants.includes('click')) {
    const magazineArticles = indexData.filter(entry =>
      entry.path && entry.path.startsWith('/magazine/')
    );

    const ul = document.createElement('ul');
    ul.className = 'card__click-list';

    magazineArticles.forEach((article) => {
      const li = document.createElement('li');
      li.className = 'card__click-card';

      const a = document.createElement('a');
      a.href = article.path || '/404.html';
      a.style.display = 'block';
      a.style.color = 'inherit';
      a.style.textDecoration = 'none';

      const imageWrapper = document.createElement('div');
      imageWrapper.className = 'card__click-image';
      if (article.image) {
        const optimizedPicture = createOptimizedPicture(
          article.image,
          article.title || '',
          false,
          [{ width: '750' }]
        );
        imageWrapper.appendChild(optimizedPicture);
      }

      const bodyWrapper = document.createElement('div');
      bodyWrapper.className = 'card__click-body';

      const titleEl = document.createElement('h3');
      titleEl.textContent = article.title || 'Untitled';

      const descEl = document.createElement('p');
      descEl.textContent = article.description || '';

      bodyWrapper.appendChild(titleEl);
      bodyWrapper.appendChild(descEl);

      a.appendChild(imageWrapper);
      a.appendChild(bodyWrapper);
      li.appendChild(a);
      ul.appendChild(li);
    });

    block.textContent = '';
    block.appendChild(ul);
  }
*/
  // Add SVG icons in author variant
if (variants.includes('author')) {
  const iconMap = {
    facebook: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="white" d="M279.14 288l14.22-92.66h-88.91V127.39c0-25.35 12.42-50.06 52.24-50.06H293V6.26S259.5 0 225.36 0c-73.22 0-121.17 44.38-121.17 124.72v70.62H22.89V288h81.3v224h100.2V288z"/></svg>`,
    twitter: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="white" d="M459.4 151.7c.3 4.1.3 8.3.3 12.5 0 126.9-96.5 273.2-273.2 273.2-54.2 0-104.7-15.9-147-43.2 7.6.9 15.1 1.2 23 .1 45-5.4 86-30.7 111.8-66.4-42.1-.9-77.7-28.6-90-66.8 5.9.9 11.9 1.4 18.2 1.4 8.6 0 17-.9 24.9-2.5-44.3-8.9-77.6-48.1-77.6-95v-1.3c13 7.3 27.9 11.6 43.8 12.1-25.9-17.3-43.1-46.7-43.1-80.2 0-17.6 4.7-34.1 12.9-48.2 47.1 57.9 117.5 96 196.8 100.1-1.6-7.1-2.5-14.6-2.5-22.1 0-53.7 43.6-97.3 97.3-97.3 28 0 53.3 11.8 71.1 30.7 22.3-4.3 43.1-12.5 61.9-23.7-7.3 22.9-22.9 42.3-43.3 54.5 19.8-2.3 38.6-7.6 56.1-15.2-13.1 19.7-29.4 37.1-48.3 51z"/></svg>`,
    instagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="white" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9 114.9-51.3 114.9-114.9S287.6 141 224.1 141zm0 186.6c-39.6 0-71.7-32.1-71.7-71.7 0-39.6 32.1-71.7 71.7-71.7 39.6 0 71.7 32.1 71.7 71.7 0 39.6-32.1 71.7-71.7 71.7zm146.4-194.3c0 14.9-12 26.9-26.9 26.9s-26.9-12-26.9-26.9 12-26.9 26.9-26.9 26.9 12 26.9 26.9zm76.1 27.2c-1.7-35.7-9.9-67.3-36.2-93.6s-57.9-34.5-93.6-36.2c-37-2.1-147.9-2.1-184.9 0-35.7 1.7-67.3 9.9-93.6 36.2S9.4 124.8 7.7 160.5c-2.1 37-2.1 147.9 0 184.9 1.7 35.7 9.9 67.3 36.2 93.6s57.9 34.5 93.6 36.2c37 2.1 147.9 2.1 184.9 0 35.7-1.7 67.3-9.9 93.6-36.2s34.5-57.9 36.2-93.6c2.1-37 2.1-147.8 0-184.9zM398.8 388c-7.8 19.5-22.9 34.6-42.4 42.4-29.4 11.7-99.2 9-132.3 9s-102.9 2.6-132.3-9c-19.5-7.8-34.6-22.9-42.4-42.4-11.7-29.4-9-99.2-9-132.3s-2.6-102.9 9-132.3c7.8-19.5 22.9-34.6 42.4-42.4 29.4-11.7 99.2-9 132.3-9s102.9-2.6 132.3 9c19.5 7.8 34.6 22.9 42.4 42.4 11.7 29.4 9 99.2 9 132.3s2.7 102.9-9 132.3z"/></svg>`
  };

  block.querySelectorAll('.button-container a').forEach((link) => {
    const title = link.getAttribute('title')?.toLowerCase();
    const svg = iconMap[title];
    if (svg) {
      link.innerHTML = svg;
    }
  });
}

  // ==========================
// Variant: card__column
// ==========================
const button = document.querySelector('.button-container a');

if (variants.includes('column')) {
  const listItems = Array.from(
    block.querySelectorAll('.column > div > div:last-child ul:last-child li')
  );

  listItems.forEach((li) => {
    const text = li.textContent.trim();
    const match = text.match(/^(.*)\s((?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday),?\s+\d{1,2}\s\w+\s\d{4})$/);

    if (match) {
      const title = match[1].trim();
      const date = match[2].trim();

      const article = indexData.find((entry) => entry.title?.trim() === title);

      // Remove if already on the same article
      if (article?.path === currentPath) {
        li.remove();
        return;
      }

      // Apply BEM-based styling classes
      li.innerHTML = `
        <span class="card__column-title">${title}</span>
        <span class="card__column-date">${date}</span>
      `;

      li.classList.add('card__column-item');
      li.style.cursor = 'pointer';

      li.addEventListener('click', () => {
        if (article?.path) {
          window.location.href = article.path;
        }
      });
    }
  });
}

}
