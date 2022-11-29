const puppeteer = require("puppeteer");

(async () => {
  const _lastMatches = [];

  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: false,
    userDataDir: "./tmp",
  });
  const page = await browser.newPage();
  console.log("Browser init");

  await page.goto("https://www.fctables.com/teams/atletico-mg-180615/");
  // await page.screenshot({ path: 'print.png' }) // Print this page

  const teamInfo = await page.$$("#team-info");

  // Collect all info of website
  for (const infos of teamInfo) {
    const allInfos = await page.evaluate((el) => el.innerText, infos); // Return content this website

    // Return especific info
    const nomeTime = await page.evaluate(
      (el) => el.querySelector("h2 > span").textContent,
      infos
    );

    const nextOpp = await page.evaluate(
      (el) => el.querySelector("div:nth-child(6) > a:nth-child(3)").textContent,
      infos
    );

    const lastMatchs = await page.$$(
      "div > div.panel-body.pn.box_last_matches.small_box_h2h"
    );

    for (const sevenLast of lastMatchs) {
      const matches = await page.evaluate((el) => el.innerText, sevenLast);
      // _lastMatches.push(matches);
    }

    // Data games
    const datas = await page.$$("div.status > div.date.date_unix.date_unix_edit.tooltip_setup");
    for (const allDatas of datas) {
      const data = await page.evaluate((el) => el.innerText, allDatas);
      _lastMatches.push(data);
    };


    // console.log(datas);

    // const nextGames = await page.evaluate((el) => el.querySelectorAll("div.name.game_hover_info.set_action > meta[content]").innerText, infos)

    // console.log(nextGames);

    // console.log(`
    //   Team name: ${nomeTime}
    //   -----------------
    //   Next opponent: ${nextOpp}
    //   -----------------
    //   Last matches: ${_lastMatches}
    // `);
    console.log(_lastMatches);
  }

  await browser.close();
})();
