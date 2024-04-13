const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const url = "https://iqac.amaljyothi.ac.in/ajce-updates";
  await page.goto(url, { waitUntil: "networkidle2" });

  const tableRowsArray = await page.evaluate(() => {
    const tableRows = Array.from(
      document.querySelectorAll("table.datatable tbody tr")
    );
    return tableRows.map((row) => {
      const columns = row.querySelectorAll("td");
      return Array.from(columns).map((column) => column.textContent.trim());
    });
  });

  console.log(tableRowsArray);

  //   tableRowsArray.forEach(async (row) => {
  //     console.log(row);
  //   });

  await browser.close();
})();
