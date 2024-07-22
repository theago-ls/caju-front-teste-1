import RegistrationCard from ".";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { faker } from "@faker-js/faker";
import { STATUS } from "~/utils";

describe("TextField", () => {
  it("should render with the correct values", () => {
    const props = {
      data: {
        employeeName: faker.person.fullName(),
        email: faker.internet.email(),
        admissionDate: faker.date.birthdate().toUTCString(),
        status: faker.helpers.arrayElement([
          STATUS.APPROVED,
          STATUS.REPROVED,
          STATUS.REVIEW,
        ]),
        cpf: faker.finance.accountNumber(),
        id: faker.database.mongodbObjectId(),
      },
      onUpdate: jest.fn(),
      onDelete: jest.fn(),
    };

    render(<RegistrationCard {...props} />);

    expect(screen.getByText(props.data.employeeName)).toBeInTheDocument();
    expect(screen.getByText(props.data.email)).toBeInTheDocument();
    expect(screen.getByText(props.data.admissionDate)).toBeInTheDocument();

    if (props.data.status === "REVIEW") {
      expect(
        screen.getByRole("button", { name: "Aprovar" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Reprovar" })
      ).toBeInTheDocument();
    }

    if (props.data.status !== "REVIEW") {
      expect(
        screen.getByRole("button", { name: "Revisar novamente" })
      ).toBeInTheDocument();
    }
  });
});
