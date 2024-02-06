const collections = {
  booksByRecent: (collectionApi) => {
    return collectionApi.getFilteredByTag('books').reverse();
  },

  shortsByRecent: (collectionApi) => {
    return collectionApi.getFilteredByTag('shorts').reverse();
  },

  // Posts by tag
  // @see https://lea.verou.me/blog/2023/11ty-indices/#dynamic-postsbytag-collection
  shortsByTag: (collectionApi) => {
    const posts = collectionApi.getFilteredByTag('shorts');
    let tags = {};
    for (let post of posts) {
      for (let tag of post.data.tags) {
        if (tag === 'shorts') continue;
        tags[tag] ??= [];
        tags[tag].push(post);
      }
    }
    // sort and restructure the tags
    tags = Object.fromEntries(
      Object.entries(tags).sort((a, b) => b[1].length - a[1].length),
    );
    return tags;
  },
};

module.exports = collections;
