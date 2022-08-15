function createLink(num, original) {
  if (num === 1) {
    return original;
  }

  return original + 'page/' + num + '/';
}

export default function pagination() {
  const paginationEl = document.querySelector('.i-page-number');

  if (!paginationEl) {
    return;
  }

  const { page, pages, original } = paginationEl.dataset;

  let pager = [];

  for (let i = 1; i <= Number.parseInt(pages); i++) {
    pager.push(
      `<a class="i-number ${
        i === Number.parseInt(page) ? 'i-current' : ''
      }" href="${createLink(i, original)}">${i}</a>`,
    );
  }

  const el = pager.join('');
  paginationEl.innerHTML = el;
}
