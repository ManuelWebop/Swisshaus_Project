import { test, expect } from "@playwright/test";

test.describe("Register flow", () => {
  
  test.beforeEach(async ({ page }) => {
    // Esto nos ayudará a ver qué pasa en los logs de GitHub Actions
    page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
    page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));
  });

  test("register page renders step 1 form", async ({ page }) => {
    await page.goto("/register");
    await expect(page.getByText(/Información personal/i)).toBeVisible({ timeout: 10000 });
  });

  test("products page shows inventory heading", async ({ page }) => {
    // 1. MOCK TOTAL: Interceptamos cualquier llamada a la API de productos
    // Usamos un patrón que atrape tanto localhost:3000 como cualquier URL relativa
    await page.route(/\/productos(\?.*)?$/, async (route) => {
      // Si la petición es para el documento HTML (el front), la dejamos pasar
      if (route.request().resourceType() === 'document') {
        return route.continue();
      }
      
      console.log('Interceptando petición de datos a:', route.request().url());
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          { id: "1", nombre: "Mock CI", precio: 10, categoria: "W", descripcion: "D", imagen_url: "", stock: 1 }
        ]),
      });
    });

    await page.goto("/productos", { waitUntil: 'networkidle' });

    // 2. BUSQUEDA FLEXIBLE: Verificamos que el menú cargó con el producto mockeado
    await expect(page.getByRole("heading", { name: /Nuestro menú/i })).toBeVisible({ timeout: 15000 });
    await expect(page.getByText(/Mock CI/i)).toBeVisible({ timeout: 15000 });
  });

  test("events page shows calendar heading", async ({ page }) => {
    await page.route(/\/eventos(\?.*)?$/, async (route) => {
      if (route.request().resourceType() === 'document') return route.continue();
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([]),
      });
    });

    await page.goto("/eventos", { waitUntil: 'networkidle' });
    await expect(page.locator('body')).toContainText(/calendario/i, { timeout: 15000 });
  });
});