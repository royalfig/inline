import MiniSearch from 'minisearch';

async function getPosts() {
  // TODO ERROR HANDLING
  const res = await fetch(
    'http://localhost:2368/ghost/api/content/posts/?key=a095332ca4856aab5549f1a277&limit=all&include=authors,tags&formats=plaintext',
  );
  const { posts } = await res.json();
  return posts;
}

export default async function search() {
  let posts = await getPosts();

  let miniSearch = new MiniSearch({
    fields: ['title', 'plaintext'], // fields to index for full-text search
    storeFields: ['title', 'url', 'excerpt', 'primary_tag'], // fields to return with search results
  });

  // Index all documents
  miniSearch.addAll(posts);

  const input = document.querySelector('.i-search-input');
  console.log(input);
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
        <p><a href="${url}">${title}</a> </p>
        <p class="i-search-excerpt">${excerpt}</p>
              </div>`;
    })
    .join('');
}
