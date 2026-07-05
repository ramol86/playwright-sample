import { test, expect } from '@playwright/test';
import path from 'path';
import { pathToFileURL } from 'url';

// Automatically locate index.html in the current project
const appUrl = pathToFileURL(path.resolve(process.cwd(), 'index.html')).href;

test('Verify title and containers', async ({ page }) => {
  await page.goto(appUrl);

  // Verify page title
  await expect(page).toHaveTitle('welcome');

  // Verify exactly five divs exist
  const divs = page.locator('body > div');
  await expect(divs).toHaveCount(5);

  // Verify each container exists
  for (let i = 0; i < 5; i++) {
    await expect(page.locator(`#container${i}`)).toHaveCount(1);
  }


});

test('Verify input fields and button', async ({ page }) => {
  await page.goto(appUrl);

  // Verify input fields exist
  const usernameInput = page.locator('#username');
  const passwordInput = page.locator('#password');
  await expect(usernameInput).toHaveCount(1);
  await expect(passwordInput).toHaveCount(1);

  // Verify button exists
  const button = page.locator('#btn');
  await expect(button).toHaveCount(1);

    //verify input fields have correct placeholder text
  await expect(usernameInput).toHaveAttribute('placeholder', 'Enter username here');
  await expect(passwordInput).toHaveAttribute('placeholder', 'Enter password here');

  //verify button has correct text
  await expect(button).toHaveText('Click Me');

  //verify input fields have correct class
  await expect(usernameInput).toHaveClass(/txtClass/);  
  
});