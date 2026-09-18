import { test, expect } from "@playwright/test";

// ── Página de inicio pública (/)" ──
test.describe("Página de Inicio pública (/)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("muestra el título principal de la landing", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("muestra el logo y el nombre SwissHaus", async ({ page }) => {
    await expect(page.locator(".lp-hero__logo")).toBeVisible();
    await expect(page.getByText("SwissHaus")).toBeVisible();
  });

  test("muestra el botón de ver menú", async ({ page }) => {
    await expect(
      page.getByRole("link", { name: /ver menú/i }),
    ).toBeVisible();
  });

  test("muestra el botón de próximos eventos", async ({ page }) => {
    await expect(
      page.getByRole("link", { name: /próximos eventos/i }),
    ).toBeVisible();
  });

  test("muestra la sección de categorías", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /Fondue & Raclette/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /Especialidades/i }),
    ).toBeVisible();
  });

  test("muestra la dirección de la tienda con Hermosillo", async ({ page }) => {
    await expect(page.locator(".lp-store__address")).toBeVisible();
    await expect(page.locator(".lp-store__address")).toContainText(
      /Hermosillo/i,
    );
  });

  test("renderiza el contenedor del mapa", async ({ page }) => {
    await expect(page.locator("[data-testid='map-section']")).toBeVisible();
  });

  test("sin sesión permanece en / mostrando la landing pública", async ({
    page,
  }) => {
    await expect(page).toHaveURL("/");
  });

  test("con sesión permanece en / mostrando la landing pública", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      localStorage.setItem("token", "fake-test-token-e2e");
    });
    await page.goto("/");
    await expect(page).toHaveURL("/");
    await expect(page.getByText("SwissHaus")).toBeVisible();
  });
});
