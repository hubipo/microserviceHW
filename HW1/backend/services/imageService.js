const puppeteer = require('puppeteer');

// Service to fetch image data from Baidu Image Search
const fetchImageData = async (query) => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Set request interception to improve performance
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      if (['image', 'stylesheet', 'font'].includes(req.resourceType())) {
        req.abort(); // Block unnecessary requests
      } else {
        req.continue(); // Continue loading other resources
      }
    });

    const imageUrl = `https://image.baidu.com/search/index?tn=baiduimage&word=${encodeURIComponent(query)}`;

    // Navigate to the image search URL
    await page.goto(imageUrl, { waitUntil: 'networkidle0' });

    // Wait for the images to be loaded
    await page.waitForSelector('.imgitem img', { timeout: 10000 });

    // Extract the URL of the first relevant image found in the imgitem class
    const imageSrc = await page.evaluate(() => {
      const firstImageElement = document.querySelector('.imgitem img');
      return firstImageElement ? firstImageElement.src : '';
    });

    await browser.close();

    if (imageSrc) {
      return { imageUrl: imageSrc };
    } else {
      throw new Error('No image found');
    }
  } catch (error) {
    throw new Error('Failed to fetch image data: ' + error.message);
  }
};

module.exports = { fetchImageData };
