export function launchSearch() {
  const searchEl = document.querySelector('.i-search');
  searchEl.classList.toggle('i-show');
  searchEl.querySelector('input').focus();
  document.body.classList.toggle('no-scroll');
}

export default function clickHandler(e) {
  const { target } = e;

  if (target.closest('.i-copy-button')) {
    navigator.clipboard.writeText(window.location.href);
    target.closest('.i-copy-button').classList.toggle('copied');
    setTimeout(
      () => target.closest('.i-copy-button').classList.toggle('copied'),
      2000,
    );
  }

  if (target.closest('.i-menu-button')) {
    document.querySelector('.i-menu').classList.toggle('i-show');
    document.body.classList.toggle('no-scroll');
  }

  if (target.closest('.i-search-button')) {
    launchSearch();
  }

  if (target.closest('.i-search-close')) {
    const searchEl = document.querySelector('.i-search');
    searchEl.classList.toggle('i-show');

    document.body.classList.toggle('no-scroll');
  }

  if (target.closest('.i-post-header-caption')) {
    target.closest('.i-post-header-caption').classList.toggle('i-show');
  }

  if (target.closest('.i-menu-close')) {
    document.querySelector('.i-menu').classList.toggle('i-show');
    document.body.classList.toggle('no-scroll');
  }

  if (target.closest('.i-mode-button')) {
    const { pref } = target.closest('.i-mode-button').dataset;
    document.documentElement.dataset.colorPref = pref;
    localStorage.setItem('pref', pref);
  }
}
