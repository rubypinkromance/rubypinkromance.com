const { EleventyHtmlBasePlugin } = require('@11ty/eleventy');
const pluginNavigation = require('@11ty/eleventy-navigation');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const pluginWebc = require('@11ty/eleventy-plugin-webc');

const pluginImages = require('./_11ty/images.js');
const collections = require('./_11ty/collections.js');
const filters = require('./_11ty/filters.js');
const shortcodes = require('./_11ty/shortcodes.js');

/**
 * Based on Eleventy Base Blog v8
 * @see https://github.com/11ty/eleventy-base-blog/tree/main
 */
module.exports = function (eleventyConfig) {
  // Copy over various static files
  // For example, `./public/css/` ends up in `_site/css/`
  eleventyConfig.addPassthroughCopy({
    './public/': '/',
  });

  // Run Eleventy when these files change:
  // Watch content images for the image pipeline.
  eleventyConfig.addWatchTarget('content/**/*.{svg,webp,png,jpeg}');

  // Additional files to watch that will trigger LiveReload updates:
  // Watch for CSS changes
  eleventyConfig.setServerOptions({
    watch: ['dist/styles/*.css'],
  });

  // Official plugins
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  eleventyConfig.addPlugin(pluginImages);
  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginWebc, {
    components: [
      'src/_includes/partials/*.webc',
      'npm:@11ty/eleventy-img/*.webc',
    ],
  });

  // Collections
  for (let name in collections) {
    eleventyConfig.addCollection(name, collections[name]);
  }

  // Filters
  for (let name in filters) {
    eleventyConfig.addFilter(name, filters[name]);
  }

  // Shortcodes
  for (let name in shortcodes) {
    eleventyConfig.addShortcode(name, shortcodes[name]);
  }

  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
  };
};
