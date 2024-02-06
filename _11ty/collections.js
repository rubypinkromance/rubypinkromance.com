const collections = {
  postsByRecent: (collectionApi) => {
    return collectionApi.getFilteredByTag('blog').reverse();
  },

  // Posts by tag
  // @see https://lea.verou.me/blog/2023/11ty-indices/#dynamic-postsbytag-collection
  postsByTag: (collectionApi) => {
    const posts = collectionApi.getFilteredByTag('blog');
    let tags = {};
    for (let post of posts) {
      for (let tag of post.data.tags) {
        if (tag === 'blog') continue;
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

  // Posts by year
  postsByYear: (collectionApi) => {
    const posts = collectionApi.getFilteredByTag('blog').reverse();
    const years = {};
    for (let post of posts) {
      let key = post.date.getFullYear();
      years[key] ??= [];
      years[key].push(post);
    }
    return years;
  },
};

module.exports = collections;
