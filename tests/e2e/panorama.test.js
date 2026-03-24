import puppeteer from 'puppeteer'
import { describe, it, beforeAll, afterAll } from 'vitest'
import fs from 'fs'
import path from 'path'

const SCREENSHOT_DIR = path.resolve('./tests/e2e/screenshots')
const APP_URL = process.env.APP_URL || 'http://localhost:5200'

async function navigateToAndScreenshot(page, buttonIndex, screenshotName) {
  await page.goto(APP_URL, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await new Promise(r => setTimeout(r, 5000))
  if (buttonIndex > 0) {
    await page.click(`button:nth-child(${buttonIndex + 1})`)
    await new Promise(r => setTimeout(r, 3000))
  }
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, screenshotName) })
}

describe('Panorama Viewer E2E', () => {
  let browser
  let page

  beforeAll(async () => {
    if (!fs.existsSync(SCREENSHOT_DIR)) {
      fs.mkdirSync(SCREENSHOT_DIR, { recursive: true })
    }
    browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 720 })
  }, 30000)

  afterAll(async () => {
    await browser.close()
  })

  it('should render a canvas element', async () => {
    await page.goto(APP_URL, { waitUntil: 'domcontentloaded', timeout: 60000 })
    await new Promise(r => setTimeout(r, 3000))
    const canvas = await page.$('canvas')
    if (!canvas) throw new Error('Canvas not found — THREE.js failed to render')
  }, 60000)

  it('should display the first panorama and take a screenshot', async () => {
    await navigateToAndScreenshot(page, 0, 'panorama1.png')
  }, 60000)

  it('should navigate to second panorama and take a screenshot', async () => {
    await navigateToAndScreenshot(page, 1, 'panorama2.png')
  }, 60000)

  it('should navigate to third panorama and take a screenshot', async () => {
    await navigateToAndScreenshot(page, 2, 'panorama3.png')
  }, 60000)
})