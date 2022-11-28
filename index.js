const puppeteer = require("puppeteer");

(async () => {
  
  const browser = await puppeteer.launch({
    headless: true
  });
  const page = await browser.newPage();
  console.log('Browser init');

  await page.goto('https://github.com/')
  await page.screenshot({ path: 'print.png' })

  await browser.close();

})();