// Screenshot script using Puppeteer
// Run: node scripts/take_screenshots.js

import puppeteer from "puppeteer";
import fs from "node:fs";
import path from "node:path";

const BASE_URL = "https://giftora-six.vercel.app";
const OUT_DIR = path.join(process.cwd(), "scripts", "screenshots");

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

async function shoot(page, filename, selector = null) {
  await page.waitForNetworkIdle({ idleTime: 800, timeout: 12000 }).catch(() => {});
  const opts = { path: path.join(OUT_DIR, filename), fullPage: !selector };
  if (selector) {
    const el = await page.$(selector);
    if (el) { await el.screenshot(opts); } else { await page.screenshot(opts); }
  } else {
    await page.screenshot(opts);
  }
  console.log(`✅ Saved: ${filename}`);
}

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // 1. Homepage
  await page.goto(BASE_URL, { waitUntil: "networkidle2", timeout: 30000 });
  await page.waitForTimeout(2000);
  await shoot(page, "01_homepage_full.png");

  // 2. Homepage - top section
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(OUT_DIR, "02_homepage_hero.png"), clip: { x: 0, y: 0, width: 1440, height: 900 } });
  console.log("✅ Saved: 02_homepage_hero.png");

  // 3. Studio Page
  await page.goto(`${BASE_URL}/studio`, { waitUntil: "networkidle2", timeout: 30000 });
  await page.waitForTimeout(2000);
  await shoot(page, "03_studio_page.png");

  // 4. Click a product card
  const productCard = await page.$("article");
  if (productCard) {
    await productCard.click();
    await page.waitForTimeout(1000);
    await shoot(page, "04_studio_product_selected.png");
  }

  // 5. Login modal
  await page.goto(BASE_URL, { waitUntil: "networkidle2", timeout: 30000 });
  await page.waitForTimeout(1500);
  const loginBtn = await page.$("button");
  const allButtons = await page.$$("button");
  for (const btn of allButtons) {
    const txt = await btn.evaluate(el => el.innerText);
    if (txt.trim().toLowerCase().includes("login")) {
      await btn.click();
      await page.waitForTimeout(1000);
      await shoot(page, "05_login_modal.png");
      break;
    }
  }

  // 6. Cart Page
  await page.goto(`${BASE_URL}/cart`, { waitUntil: "networkidle2", timeout: 30000 });
  await page.waitForTimeout(1500);
  await shoot(page, "06_cart_page.png");

  await browser.close();
  console.log("\n🎉 All screenshots saved to:", OUT_DIR);
})();
