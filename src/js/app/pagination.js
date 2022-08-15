function createLink(num, original) {
  if (num === 1) {
    return original;
  }

  return `${original}page/${num}/`;
}

export default function pagination() {
  const paginationEl = document.querySelector('.i-page-number');

  if (!paginationEl) {
    return;
  }

  const { page, pages, original } = paginationEl.dataset;

  const pager = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= Number.parseInt(pages, 10); i++) {
    pager.push(
      `<a class="i-number ${
        i === Number.parseInt(page, 10) ? 'i-current' : ''
      }" href="${createLink(i, original)}">${i}</a>`,
    );
  }

  const el = pager.join('');
  paginationEl.innerHTML = el;
}
