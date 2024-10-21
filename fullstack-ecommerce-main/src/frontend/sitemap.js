const { SitemapStream, streamToPromise } = require("sitemap");
const { createWriteStream } = require("fs");

const hostname = "https://vapeplanet.co.uk";

// always: Content changes very frequently (e.g., news sites or social media feeds).
// hourly: Content updates hourly.
// daily: Updated daily (e.g., blogs, e-commerce product listings).
// weekly: Updated weekly (e.g., company news, static blogs).
// monthly: Updated on a monthly basis.
// yearly: Rarely updated, e.g., static pages like "About Us."
// never: Content never changes (e.g., terms of service, privacy policy).

// 1.0: Highest priority (e.g., homepage).
// 0.5: Medium priority (most pages).
// 0.1: Lowest priority (less important pages).

const urls = [
  { url: "/", changefreq: "monthly", priority: 1 },
  { url: "/produts", changefreq: "weekly", priority: 0.8 },
  // { url: "/contact", changefreq: "monthly", priority: 0.8 },
  // Add additional pages here
];

const writeStream = createWriteStream("./public/sitemap.xml");

// Create a sitemap instance and pipe it to the file stream
const sitemapStream = new SitemapStream({ hostname });

urls.forEach((url) => {
  sitemapStream.write(url);
});

sitemapStream.end();

// Convert the stream to a promise and write the result to a file
streamToPromise(sitemapStream)
  .then((data) => writeStream.write(data.toString()))
  .catch((err) => console.error(err));
// require('babel-register');

// const router = require('./router').default;
// const Sitemap = require('../').default;

// (
//     new Sitemap(router)
//         .build('https://vapeplanet.co.uk')
//         .save('./sitemap.xml')
// );
