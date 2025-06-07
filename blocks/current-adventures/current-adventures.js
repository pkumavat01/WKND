export default function decorate(block) {
  setTimeout(() => {
    const p = block.querySelector('p');
    if (!p) return;

    const categories = [];
    const categoryKeys = ['ALL', 'CLIMBING', 'CYCLING', 'SKIING', 'SURFING', 'TRAVEL'];

    // Clear original paragraph content
    p.innerHTML = '';

    categoryKeys.forEach((key, index) => {
      const el = index === 0 ? document.createElement('strong') : document.createElement('span');
      el.textContent = key;
      el.classList.add('adventure-tab');
      if (index === 0) el.classList.add('active');
      el.style.cursor = 'pointer';
      el.style.marginRight = '10px';
      categories.push({ key, el });
      p.appendChild(el);
    });

    const allTds = Array.from(block.querySelectorAll('table td'));
    allTds.forEach(td => td.classList.add('adventure-card'));

    const cards = allTds.map(td => td.cloneNode(true)); // clone for rebuild
    const table = block.querySelector('table');
    const tbody = table.querySelector('tbody');

    // Helper: build tbody rows with 4 cards per row
    function renderCards(cardList) {
      tbody.innerHTML = ''; // clear previous rows
      for (let i = 0; i < cardList.length; i += 4) {
        const row = document.createElement('tr');
        cardList.slice(i, i + 4).forEach(card => {
          const td = card.cloneNode(true);
          td.classList.add('adventure-card');
          row.appendChild(td);
        });
        tbody.appendChild(row);
      }
    }

    // Initial render: show all
    renderCards(cards);

    categories.forEach(({ key, el }) => {
      el.addEventListener('click', () => {
        categories.forEach(c => c.el.classList.remove('active'));
        el.classList.add('active');

        if (key === 'ALL') {
          renderCards(cards); // show all
        } else {
          const randomCount = Math.floor(Math.random() * 3) + 2;
          const shuffled = [...cards].sort(() => 0.5 - Math.random());
          renderCards(shuffled.slice(0, randomCount));
        }
      });
    });
  }, 0);
}
