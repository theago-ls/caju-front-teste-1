import { TextField } from ".";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { faker } from "@faker-js/faker";

describe("TextField", () => {
  it("should render with the correct values", () => {
    const props = {
      label: faker.word.words(),
      error: "",
    };

    render(<TextField {...props} />);

    expect(screen.getByText(props.label)).toBeInTheDocument();
  });

  it("should render the error message when is passed", () => {
    const props = {
      label: faker.word.words(),
      error: faker.word.words(),
    };

    render(<TextField {...props} />);

    expect(screen.getByText(props.error)).toBeInTheDocument();
  });
});
