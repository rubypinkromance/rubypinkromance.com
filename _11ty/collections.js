const collections = {
  booksByRecent: (collectionApi) => {
    return collectionApi.getFilteredByTag('books').reverse();
  },

  shortsByRecent: (collectionApi) => {
    return collectionApi.getFilteredByTag('shorts').reverse();
  },

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

  pubsByCharacter: (collectionApi) => {
    const posts = collectionApi.getFilteredByTag('pubs');
    let characters = {};
    for (let post of posts) {
      if (!post.data.characters) continue;
      for (let character of post.data.characters) {
        characters[character] ??= [];
        characters[character].push(post);
      }
    }
    // sort and restructure the characters
    characters = Object.keys(characters)
      .sort()
      .reduce((obj, key) => ((obj[key] = characters[key]), obj), {});
    return characters;
  },

  shortsBySeries: (collectionApi) => itemsBySeries(collectionApi, 'shorts'),

  booksBySeries: (collectionApi) => itemsBySeries(collectionApi, 'books'),
};

const itemsBySeries = (collectionApi, tag) => {
  const series = [];
  const posts = collectionApi
    .getFilteredByTag(tag)
    .reverse()
    .map((post) => {
      if (post.data.series) {
        if (series.includes(post.data.series)) return undefined;
        const seriesCount = collectionApi
          .getFilteredByTag(tag)
          .filter((item) => item.data.series === post.data.series).length;
        if (seriesCount < 2) return post;
        series.push(post.data.series);
        return {
          page: {
            ...post.page,
            url: `/${post.data.tags.includes('books') ? 'books' : 'shorts'}/${post.data.series}/`,
          },
          data: {
            ...post.data,
            isSeries: true,
            feature_image:
              post.data.seriesFeatureImage ?? post.data.feature_image,
            seriesCount: collectionApi
              .getFilteredByTag(tag)
              .filter((item) => item.data.series === post.data.series).length,
          },
        };
      }
      return post;
    })
    .filter((post) => post !== undefined);
  return posts;
};

module.exports = collections;
