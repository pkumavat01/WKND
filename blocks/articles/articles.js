
import { createOptimizedPicture } from '../../scripts/aem.js';

export default async function decorate(block) {
 
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

    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'cards-card-image';
    if (article.image) {
      const optimizedPicture = createOptimizedPicture(article.image, article.title || '', false, [{ width: '750' }]);
      imageWrapper.appendChild(optimizedPicture);
    }

    const bodyWrapper = document.createElement('div');
    bodyWrapper.className = 'cards-card-body';

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

