// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality
const puppeteer = require('puppeteer-extra')
var userAgent = require('user-agents');

// add recaptcha plugin and provide it your 2captcha token (= their apiKey)
// 2captcha is the builtin solution provider but others would work as well.
// Please note: You need to add funds to your 2captcha account for this to work
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha')
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
    headless: false,
}).then(async browser => {
  const page = await browser.newPage()
  await page.goto('https://www.wilko.com/en-uk?invalidSession=true', {waitUntil: "networkidle2"})
  await page.setUserAgent(userAgent.toString())
  // That's it, a single line of code to solve reCAPTCHAs 🎉
  await page.solveRecaptchas()

  await Promise.all([
    page.waitForNavigation(),
    page.$eval('#challenge-form', form => form.submit())
    // page.click(`body > main > article > div > form > input.btn.btn-install`)
  ])
  await page.screenshot({ path: 'response.png', fullPage: true })
//   await browser.close()
})