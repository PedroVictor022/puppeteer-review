const puppeteer = require("puppeteer");

(async () => {
  
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: false,
    userDataDir: "./tmp"

  });
  const page = await browser.newPage();
  console.log('Browser init');

  await page.goto('https://www.fctables.com/teams/palmeiras-191491/');
  // await page.screenshot({ path: 'print.png' }) // Print this page

  const teamInfo = await page.$$('#team-info');

  // Collect all info of website
  for(const infos of teamInfo) {
    const teamName = await page.evaluate(el => el.innerText, infos);
    console.table(teamName);
  };

  await browser.close();

})();