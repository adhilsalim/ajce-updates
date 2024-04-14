const puppeteer = require("puppeteer");

async function scrapeData() {
  console.log("Starting the scraping process");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const url = "https://iqac.amaljyothi.ac.in/ajce-updates";
  await page.goto(url, { waitUntil: "networkidle2" });

  await page.waitForSelector("table.datatable", { timeout: 10000 });

  const result = await page.evaluate(() => {
    const tableRows = document.querySelectorAll(
      "div#v-pills-tabContent table.datatable tbody tr"
    );

    let data = [];

    if (tableRows.length > 0) {
      tableRows.forEach((row) => {
        const columns = Array.from(row.children);
        const dateTable = columns[0] ? columns[0].querySelector("table") : null;
        const dataDate =
          dateTable && dateTable.querySelector("span.i-date")
            ? dateTable.querySelector("span.i-date").innerText
            : "";
        const dataMonth =
          dateTable && dateTable.querySelector("span.i-month")
            ? dateTable.querySelector("span.i-month").innerText
            : "";
        const dataYear =
          dateTable && dateTable.querySelector("span.i-year")
            ? dateTable.querySelector("span.i-year").innerText
            : "";
        const dataTitle =
          columns[1] && columns[1].querySelector("a")
            ? columns[1].querySelector("a").innerText
            : "";
        const dataLink =
          columns[1] && columns[1].querySelector("a")
            ? columns[1].querySelector("a").href
            : "";

        if (dataDate && dataMonth && dataYear && dataTitle && dataLink) {
          data.push({
            date: `${dataDate}-${dataMonth}-${dataYear}`,
            title: dataTitle,
            link: dataLink,
          });
        }
      });
    }

    return data;
  });

  console.log("Data extracted");
  await browser.close();

  return result;
}

module.exports = scrapeData;
