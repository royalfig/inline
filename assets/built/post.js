(function () {
    'use strict';

    function toc() {
        const headings = document.querySelectorAll(
            '.post h2, .post h3, .post h4, .post h5, .post h6',
        );

        if (headings.length > 2) {
            const post = document.querySelector('.i-post-grid');
            const details = document.createElement('details');
            details.setAttribute('class', 'i-toc-content');
            const summary = document.createElement('summary');
            summary.innerHTML = '<strong>Table of Contents</strong>';
            details.append(summary);

            headings.forEach((el) => {
                const p = document.createElement('p');
                p.setAttribute('class', `i-toc-${el.tagName.toLocaleLowerCase()}`);
                const a = document.createElement('a');
                a.setAttribute('class', 'i-toc-link');

                a.textContent = el.textContent;
                a.href = `#${el.id}`;
                p.append(a);
                details.append(p);
            });

            post.prepend(details);
        }
    }

    // Ship JS only active on post pages for better performance

    toc();

})();
//# sourceMappingURL=post.js.map
