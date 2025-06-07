import { createOptimizedPicture } from '../../scripts/aem.js';

export default async function decorate(block) {
  const currentPath = window.location.pathname;

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

  // Select the list items
  const listItems = Array.from(block.querySelectorAll(
    '.columns > div > div:last-child ul:last-child li'
  ));

  listItems.forEach((li) => {
    const text = li.textContent.trim();

    const match = text.match(/^(.*)\s((?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday),?\s+\d{1,2}\s\w+\s\d{4})$/);

    if (match) {
      const title = match[1].trim();
      const date = match[2].trim();

      const article = indexData.find((entry) =>
        entry.title?.trim() === title
      );

      // If the article is already open, remove the <li>
      if (article?.path === currentPath) {
        li.remove();
        return;
      }

      // Format and add click event
      li.innerHTML = `
        <span class="title">${title}</span><br>
        <span class="date">${date}</span>
      `;

      li.style.cursor = 'pointer';
      li.addEventListener('click', () => {
        if (article?.path) {
          window.location.href = article.path;
        }
      });
    }
  });
}
