(function () {
  'use strict';

  // LiveReload server
  // eslint-disable-next-line no-undef
  {
    const script = document.createElement('script');
    script.src = `http://${
    (window.location.host || 'localhost').split(':')[0]
  }:35729/livereload.js?snipver=1`;
    document.head.append(script);
    console.info('Reload script added');
  }

  function clickHandler(e) {
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
      document.querySelector('.i-menu').classList.toggle('i-menu-show');
      document.body.classList.toggle('no-scroll');
    }

    if (target.closest('.i-post-header-caption')) {
      target.closest('.i-post-header-caption').classList.toggle('i-caption-show');
    }

    if (target.closest('.i-menu-close')) {
      document.querySelector('.i-menu').classList.toggle('i-menu-show');
      document.body.classList.toggle('no-scroll');
    }
  }

  document.body.addEventListener('click', clickHandler);

})();
//# sourceMappingURL=app.js.map
