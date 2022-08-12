import '../../css/app.css';
import clickHandler from './clickHandler';
import keyHandler from './keyHandler';
import search from './search';
import { determineColorModeSupport } from './colorModeToggle';
// LiveReload server
// eslint-disable-next-line no-undef
if (ENV === 'development') {
  const script = document.createElement('script');
  script.src = `http://${
    (window.location.host || 'localhost').split(':')[0]
  }:35729/livereload.js?snipver=1`;
  document.head.append(script);
  console.info('Reload script added');
}

document.body.addEventListener('click', clickHandler);
document.body.addEventListener('keydown', keyHandler);

search();
determineColorModeSupport();
const hex = document.documentElement.dataset.accentColor;
const colorInput = document.querySelector('.i-color');
colorInput.value = hex;
colorInput.addEventListener('change', generateColorPalette);

// Pagination
const paginationEl = document.querySelector('.i-page-number');

// if (!paginationEl) {
//   return;
// }

const { page, pages, slug } = paginationEl.dataset;

let pager = [];

for (let i = 1; i <= Number.parseInt(pages); i++) {
  pager.push(
    `<a class="i-number ${
      i === Number.parseInt(page) ? 'i-current' : ''
    }" href="/tag/${slug}/${i === 1 ? '' : 'page/' + i + '/'}">${i}</a>`,
  );
}

const el = pager.join('');
paginationEl.innerHTML = el;
