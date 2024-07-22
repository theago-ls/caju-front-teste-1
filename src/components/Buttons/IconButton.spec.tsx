import { IconButton } from "./IconButton";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { faker } from "@faker-js/faker";

describe("IconButton", () => {
  it("should render the children as expected", () => {
    const labelBtn = faker.word.verb();
    render(
      <IconButton>
        <p>{labelBtn}</p>
      </IconButton>
    );

    expect(screen.getByText(labelBtn)).toBeInTheDocument();
  });
});
