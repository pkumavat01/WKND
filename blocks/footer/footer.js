import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerBlock = document.querySelector('.footer.block');
  footerBlock.classList.add('wknd-footer');

  const sections = footerBlock.querySelectorAll('.section');

  // Add classes for styling purposes
  sections[0]?.classList.add('wknd-footer-brand');      // WKND
  sections[1]?.classList.add('wknd-footer-nav');        // NAV links
  sections[2]?.classList.add('wknd-footer-social');     // Social + legal
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  block.append(footer);
}
