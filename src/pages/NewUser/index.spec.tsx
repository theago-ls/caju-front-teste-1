import { rest } from "msw";
import { setupServer } from "msw/node";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import NewUserPage from ".";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import userEvent from "@testing-library/user-event";

const pushMock = jest.fn();

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: pushMock,
  }),
}));

const server = setupServer(
  rest.post("http://localhost:3000/registrations", (req, res, ctx) => {
    return res(ctx.json(req.json()));
  })
);

const queryClient = new QueryClient();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("NewUser", () => {
  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <NewUserPage />
      </QueryClientProvider>
    );
  });

  it("should render with the correct values", () => {
    expect(screen.getByLabelText("Nome")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("CPF")).toBeInTheDocument();
    expect(screen.getByLabelText("Data de admissão")).toBeInTheDocument();
    expect(screen.getByText("Cadastrar")).toBeEnabled();
  });

  it("should render error messages on invalid inputs", async () => {
    const nameInput = screen.getByLabelText("Nome");
    const emailInput = screen.getByLabelText("Email");
    const cpfInput = screen.getByLabelText("CPF");
    const dateInput = screen.getByLabelText("Data de admissão");
    const submitBtn = screen.getByText("Cadastrar");

    await userEvent.click(submitBtn);

    expect(
      await screen.findByText("Data de admissão é obrigatória!")
    ).toBeInTheDocument();
    expect(screen.getByText("E-mail é obrigatório!")).toBeInTheDocument();
    expect(screen.getByText("Nome é obrigatório!")).toBeInTheDocument();
    expect(screen.getByText("CPF é obrigatório!")).toBeInTheDocument();

    await userEvent.type(nameInput, "Cam");
    await userEvent.type(emailInput, "email@gmail.com");
    await userEvent.type(cpfInput, "11111111111");
    await userEvent.type(dateInput, "11");

    await userEvent.click(submitBtn);

    expect(
      await screen.findByText(
        "Nome inválido! É necessário que o nome tenha ao menos duas letras separadas por espaço, e que a primeira letra não seja um número."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText("Data de admissão é obrigatória!")
    ).toBeInTheDocument();
    expect(screen.getByText("CPF inválido!")).toBeInTheDocument();
  });

  it("should redirect on success", async () => {
    const nameInput = screen.getByLabelText("Nome");
    const emailInput = screen.getByLabelText("Email");
    const cpfInput = screen.getByLabelText("CPF");
    const dateInput = screen.getByLabelText("Data de admissão");
    const submitBtn = screen.getByText("Cadastrar");

    await userEvent.type(nameInput, "Cam Mari");
    await userEvent.type(emailInput, "email@gmail.com");
    await userEvent.type(cpfInput, "561.804.480-35");
    fireEvent.change(dateInput, { target: { value: "2021-11-11" } });

    await userEvent.click(submitBtn);

    await waitFor(() => expect(pushMock).toHaveBeenCalledWith("/dashboard"));
  });
});
