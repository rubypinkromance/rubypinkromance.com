import fs from 'fs';
import path from 'path';
import eleventyImage from '@11ty/eleventy-img';
import { eleventyImageTransformPlugin } from '@11ty/eleventy-img';
import { resolvedImgPath } from './filters.js';
import siteMetadata from '../src/_data/metadata.js';
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
  svgShortCircuit: 'size',
  urlPath: '/images/',
  widths: media.wide.widths.split(','),
};

export default (eleventyConfig) => {
  // OG Image Filter
  // Creates a 1600px jpg social sharing image for OG tags
  // {{ "cat.jpg" | ogImage }}
  eleventyConfig.addFilter('ogImage', async (src) => {
    let file = resolvedImgPath(src);
    let imageMetadata = await eleventyImage(file, {
      filenameFormat: options.filenameFormat,
      formats: ['jpg'],
      outputDir: path.join(eleventyConfig.dir.output, options.outputDir),
      urlPath: options.urlPath,
      widths: [1600],
    });
    return `${siteMetadata.url.slice(0, -1)}${imageMetadata.jpeg[0].url}`;
  });

  // Feed Image Filter
  // Creates a 512px jpg featured image for RSS feeds
  // {{ "cat.jpg" | feedImage }}
  eleventyConfig.addFilter('feedImage', async (src) => {
    let file = resolvedImgPath(src);
    let imageMetadata = await eleventyImage(file, {
      filenameFormat: options.filenameFormat,
      formats: ['jpg'],
      outputDir: path.join(eleventyConfig.dir.output, options.outputDir),
      urlPath: options.urlPath,
      widths: [512],
    });
    return `${siteMetadata.url.slice(0, -1)}${imageMetadata.jpeg[0].url}`;
  });

  // Image Transform
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
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
