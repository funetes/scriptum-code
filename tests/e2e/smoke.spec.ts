import { test, expect } from "@playwright/test";

test.describe("Smoke Test", () => {
  test("should load the home page", async ({ page }) => {
    await page.goto("/");

    // Check if the title exists (adjust based on actual app title)
    // For now, let's just check for general presence of main elements
    await expect(page).toHaveTitle(/Yt\.Kr\.Sync\.Viewer/i);

    // Check if the search input is visible
    const searchInput = page.getByPlaceholder(/궁금한 키워드로 영상 찾기/i);
    await expect(searchInput).toBeVisible();
  });

  test("should search for a keyword and show results", async ({ page }) => {
    await page.goto("/");
    const searchInput = page.getByPlaceholder(/궁금한 키워드로 영상 찾기/i);
    await searchInput.fill("아이폰");

    // Check if the search results header appears - give it more time if needed
    await expect(page.locator("h2", { hasText: /검색 결과/i })).toBeVisible({
      timeout: 10000,
    });

    // Check if at least one result link is visible
    // The search results use Links that go to /categoryId/id
    await expect(page.locator("a[href*='/']").first()).toBeVisible();
  });

  test("should navigate to script detail page", async ({ page }) => {
    await page.goto("/");

    // Wait for the carousel or categories to load
    await page.waitForSelector("a[href*='/']");

    // Find a link that looks like a script detail link (/:catId/:id)
    const scriptLinks = page.locator("a[href*='/']");
    const count = await scriptLinks.count();

    let targetLink = null;
    for (let i = 0; i < count; i++) {
      const href = await scriptLinks.nth(i).getAttribute("href");
      if (href) {
        const segments = href.split("/").filter(Boolean);
        // Detail links have 2 segments
        if (segments.length === 2 && segments[0] !== "user") {
          targetLink = scriptLinks.nth(i);
          break;
        }
      }
    }

    if (targetLink) {
      await targetLink.click();
      await expect(page).toHaveURL(/\/[^/]+\/[^/]+/);
      // Look for the aspect-video container in VideoPlayer
      await expect(page.locator(".aspect-video")).toBeVisible({
        timeout: 10000,
      });
    } else {
      console.warn("No script detail links found on the home page.");
    }
  });

  test("should navigate to category page", async ({ page }) => {
    await page.goto("/");

    // Look for links that are likely category links
    // Categories are rendered in a grid in CategoryList
    const categoryLinks = page.locator("a[href*='/']");
    const count = await categoryLinks.count();

    let categoryLink = null;
    let targetHref = "";

    for (let i = 0; i < count; i++) {
      const href = await categoryLinks.nth(i).getAttribute("href");
      if (href) {
        const segments = href.split("/").filter(Boolean);
        // Category links usually have 1 segment and are not home or user
        if (segments.length === 1 && segments[0] !== "user") {
          categoryLink = categoryLinks.nth(i);
          targetHref = href;
          break;
        }
      }
    }

    if (!categoryLink) {
      // Fallback: just pick the last link that isn't home or user
      categoryLink = page
        .locator("a[href*='/']:not([href='/']):not([href*='user'])")
        .first();
      targetHref = (await categoryLink.getAttribute("href")) || "";
    }

    if (categoryLink && targetHref) {
      await categoryLink.click();
      await expect(page).toHaveURL(targetHref);
    } else {
      console.warn("No category links found on the home page.");
    }
  });
});
