import '../css/syntax-highlighting.css';

import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';
import html from 'highlight.js/lib/languages/xml';
import bash from 'highlight.js/lib/languages/bash';
import handlebars from 'highlight.js/lib/languages/handlebars';
import json from 'highlight.js/lib/languages/json';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('css', css);
hljs.registerLanguage('html', html);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('handlebars', handlebars);
hljs.registerLanguage('json', json);

hljs.addPlugin({
  'after:highlightElement': ({ el, result }) => {
    const span = document.createElement('span');
    span.textContent = result.language;
    span.setAttribute('class', 'i-language');
    el.prepend(span);
  },
});

hljs.highlightAll();
