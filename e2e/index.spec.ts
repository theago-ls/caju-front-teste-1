import { test, expect } from "@playwright/test";

test.describe("Dashboard", () => {
  test("loads correctly", async ({ page }) => {
    await page.goto("http://localhost:3001/");

    await expect(
      page.getByRole("heading", { name: "Caju Front Teste" })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Pronto para revisar" })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Reprovado" })
    ).toBeVisible();
  });

  test("shows confirmation dialog on actions", async ({ page }) => {
    await page.goto("http://localhost:3001/");

    await page.getByRole("button", { name: "Aprovar" }).first().click()
    await expect(
      page.getByText("Você tem certeza que deseja aprovar")
    ).toBeVisible();
    await page.getByRole("button", { name: "Cancelar" }).click()

    await page.getByRole("button", { name: "Reprovar" }).first().click()
    await expect(
      page.getByText("Você tem certeza que deseja reprovar")
    ).toBeVisible();
    await page.getByRole("button", { name: "Cancelar" }).click()

    await page.getByLabel("delete").first().click()
    await expect(
      page.getByText("Você tem certeza que deseja excluir")
    ).toBeVisible();
    await page.getByRole("button", { name: "Cancelar" }).click()

    await page.getByLabel("refetch").first().click()
    await expect(
      page.getByText("Você tem certeza que deseja recarregar")
    ).toBeVisible();
    await page.getByRole("button", { name: "Cancelar" }).click()
  });

  test("sends status update on confirmation", async ({ page }) => {
    await page.goto("http://localhost:3001/");

    await page.getByRole("button", { name: "Revisar novamente" }).first().click()
    await expect(
      page.getByText("Você tem certeza que deseja revisar")
    ).toBeVisible();
    await page.getByRole("button", { name: "Confirmar" }).click()
    await expect(
      page.getByText("Atualização finalizada com sucesso!").last()
    ).toBeVisible();
    
    await page.getByRole("button", { name: "Aprovar" }).first().click()
    await expect(
      page.getByText("Você tem certeza que deseja aprovar")
    ).toBeVisible();
    await page.getByRole("button", { name: "Confirmar" }).click()
    await expect(
      page.getByText("Atualização finalizada com sucesso!").last()
    ).toBeVisible();

    await page.getByRole("button", { name: "Reprovar" }).first().click()
    await expect(
      page.getByText("Você tem certeza que deseja reprovar")
    ).toBeVisible();
    await page.getByRole("button", { name: "Confirmar" }).click()
    await expect(
      page.getByText("Atualização finalizada com sucesso!").last()
    ).toBeVisible();
  });

  test("adds new registration", async ({ page }) => {
    await page.goto("http://localhost:3001/");

    await page.getByRole("button", { name: "Nova Admissão" }).click()
    
    await page.getByRole("textbox", {name: "Nome"}).fill("Teste")
    await page.getByRole("textbox", {name: "Email"}).fill("teste@gmail.com")
    await page.getByRole("textbox", {name: "CPF"}).fill("11111111111")
    await page.getByRole("textbox", {name: "Data de admissão"}).fill("2025-11-11", {force: true})

    await page.getByRole("button", {name: "Cadastrar"}).click()

    expect(page.getByText("Nome inválido")).toBeVisible();
    expect(page.getByText("CPF inválido")).toBeVisible();

    await page.getByRole("textbox", {name: "Nome"}).fill("Teste Teste")
    await page.getByRole("textbox", {name: "CPF"}).fill("561.804.480-35")

    await page.getByRole("button", {name: "Cadastrar"}).click()

    expect(page).toHaveURL("http://localhost:3001/#/dashboard");
  });
});
