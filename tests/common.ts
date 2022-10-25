import type { Page } from "@playwright/test";

export async function goto(page: Page, url: string) {
  await page.goto(url);
}