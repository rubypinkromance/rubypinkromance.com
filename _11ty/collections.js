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
        if (tag === 'pubs') continue;
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

  shortsBySeries: (collectionApi) => {
    const series = [];
    const posts = collectionApi
      .getFilteredByTag('shorts')
      .reverse()
      .map((post) => {
        if (post.data.series) {
          if (series.includes(post.data.series)) return undefined;
          const seriesCount = collectionApi
            .getFilteredByTag('shorts')
            .filter((item) => item.data.series === post.data.series).length;
          if (seriesCount < 2) return post;
          series.push(post.data.series);
          return {
            page: {
              ...post.page,
              url: `/shorts/${post.data.series}/`,
            },
            data: {
              ...post.data,
              isSeries: true,
              seriesCount: collectionApi
                .getFilteredByTag('shorts')
                .filter((item) => item.data.series === post.data.series).length,
            },
          };
        }
        return post;
      })
      .filter((post) => post !== undefined);
    return posts;
  },
};

module.exports = collections;
