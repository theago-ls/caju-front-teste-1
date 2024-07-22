import { ModalContext, ModalProvider } from ".";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { useContext } from "react";
import { faker } from "@faker-js/faker";

const TestComponent = ({
  message,
  onConfirm,
  onCancel,
}: {
  message: string;
  onConfirm: jest.Mock;
  onCancel: jest.Mock;
}) => {
  const { showModal, modalInfo } = useContext(ModalContext);

  return (
    <div>
      <button onClick={() => showModal({ message, onConfirm, onCancel })}>
        showModal
      </button>

      <p>{JSON.stringify(modalInfo, null, 2)}</p>
      {modalInfo.showModal && (
        <>
          <button onClick={() => onConfirm()}>onConfirm</button>
          <button onClick={() => onCancel()}>onCancel</button>
        </>
      )}
    </div>
  );
};

describe("ModalProvider", () => {
  it("should set modalInfo when showModal is called", async () => {
    const props = {
      message: faker.word.words(),
      onConfirm: jest.fn(),
      onCancel: jest.fn(),
    };

    render(
      <ModalProvider>
        <TestComponent {...props} />
      </ModalProvider>
    );

    const showModalBtn = screen.getByText("showModal");

    userEvent.click(showModalBtn);

    const onConfirmBtn = await screen.findByText("onConfirm");
    const onCancelBtn = await screen.findByText("onCancel");

    await userEvent.click(onConfirmBtn);
    await userEvent.click(onCancelBtn);

    expect(screen.getByText(new RegExp(props.message))).toBeInTheDocument();
    expect(props.onConfirm).toHaveBeenCalled();
    expect(props.onCancel).toHaveBeenCalled();
  });
});
