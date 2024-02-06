const fs = require('fs');
const path = require('path');
const eleventyImage = require('@11ty/eleventy-img');
const { eleventyImagePlugin } = require('@11ty/eleventy-img');
const { imgPath } = require('./filters');
const siteMetadata = require('../src/_data/metadata');
let rawMedia = fs.readFileSync('src/_data/media.json');
let media = JSON.parse(rawMedia);

// Default options, shared between all Image shortcodes/functions
const options = {
  decoding: 'async',
  filenameFormat: (id, src, width, format) => {
    const extension = path.extname(src);
    const name = path.basename(src, extension);
    return `${name}-${id}-${width}w.${format}`;
  },
  formats: ['webp'],
  loading: 'lazy',
  outputDir: 'images',
  sizes: media.wide.sizes,
  svgShortCircuit: true,
  urlPath: '/images/',
  widths: media.wide.widths.split(','),
};

module.exports = (eleventyConfig) => {
  // Image Shortcode
  // For use in liquid and nunjucks templates
  // {% image "cat.jpg", "photo of my tabby cat" %}
  eleventyConfig.addAsyncShortcode(
    'image',
    async function imageShortcode(
      src,
      alt,
      loading = options.loading,
      sizes = options.sizes,
      classList = '',
      formats = options.formats.join(','),
      widths = options.widths.join(','),
    ) {
      let file = imgPath(src);
      let imageMetadata = await eleventyImage(file, {
        filenameFormat: options.filenameFormat,
        formats: formats.split(','),
        outputDir: path.join(eleventyConfig.dir.output, options.outputDir),
        svgShortCircuit: options.svgShortCircuit,
        urlPath: options.urlPath,
        widths: widths.split(','),
      });
      let imageAttributes = {
        alt,
        class: classList,
        decoding: options.decoding,
        loading,
        sizes,
      };
      return eleventyImage.generateHTML(imageMetadata, imageAttributes);
    },
  );

  // Feed Image Filter
  // Creates a 1600px webp social sharing image for feeds and OG tags
  // {{ "cat.jpg" | feedImage }}
  eleventyConfig.addFilter('feedImage', async (src) => {
    let file = imgPath(src);
    let imageMetadata = await eleventyImage(file, {
      filenameFormat: options.filenameFormat,
      formats: ['jpg'],
      outputDir: path.join(eleventyConfig.dir.output, options.outputDir),
      urlPath: options.urlPath,
      widths: [1600],
    });
    return `${siteMetadata.url.slice(0, -1)}${imageMetadata.jpeg[0].url}`;
  });

  // Image Component
  // For use in WebC templates
  // <img webc:is="eleventy-image" src="cat.jpg" alt="photo of my tabby cat">
  eleventyConfig.addPlugin(eleventyImagePlugin, {
    filenameFormat: options.filenameFormat,
    formats: options.formats,
    outputDir: path.join(eleventyConfig.dir.output, options.outputDir),
    svgShortCircuit: options.svgShortCircuit,
    urlPath: options.urlPath,
    widths: options.widths,
    defaultAttributes: {
      decoding: options.decoding,
      loading: options.loading,
      sizes: options.sizes,
    },
  });
};
