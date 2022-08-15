import MiniSearch from 'minisearch';

async function getPosts() {
  console.log('fetchings');
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

  let posts = await cache();

  let miniSearch = new MiniSearch({
    fields: ['title', 'plaintext'], // fields to index for full-text search
    storeFields: ['title', 'url', 'excerpt', 'primary_tag'], // fields to return with search results
  });

  // Index all documents
  miniSearch.addAll(posts);

  const input = document.querySelector('.i-search-input');
  input.addEventListener('input', (e) => {
    let results = miniSearch.search(e.target.value);

    console.log(results);
    // Search with default options
    let resultHtml = resultTemplate(results);

    const resultsContainer = document.querySelector('.i-search-results');
    resultsContainer.innerHTML = resultHtml;
  });
}

function resultTemplate(results) {
  return results
    .map(({ title, url, primary_tag, excerpt, score }) => {
      return `<div class="i-search-result">
      <div class="i-search-tags flex-row">
        <p class="i-search-tag">${
          primary_tag?.name
        }</p><span class="i-search-score" style="width: ${
        (score / results[0].score) * 100
      }%"></span>
      </div>
        <p><a href="${url}">${title}</a></p>
        <p class="i-search-excerpt">${excerpt}</p>
              </div>`;
    })
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
