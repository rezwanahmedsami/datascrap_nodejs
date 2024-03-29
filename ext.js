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
let executablePathLocalMac = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
let executablePathServer = "google-chrome";

const GetHtmlContent = async (url) =>{
    await puppeteer.launch({ 
        headless: false,
        executablePath: executablePathLocalMac,
        // args: ["--no-sandbox", "--proxy-server="+ProxyUrl]
    }).then(async browser => {
      const page = await browser.newPage();
    
      await page.goto(url, {waitUntil: "domcontentloaded"})
      // That's it, a single line of code to solve reCAPTCHAs 🎉
      const cloudFlareWrapper = await page.$('#cf-wrapper');
        if (cloudFlareWrapper) {
            await page.waitForSelector('#cf-hcaptcha-container');
            await page.solveRecaptchas();
        }
        console.log("loading content...")
        await page.waitForTimeout(20000);
     
    //   await page.screenshot({ path: 'response.png', fullPage: true })
    const data = await page.evaluate(() => document.querySelector('*').outerHTML);
    
    console.log("Completed url: ", url);
      await browser.close()
    })
}

const Run_Proc_all = async () =>{
  let urls = [
  'https://www.wilko.com/en-uk', 
  'https://www.wilko.com/en-uk/storage/shoes-clothing-storage/clothes-storage/c/1438',
  'https://www.wilko.com/en-uk/home/household/c/370',
  'https://www.wilko.com/en-uk/pets/c/1061',
  'https://www.wilko.com/en-uk/pets/small-pets/c/1097',
  'https://www.wilko.com/en-uk/health-beauty/mens/mens-toiletries/mens-skincare/c/1494',
  'https://www.wilko.com/en-uk/garden-outdoor/garden-buildings/greenhouses-accessories/greenhouses/c/60',
  'https://www.wilko.com/en-uk/wilko-mini-greenhouse-large/p/0476577',
  'https://www.wilko.com/en-uk/wilko-pvc-tomato-greenhouse-with-pvc-cover/p/0476576',
  'https://www.wilko.com/en-uk/wilko-mini-greenhouse/p/0476578',
  'https://www.wilko.com/en-uk/palram-canopia-harmony-6-x-10ft-silver-greenhouse/p/0527974',
  'https://www.wilko.com/en-uk/palram-canopia-harmony-6-x-6ft-green-greenhouse/p/0527977',
  'https://www.wilko.com/en-uk/palram-canopia-harmony-6-x-10ft-green-greenhouse/p/0527973',
  'https://www.wilko.com/en-uk/palram-canopia-balance-8-x-12ft-extended-greenhouse/p/0527965',
  'https://www.wilko.com/en-uk/palram-canopia-mythos-6-x-4ft-green-greenhouse/p/0527985',
  'https://www.wilko.com/en-uk/palram-mythos-silver-6-x-4ft-greenhouse/p/0413533',
  'https://www.wilko.com/en-uk/palram-mythos-silver-6-x-8ft-greenhouse/p/0413535',
  'https://www.wilko.com/en-uk/palram-canopia-harmony-6-x-6ft-silver-greenhouse/p/0527978',
  'https://www.wilko.com/en-uk/palram-mythos-silver-6-x-10ft-greenhouse/p/0413536',
  'https://www.wilko.com/en-uk/palram-hybrid-green-6-x-4ft-greenhouse/p/0499162'
]

  await GetHtmlContent(urls[0]);
  await GetHtmlContent(urls[1]);
  await GetHtmlContent(urls[2]);
  await GetHtmlContent(urls[3]);
  await GetHtmlContent(urls[4]);
  await GetHtmlContent(urls[5]);
  // for (let i = 0; i < urls.length; i++) {
  //   await GetHtmlContent(urls[i]);
  // }
}

Run_Proc_all();