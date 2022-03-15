const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(' https://www.wilko.com/en-uk?invalidSession=true', { waitUntil: 'networkidle0' });
  const data = await page.evaluate(() => document.querySelector('*').outerHTML);

  console.log(data);
  await browser.close();
})();