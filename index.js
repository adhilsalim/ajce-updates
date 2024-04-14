/*
EXAMPLE TABLE ROW

<tbody>
    <tr>
        <td>
            <table>
                <tr>
                    <td style="padding: 0px" rowspan="2">
                        <span class="i-date">09</span>
                    </td>
                    <td style="padding: 0px"><span class="i-month">Jan</span></td>
                </tr>
                <tr>
                    <td style="padding: 0px"><span class="i-year">2024</span></td>
                </tr>
            </table>
        </td>
        <td>
            <a target="_blank" href="https://iqac.amaljyothi.ac.in/docs/pub/16.pdf">
                <h5 class="m-0 p-0">
                    <b>NOTICE - Academic Council Meeting on 04 Jan 2024</b>
                </h5>
                <span>Notice for the Academic Council Meeting on 04 Jan 2024</span>
            </a>
        </td>
        <td style="vertical-align: middle">
            <a target="_blank" href="https://iqac.amaljyothi.ac.in/docs/pub/16.pdf"><i class="fa fa-download"></i></a>
        </td>
    </tr>
    <tr>
        <td>
            <table>
                <tr>
                    <td style="padding: 0px" rowspan="2">
                        <span class="i-date">16</span>
                    </td>
                    <td style="padding: 0px"><span class="i-month">Dec</span></td>
                </tr>
                <tr>
                    <td style="padding: 0px"><span class="i-year">2023</span></td>
                </tr>
            </table>
        </td>
        <td>
            <a target="_blank" href="https://iqac.amaljyothi.ac.in/docs/pub/10.pdf">
                <h5 class="m-0 p-0"><b>First GB Meeting Agenda</b></h5>
                <span>First GB Meeting Agenda</span>
            </a>
        </td>
        <td style="vertical-align: middle">
            <a target="_blank" href="https://iqac.amaljyothi.ac.in/docs/pub/10.pdf"><i class="fa fa-download"></i></a>
        </td>
    </tr>
    <tr>
        <td>
            <table>
                <tr>
                    <td style="padding: 0px" rowspan="2">
                        <span class="i-date">11</span>
                    </td>
                    <td style="padding: 0px"><span class="i-month">Sep</span></td>
                </tr>
                <tr>
                    <td style="padding: 0px"><span class="i-year">2023</span></td>
                </tr>
            </table>
        </td>
        <td>
            <a target="_blank" href="https://iqac.amaljyothi.ac.in/docs/pub/5.pdf">
                <h5 class="m-0 p-0"><b>KTU Academic Calendar July 23 - Jan 24</b></h5>
                <span>KTU Academic Calendar July 23 - Jan 24</span>
            </a>
        </td>
        <td style="vertical-align: middle">
            <a target="_blank" href="https://iqac.amaljyothi.ac.in/docs/pub/5.pdf"><i class="fa fa-download"></i></a>
        </td>
    </tr>
</tbody>
*/

const puppeteer = require("puppeteer");

async function main() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  console.log("Browser opened");

  const url = "https://iqac.amaljyothi.ac.in/ajce-updates";
  await page.goto(url, { waitUntil: "networkidle2" });
  console.log("Page opened");

  await page.waitForSelector("table.datatable", { timeout: 10000 });
  console.log("Table found");

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

  console.log(result, typeof result);

  await browser.close();
}

main();
