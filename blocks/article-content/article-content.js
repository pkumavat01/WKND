export default function decorate(block) {
  const allSections = block.querySelectorAll(':scope > div');

  // Ensure there are at least 3 sections to target the quote one
  if (allSections.length < 3) return;

  const quoteSection = allSections[2]; // third <div> inside the block
  const quoteContainer = quoteSection.querySelector('div');

  if (!quoteContainer) return;

  const quoteText = quoteContainer.querySelector('p:nth-of-type(1)');
  const quoteAuthor = quoteContainer.querySelector('p:nth-of-type(2)');

  if (!quoteText || !quoteAuthor) return;

  // Create yellow underline
  const underline = document.createElement('div');
  underline.classList.add('quote-underline');
  quoteContainer.insertBefore(underline, quoteAuthor);

  // Add classes for styling
  quoteSection.classList.add('quote-block');
  quoteText.classList.add('quote-text');
  quoteAuthor.classList.add('quote-author');
}
