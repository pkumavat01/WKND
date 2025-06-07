import { createOptimizedPicture } from '../../scripts/aem.js';

export default async function decorate(block) {
  const currentPath = window.location.pathname;

  // Get block name and variant(s)
  const blockName = block.dataset.blockName; // e.g., "cards"
  const classList = Array.from(block.classList); // e.g., ["cards", "columns", "block"]
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

  // ======================
  // Variant: card__click
  // ======================
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
  // ==========================
// Variant: card__column
// ==========================
const button = document.querySelector('.button-container a');
console.log(button)
if (button) {
  const text = button.textContent.trim();
  button.innerHTML = `<i class="fi fi-sr-download"></i> ${text}`;
}
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
