import puppeteer from 'puppeteer'
import { describe, it, beforeAll, afterAll } from 'vitest'
import fs from 'fs'
import path from 'path'

const SCREENSHOT_DIR = path.resolve('./tests/e2e/screenshots')
const APP_URL = process.env.APP_URL || 'http://localhost:5200'

async function waitForCanvas(page) {
  await page.waitForSelector('canvas', { timeout: 10000 })
  await page.waitForFunction(() => {
    const canvas = document.querySelector('canvas')
    return canvas && canvas.width > 0 && canvas.height > 0
  }, { timeout: 10000 })
}

async function waitForActiveButton(page, testId) {
  await page.waitForFunction(
    (tid) => {
      const btn = document.querySelector(`[data-testid="${tid}"]`)
      return btn && btn.getAttribute('aria-current') === 'true'
    },
    { timeout: 5000 },
    testId
  )
}

async function takeScreenshot(page, screenshotName) {
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
    await page.goto(APP_URL, { waitUntil: 'domcontentloaded', timeout: 60000 })
    await waitForCanvas(page)
  }, 30000)

  afterAll(async () => {
    await browser?.close() 
  })

  it('should render a canvas element', async () => {
    const canvas = await page.$('canvas')
    if (!canvas) throw new Error('Canvas not found — THREE.js failed to render')
  }, 15000)

  it('should display the first panorama and take a screenshot', async () => {
    await waitForActiveButton(page, 'panorama-btn-0')
    await takeScreenshot(page, 'panorama1.png')
  }, 15000)

  it('should navigate to second panorama and take a screenshot', async () => {
    await page.click('[data-testid="panorama-btn-1"]')
    await waitForActiveButton(page, 'panorama-btn-1')
    await takeScreenshot(page, 'panorama2.png')
  }, 15000)

  it('should navigate to third panorama and take a screenshot', async () => {
    await page.click('[data-testid="panorama-btn-2"]')
    await waitForActiveButton(page, 'panorama-btn-2')
    await takeScreenshot(page, 'panorama3.png')
  }, 15000)
})