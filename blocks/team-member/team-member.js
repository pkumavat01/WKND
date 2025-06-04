export default function decorate(block) {
  [...block.children].forEach((row) => {
    const container = row.querySelector('div > div');
    if (!container) return;

    // Find the paragraph containing social links (with <a> tags)
    const socialPara = [...container.querySelectorAll('p')].find(p =>
      p.textContent.toLowerCase().includes('facebook') ||
      p.textContent.toLowerCase().includes('twitter') ||
      p.textContent.toLowerCase().includes('instagram')
    );

    if (!socialPara) return;

    const iconMap = {
      facebook: '/icons/facebook.svg',
      twitter: '/icons/twitter.svg',
      instagram: '/icons/insta.svg',
    };

    const socialDiv = document.createElement('div');
    socialDiv.className = 'social-icons';

    socialPara.querySelectorAll('a').forEach(a => {
      const name = a.textContent.trim().toLowerCase();
      if (iconMap[name]) {
        const link = document.createElement('a');
        link.href = a.href;
        link.innerHTML = `<img src="${iconMap[name]}" alt="${name.charAt(0).toUpperCase() + name.slice(1)}" />`;
        socialDiv.appendChild(link);
      }
    });

    socialPara.replaceWith(socialDiv);
  });
}
