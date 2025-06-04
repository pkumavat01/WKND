import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const footerBlock = document.querySelector('.footer.block');
  const sections = footerBlock.querySelectorAll('.section');

  sections[0]?.classList.add('wknd-footer-brand');
  sections[1]?.classList.add('wknd-footer-nav');
  sections[2]?.classList.add('wknd-footer-social');

  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  const iconMap = {
    facebook: '/icons/facebook.svg',
    twitter: '/icons/twitter.svg',
    instagram: '/icons/insta.svg',
  };

  // 👇 Replace text links with icons in the first section (brand + social links)
  const socialLinksSection = footer.querySelector('.section:first-of-type .default-content-wrapper');
  const links = socialLinksSection?.querySelectorAll('a[title]');

  links?.forEach((link) => {
    const title = link.getAttribute('title')?.toLowerCase();
    const iconSrc = iconMap[title];
    if (iconSrc) {
      const iconImg = document.createElement('img');
      iconImg.src = iconSrc;
      iconImg.alt = title;
      iconImg.style.width = '24px';
      iconImg.style.height = '24px';
      iconImg.style.verticalAlign = 'middle';
      iconImg.style.marginRight = '0.5rem';

      link.textContent = ''; // Remove the word (facebook, etc.)
      link.appendChild(iconImg);
    }
  });

  block.append(footer);
}
