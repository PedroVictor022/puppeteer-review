const puppeteer = require("puppeteer");

(async () => {
  const _teamName = [];
  const _teamInfo = [];
  const _lastMatches = [];
  const _nextMatches = [];

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
    // Return content this website
    try {
      const allInfos = await page.evaluate((el) => el.innerText, infos);
      _teamInfo.push(allInfos);
    } catch (err) {
      return err;
    }

    // Return especific info
    try {
      const nomeTime = await page.evaluate(
        (el) => el.querySelector("h2 > span").textContent,
        infos
      );
      _teamName.push(nomeTime);
    } catch (err) {
      return err;
    }

    // GET NEXT OPS
    const nextOps = await page.$$(
      "#team-info > div.col-md-8.col-lg-9.col-sm-12 > div.panel.panel-default > div > div > div.row > div:nth-child(3) > div > div.panel-body.pn > div"
    ); 
    for (const nxOps of nextOps) {
      const n = await page.evaluate((el) => el.innerText, nxOps);
      _nextMatches.push(n);
    }

    const lastMatchs = await page.$$(
      "div > div.panel-body.pn.box_last_matches.small_box_h2h"
    );

    for (const sevenLast of lastMatchs) {
      const matches = await page.evaluate((el) => el.innerText, sevenLast);
      _lastMatches.push(matches);
    }

    // Data games
    const datas = await page.$$(
      "div.status > div.date.date_unix.date_unix_edit.tooltip_setup"
    );
    for (const allDatas of datas) {
      const data = await page.evaluate((el) => el.innerText, allDatas);
      _lastMatches.push(data);
    }

    // Players 
    const players = await page.$$('.table table-striped .table-bordered .table-hover .stage-table .table-condensed .top_scores > tbody > tr')
    for(const allPlayers of players) {
      const tenPlayers = await page.evaluate((el) => el.innerText, allPlayers);
      _lastMatches.push(tenPlayers)
    }

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
    console.log(`${_lastMatches} - PROXIMAS PARTIDAS ${_nextMatches}`);
  }

  await browser.close();
})();
