import { launchSearch } from './clickHandler';

export default function keyHandler(e) {
  if (e.key === 'Escape') {
    const openEl = document.querySelector('[class*="show"');
    openEl.classList.remove('i-show');
    document.body.classList.remove('no-scroll');
  }

  if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
    e.preventDefault();
    launchSearch();
  }

  if (e.key === 'm' && (e.metaKey || e.ctrlKey)) {
    e.preventDefault();
    document.querySelector('.i-menu').classList.toggle('i-show');
    document.body.classList.toggle('no-scroll');
  }
}
