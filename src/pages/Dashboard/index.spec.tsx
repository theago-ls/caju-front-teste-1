import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Dashboard from ".";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const pushMock = jest.fn();

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: pushMock,
  }),
}));

const server = setupServer(
  rest.get("http://localhost:3000/registrations", (_, res, ctx) => {
    return res(
      ctx.json([
        {
          admissionDate: "22/10/2023",
          email: "luiz@caju.com.br",
          employeeName: "Luiz Filho",
          status: "APPROVED",
          cpf: "56642105087",
          id: "3",
        },
        {
          id: "1",
          admissionDate: "22/10/2023",
          email: "filipe@caju.com.br",
          employeeName: "Filipe Marins",
          status: "REVIEW",
          cpf: "78502270001",
        },
        {
          id: "2",
          admissionDate: "22/10/2023",
          email: "jose@caju.com.br",
          employeeName: "José Leão",
          status: "REPROVED",
          cpf: "78502270001",
        },
      ])
    );
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
        <Dashboard />
      </QueryClientProvider>
    );
  });

  it("should render with the correct values", async () => {
    expect(await screen.findByText(/Pronto para revisar/)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Digite um CPF válido")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "refetch" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Nova Admissão" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Aprovado" })
    ).toBeInTheDocument();
    expect(screen.getByText("Reprovado")).toBeInTheDocument();
    expect(screen.getByText("Filipe Marins")).toBeInTheDocument();
    expect(screen.getByText("Luiz Filho")).toBeInTheDocument();
    expect(screen.getByText("José Leão")).toBeInTheDocument();
  });
});
