const collections = {
  booksByRecent: (collectionApi) => {
    return collectionApi.getFilteredByTag('books').toReversed();
  },

  shortsByRecent: (collectionApi) => {
    return collectionApi.getFilteredByTag('shorts').toReversed();
  },

  shortsInSeries: (collectionApi) => {
    const posts = collectionApi.getFilteredByTag('shorts').toReversed();
    let allSeries = {};
    for (let post of posts) {
      const series = post.data.series;
      allSeries[series] ??= [];
      allSeries[series].push(post);
    }
    // sort and restructure the allSeries
    allSeries = Object.fromEntries(
      Object.keys(allSeries)
        .sort()
        .map((key) => [key, allSeries[key]]),
    );
    console.log(`Found ${Object.keys(allSeries).length} series`);
    return allSeries;
  },

  shortsByCategory: (collectionApi) => {
    const posts = collectionApi.getFilteredByTag('shorts').toReversed();
    let categories = {};
    for (let post of posts) {
      const category = post.data.category;
      categories[category] ??= [];
      categories[category].push(post);
    }
    // sort and restructure the categories
    categories = Object.fromEntries(
      Object.keys(categories)
        .sort()
        .map((key) => [key, categories[key]]),
    );
    console.log(`Found ${Object.keys(categories).length} categories`);
    return categories;
  },

  shortsByTag: (collectionApi) => {
    const posts = collectionApi.getFilteredByTag('shorts').toReversed();
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
    console.log(`Found ${Object.keys(tags).length} tags`);
    return tags;
  },

  shortsByCharacter: (collectionApi) => {
    const posts = collectionApi.getFilteredByTag('shorts').toReversed();
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
    console.log(`Found ${Object.keys(characters).length} characters`);
    return characters;
  },

  shortsByYear: (collectionApi) => {
    const posts = collectionApi.getFilteredByTag('shorts').toReversed();
    const years = {};
    for (let post of posts) {
      let key = post.page.date.getFullYear();
      years[key] ??= [];
      years[key].push(post);
    }
    console.log(`Found ${Object.keys(years).length} years`);
    return years;
  },

  shortsBySeries: (collectionApi) => itemsBySeries(collectionApi, 'shorts'),

  booksBySeries: (collectionApi) => itemsBySeries(collectionApi, 'books'),
};

const itemsBySeries = (collectionApi, tag) => {
  const series = [];
  const posts = collectionApi
    .getFilteredByTag(tag)
    .toReversed()
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
            url: `/${post.data.tags.includes('books') ? 'books' : 'shorts/series'}/${post.data.series}/`,
          },
          data: {
            ...post.data,
            isSeries: true,
            feature_image:
              post.data.seriesFeatureImage ?? post.data.feature_image,
            seriesCount,
          },
        };
      }
      return post;
    })
    .filter((post) => post !== undefined);
  return posts;
};

export default collections;
