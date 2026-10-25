import AxeBuilder from "@axe-core/playwright";
import { test, expect } from "@playwright/test";
test("journey completes for every goal, preserves answers, and restarts", async ({
  page,
}) => {
  await page.goto("/");
  const journey = page.locator("#jornada");
  await page.setViewportSize({ width: 1440, height: 1000 });
  await journey
    .getByRole("heading", { name: "A SUA EVOLUÇÃO COMEÇA AQUI." })
    .scrollIntoViewIfNeeded();
  await expect(
    page
      .getByRole("navigation", { name: "Navegação principal" })
      .getByRole("link", { name: "Sua jornada" }),
  ).toHaveAttribute("aria-current", "location");
  for (const goal of [
    "Ganhar massa muscular",
    "Reduzir gordura corporal",
    "Melhorar condicionamento",
    "Criar constância",
  ]) {
    await journey.getByRole("button", { name: goal, exact: true }).click();
    await journey
      .getByRole("button", { name: "Continuar", exact: true })
      .click();
    await journey.locator(".option").first().click();
    const challenge = await journey.locator(".option").first().innerText();
    await journey
      .getByRole("button", { name: "Continuar", exact: true })
      .click();
    await journey.getByRole("button", { name: "3 dias", exact: true }).click();
    await journey.getByRole("button", { name: "Voltar", exact: true }).click();
    await expect(journey.locator(".option").first()).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await journey
      .getByRole("button", { name: "Continuar", exact: true })
      .click();
    await expect(
      journey.getByRole("button", { name: "3 dias", exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
    await journey
      .getByRole("button", { name: "Continuar", exact: true })
      .click();
    await journey
      .getByRole("button", { name: "Consultoria online", exact: true })
      .click();
    await journey
      .getByRole("button", { name: "Continuar", exact: true })
      .click();
    await expect(journey.locator(".answer-summary")).toContainText(goal);
    await expect(journey.locator(".answer-summary")).toContainText(challenge);
    await journey
      .getByRole("button", { name: "Conversar sobre minha jornada" })
      .click();
    await expect(journey.getByRole("status")).toContainText(
      "ainda não foi informado",
    );
    await journey
      .getByRole("button", { name: "Recomeçar", exact: true })
      .click();
    await expect(
      journey.getByRole("button", { name: "Continuar", exact: true }),
    ).toBeDisabled();
  }
});
test("mobile menu has keyboard focus, Escape, links and methods work", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Abrir menu" }).click();
  const dialog = page.getByRole("dialog", { name: "Menu de navegação" });
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(page.getByRole("button", { name: "Abrir menu" })).toBeFocused();
  await page.getByRole("button", { name: "Abrir menu" }).click();
  await dialog.getByRole("link", { name: "O método" }).click();
  await expect(dialog).not.toBeVisible();
  await page
    .locator("#metodo")
    .getByRole("button", { name: "Próxima fase" })
    .click();
  await expect(page.locator(".method-caption h3")).toHaveText(
    "Estratégia que cabe na rotina.",
  );
  await page
    .locator("#servicos")
    .getByRole("button", { name: "PRESENCIAL", exact: true })
    .click();
  await expect(page.locator(".service-copy")).toContainText(
    "Técnica de perto.",
  );
  const question = page.locator("#duvidas summary").first();
  await question.click();
  await expect(page.locator("#duvidas details").first()).toHaveAttribute(
    "open",
    "",
  );
});
test("requested widths have no horizontal overflow, images load, no runtime errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  for (const width of [360, 375, 390, 430, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await expect
      .poll(() =>
        page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      )
      .toBe(true);
  }
  for (const img of await page.locator("img").all())
    await img.scrollIntoViewIfNeeded();
  await page.locator("footer").scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      page
        .locator("img")
        .evaluateAll((imgs) =>
          imgs.every(
            (i) =>
              (i as HTMLImageElement).complete &&
              (i as HTMLImageElement).naturalWidth > 0,
          ),
        ),
    )
    .toBe(true);
  expect(errors).toEqual([]);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.screenshot({ path: "test-results/desktop.png", fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: "test-results/mobile.png", fullPage: true });
});

test("configured WhatsApp receives the complete encoded journey without sending data automatically", async ({
  page,
}) => {
  await page.route("**/src/config/site.ts*", async (route) => {
    const response = await route.fetch();
    const body = await response.text();
    const patched = body.replace(
      /whatsapp:\s*["']{2}/,
      'whatsapp: "5511999999999"',
    );
    expect(patched).not.toBe(body);
    await route.fulfill({ response, body: patched });
  });
  await page.addInitScript(() => {
    const testWindow = window as typeof window & { openedUrl?: string };
    window.open = (url) => {
      testWindow.openedUrl = String(url);
      return null;
    };
  });
  await page.goto("/");
  const journey = page.locator("#jornada");
  await journey
    .getByRole("button", { name: "Criar constância", exact: true })
    .focus();
  await page.keyboard.press("Enter");
  await journey.getByRole("button", { name: "Continuar", exact: true }).click();
  await expect(
    journey.getByRole("heading", { name: "O que mais dificulta seu caminho?" }),
  ).toBeFocused();
  await journey
    .getByRole("button", { name: "Minha rotina é muito corrida", exact: true })
    .click();
  await journey.getByRole("button", { name: "Continuar", exact: true }).click();
  await journey.getByRole("button", { name: "3 dias", exact: true }).click();
  await journey.getByRole("button", { name: "Continuar", exact: true }).click();
  await journey
    .getByRole("button", { name: "Consultoria online", exact: true })
    .click();
  await journey.getByRole("button", { name: "Continuar", exact: true }).click();
  expect(
    await page.evaluate(
      () => (window as typeof window & { openedUrl?: string }).openedUrl,
    ),
  ).toBeUndefined();
  await journey
    .getByRole("button", { name: "Conversar sobre minha jornada" })
    .click();
  const link = await page.evaluate(
    () => (window as typeof window & { openedUrl?: string }).openedUrl,
  );
  const url = new URL(link!);
  expect(url.origin + url.pathname).toBe("https://wa.me/5511999999999");
  for (const answer of [
    "Criar constância",
    "Minha rotina é muito corrida",
    "3 dias",
    "Consultoria online",
  ])
    expect(url.searchParams.get("text")).toContain(answer);
});

test("accessible contrast and semantics on desktop, mobile and open menu", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.locator("#jornada .journey-panel")).toBeVisible();
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  }
  await page.getByRole("button", { name: "Abrir menu" }).click();
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press("Tab");
    expect(
      await page
        .locator("#mobile-menu")
        .evaluate((el) => el.contains(document.activeElement)),
    ).toBe(true);
  }
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(results.violations).toEqual([]);
});
