// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality
const pluginStealth  = require('puppeteer-extra-plugin-stealth');
const puppeteer = require('puppeteer-extra')
var request = require('request');

// add recaptcha plugin and provide it your 2captcha token (= their apiKey)
// 2captcha is the builtin solution provider but others would work as well.
// Please note: You need to add funds to your 2captcha account for this to work
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha');
puppeteer.use(pluginStealth());
puppeteer.use(
  RecaptchaPlugin({
    provider: {
      id: '2captcha',
      token: '6d170d2df6c3d6147c9dc6af5316a8c7' // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
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

    request.post(
      'https://www.rightdev.co.uk/datascraping/inserthtml.php',
      { form: { url: url, html: data } },
      function (error, response, body) {
          if (!error && response.statusCode == 200) {
              let json = JSON.parse(body);
              if (json.status == true) {
                console.log("Data Inserted in database");
              }else{
                console.log("Data Insert failed in database");
              }
          }
      }
  );
  console.log("Completed url: ", url);
      await browser.close();
    })
}

const Run_Proc_all = async () =>{

  request.get(
    'https://www.rightdev.co.uk/datascraping/geturls.php',
    async function (error, response, body) {
        if (!error && response.statusCode == 200) {
            let urls = JSON.parse(body);    
            let l = 2 
            let n = l;
            for (let i = 0; i < urls.length; i++) {
               
               if (n == i) {
                await GetHtmlContent(urls[i].url);
                n += l;
               }else{
                GetHtmlContent(urls[i].url);
               }
            }   
        }
    }
  );
}

Run_Proc_all();