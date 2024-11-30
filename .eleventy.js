import { EleventyHtmlBasePlugin } from '@11ty/eleventy';
import pluginNavigation from '@11ty/eleventy-navigation';
import pluginRss from '@11ty/eleventy-plugin-rss';
import pluginWebc from '@11ty/eleventy-plugin-webc';
import { wordCount } from 'eleventy-plugin-wordcount';
import postGraphPlugin from '@rknightuk/eleventy-plugin-post-graph';

import pluginImages from './_11ty/images.js';
import collections from './_11ty/collections.js';
import filters from './_11ty/filters.js';
import shortcodes from './_11ty/shortcodes.js';

/**
 * Based on Eleventy Base Blog v8
 * @see https://github.com/11ty/eleventy-base-blog/tree/main
 */
export default (eleventyConfig) => {
  // Copy over various static files
  // For example, `./public/css/` ends up in `_site/css/`
  eleventyConfig.addPassthroughCopy({
    './public/': '/',
    './node_modules/@spaceninja/writing-progress/writing-progress.js':
      '/scripts/writing-progress.js',
  });

  // Run Eleventy when these files change:
  // Watch content images for the image pipeline.
  eleventyConfig.addWatchTarget('content/**/*.{svg,webp,png,jpeg}');

  // Additional files to watch that will trigger LiveReload updates:
  // Watch for CSS changes
  eleventyConfig.setServerOptions({
    watch: ['dist/styles/*.css'],
  });

  // Plugins
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
  eleventyConfig.addPlugin(wordCount);
  eleventyConfig.addPlugin(postGraphPlugin);

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
