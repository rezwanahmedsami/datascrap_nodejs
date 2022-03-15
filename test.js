// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality
const pluginStealth  = require('puppeteer-extra-plugin-stealth');
const puppeteer = require('puppeteer-extra')

// add recaptcha plugin and provide it your 2captcha token (= their apiKey)
// 2captcha is the builtin solution provider but others would work as well.
// Please note: You need to add funds to your 2captcha account for this to work
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha');
puppeteer.use(pluginStealth());
puppeteer.use(
  RecaptchaPlugin({
    provider: {
      id: '2captcha',
      token: '610bbe106db3df6de8562f73da722ad8' // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
    },
    visualFeedback: true // colorize reCAPTCHAs (violet = detected, green = solved)
  })
)
let ProxyUrl = 'http://5.79.73.131:13010'
// puppeteer usage as normal
puppeteer.launch({ 
    headless: true,
    executablePath: "google-chrome"
    // args: ["--no-sandbox", "--proxy-server="+ProxyUrl]
}).then(async browser => {
  const page = await browser.newPage();

  await page.goto('https://www.wilko.com/en-uk', {waitUntil: "networkidle2"})
  // That's it, a single line of code to solve reCAPTCHAs 🎉
  const cloudFlareWrapper = await page.$('#cf-wrapper');
    if (cloudFlareWrapper) {
        await page.waitForSelector('#cf-hcaptcha-container');
        await page.solveRecaptchas();
    }
    console.log("delayig...")
    // await page.waitForTimeout(20000);
 
//   await page.screenshot({ path: 'response.png', fullPage: true })
const data = await page.evaluate(() => document.querySelector('*').outerHTML);

  console.log(data);
  await browser.close()
})