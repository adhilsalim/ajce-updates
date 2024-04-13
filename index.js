const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const url = "https://iqac.amaljyothi.ac.in/ajce-updates";
  await page.goto(url, { waitUntil: "networkidle2" });

  const tableHTML = await page.evaluate(() => {
    const tableRows = Array.from(document.querySelectorAll("table tr"));
    console.log(tableRows);
  });

  await browser.close();
})();
