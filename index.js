const puppeteer = require("puppeteer");

(async () => {
  
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: false,
    userDataDir: "./tmp"

  });
  const page = await browser.newPage();
  console.log('Browser init');

  await page.goto('https://www.fctables.com/teams/atletico-mg-180615/');
  // await page.screenshot({ path: 'print.png' }) // Print this page

  const teamInfo = await page.$$('#team-info');

  // Collect all info of website
  for(const infos of teamInfo) {
    const allInfos = await page.evaluate(el => el.innerText, infos); // Return content this website

    // Return especific info 
    const nomeTime = await page.evaluate(el => el.querySelector("h2 > span").textContent, infos);

    const nextOpp = await page.evaluate(el => el.querySelector("div:nth-child(6) > a:nth-child(3)").textContent, infos);

    console.log(`
      Team name: ${nomeTime}\n
      ----------------- \n
      Next opponent: ${nextOpp}
    `);

  };

  await browser.close();

})();