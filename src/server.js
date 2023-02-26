const express = require("express");

const puppeteer = require("puppeteer");

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/news-entries", async (req, res, next) => {
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();

  await page.goto("https://www.davaocity.gov.ph/tag/road-closures/");

  const element = await page.waitForSelector(".news-entry");

  const htmlString = await element.evaluate((el) => {
    return el.parentNode.innerHTML;
  });

  await browser.close();

  res.set("Content-Type", "text/html");
  res.send(JSON.stringify(htmlString));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
