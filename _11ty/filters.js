import path from 'path';
import { DateTime } from 'luxon';
import { wordCountCallback } from 'eleventy-plugin-wordcount';

const imageAssetsPath = path.join('_assets', '_images');

export const resolvedImgPath = (relativeFilePath) => {
  return path.resolve('src', imageAssetsPath, relativeFilePath);
};

export const imgPath = (relativeFilePath) => {
  return path.join('/', imageAssetsPath, relativeFilePath);
};

const filters = {
  // Filter to parse a string as JSON
  fromJson: JSON.parse,

  // Generates an excerpt from a post's content
  // This filter expects the full post content, post-processing, which it will
  // strip HTML tags from and then limit to about the first 200 characters.
  // The function backtracks to the space prior to the 200th character to
  // prevent splitting words.
  // @see https://11ty.rocks/eleventyjs/content/#excerpt-filter
  createExcerpt: (post) => {
    const content = post.replace(/(<([^>]+)>)/gi, '');
    return content.substr(0, content.lastIndexOf(' ', 200)) + '...';
  },

  // Given a relative image file page, return the full path
  imgPath: imgPath,

  // Date formatting (human readable)
  // @see https://moment.github.io/luxon/#/formatting?id=table-of-tokens
  readableDate: (dateObj, format, zone) => {
    return DateTime.fromJSDate(dateObj, { zone: zone || 'utc' }).toFormat(
      format || 'DD',
    );
  },

  // Date formatting (machine readable)
  // @see https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  htmlDateString: (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd');
  },

  // Get the first `n` elements of a collection.
  head: (array, n) => {
    if (!Array.isArray(array) || array.length === 0) {
      return [];
    }
    if (n < 0) {
      return array.slice(n);
    }
    return array.slice(0, n);
  },

  // Return the smallest number argument
  min: (...numbers) => {
    return Math.min.apply(null, numbers);
  },

  // Return all the tags used in a collection
  getAllTags: (collection) => {
    let tagSet = new Set();
    for (let item of collection) {
      (item.data.tags || []).forEach((tag) => tagSet.add(tag));
    }
    return Array.from(tagSet);
  },

  // Return all the tags used in a collection, except some
  filterTagList: (tags) => {
    return (tags || []).filter(
      (tag) => ['all', 'pubs', 'shorts', 'books'].indexOf(tag) === -1,
    );
  },

  // Return a subset of an array based on a single attribute value
  // @see https://11ty.rocks/eleventyjs/data-arrays/#pluck-filter
  pluck: (array, attr, value) => {
    return array.filter((item) => item.data[attr] === value);
  },

  // Return the first item in an array based on a single attribute value
  findItemBySlug: (array, slug) => {
    return array.find((item) => item.data.page.fileSlug === slug).data;
  },

  // Return the full title of a post, combining series info and subtitle,
  // falling back to the site's title if no post title is available.
  fullTitle: (title, subtitle, seriesTitle, seriesNumber, metadataTitle) => {
    if (title) {
      return `${seriesTitle ? `${seriesTitle}${seriesNumber ? ` ${seriesNumber}` : ''}: ` : ''}${title}${subtitle ? `: ${subtitle}` : ''}`;
    }
    return metadataTitle;
  },

  // Append the site's title to a page's title if they're not the same
  appendSiteTitle: (title, siteTitle) => {
    return title === siteTitle ? title : `${title} | ${siteTitle}`;
  },

  // Check if a post is a book
  isBook: (post) => {
    return post.data.tags.includes('books');
  },

  // Get the word count total for an array of posts
  wordCountPosts: (array) => {
    return array.reduce(
      (acc, post) => acc + wordCountCallback(post.rawInput),
      0,
    );
  },
};

export default filters;
