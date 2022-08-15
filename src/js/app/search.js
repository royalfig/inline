import MiniSearch from 'minisearch';

async function getPosts() {
  try {
    const res = await fetch(
      `${SEARCH_URL}/ghost/api/content/posts/?key=${SEARCH_KEY}&limit=all&include=authors,tags&formats=plaintext`,
    );

    if (!res.ok) {
      throw Error(res.statusText);
    }
    const { posts } = await res.json();
    return posts;
  } catch (e) {
    throw Error(e);
  }
}

export default async function search() {
  if (!SEARCH_KEY || !SEARCH_URL) {
    throw Error('API key and URL required');
  }

  const posts = await cache();

  const miniSearch = new MiniSearch({
    fields: ['title', 'plaintext'], // fields to index for full-text search
    storeFields: ['title', 'url', 'excerpt', 'primary_tag'],
    searchOptions: {
      boost: { title: 2 },
      fuzzy: 0.2,
    }, // fields to return with search results
  });

  // Index all documents
  miniSearch.addAll(posts);

  const input = document.querySelector('.i-search-input');
  input.addEventListener('input', (e) => {
    const resultsContainer = document.querySelector('.i-search-results');

    if (e.target.value === '') {
      resultsContainer.innerHTML = '';
      return;
    }

    const results = miniSearch.search(e.target.value);

    // Search with default options
    const resultHtml = results.length
      ? resultTemplate(results)
      : '<p>No results. Try again.</p>';

    resultsContainer.innerHTML = resultHtml;
  });
}

function resultTemplate(results) {
  return results
    .map(
      ({
        title,
        url,
        primary_tag,
        excerpt,
        score,
      }) => `<div class="i-search-result">
      <div class="i-search-tags flex-row">
        <p class="i-search-tag">${
          primary_tag && primary_tag.name
        }</p><span class="i-search-score" style="width: ${
        (score / results[0].score) * 100
      }%"></span>
      </div>
        <p><a href="${url}">${title}</a></p>
        <p class="i-search-excerpt">${excerpt}</p>
              </div>`,
    )
    .join('');
}

async function cache() {
  const timestamp = Number.parseInt(localStorage.getItem('timestamp'));

  const isOutdatd = Date.now() - new Date(timestamp) > 24 * 60 * 60 * 1000;

  if (isOutdatd || !timestamp) {
    const posts = await getPosts();
    localStorage.setItem('timestamp', Date.now());
    localStorage.setItem('posts', JSON.stringify(posts));
    return posts;
  }

  return JSON.parse(localStorage.getItem('posts'));
}
