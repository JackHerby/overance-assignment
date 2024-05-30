import { test, expect } from '@playwright/test'

test('visits the app root url', async ({ page }) => {
  await page.goto('/')
  const toolbar = await page.$('header .p-toolbar')
  const searchInput = await page.$('header .p-inputtext')
  const inputField = await page.$('.p-card')
  const addButton = await page.$('.add-button')
  expect(page).toBeTruthy()
  expect(toolbar).not.toBeNull()
  expect(searchInput).not.toBeNull()
  expect(inputField).not.toBeNull()
  expect(addButton).not.toBeNull()
})
