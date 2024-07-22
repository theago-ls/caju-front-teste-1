import { createContext, useReducer } from "react";

type ModalState = {
  showModal: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const initialModalValue: ModalState = {
  showModal: false,
  message: "",
  onConfirm: () => {},
  onCancel: () => {},
};

export const ModalContext = createContext<{
  modalInfo: ModalState;
  showModal: (value: ActionPayload) => void;
  resetModal: () => void;
}>({
  modalInfo: initialModalValue,
  showModal: () => {},
  resetModal: () => {},
});

type ActionPayload = {
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
};

const modalReducer = (
  state: any,
  action:
    | {
        type: "show";
        payload: ActionPayload;
      }
    | { type: "reset" }
) => {
  switch (action.type) {
    case "show":
      if (action.payload) {
        return {
          showModal: true,
          message: action.payload.message,
          onConfirm: action.payload.onConfirm,
          onCancel: action.payload.onCancel,
        };
      }
      return state;
    case "reset":
      return { ...initialModalValue };
  }
};

type ModalProvider = {
  children: React.ReactNode;
};

export function ModalProvider({ children }: ModalProvider) {
  const [modalInfo, dispatch] = useReducer(modalReducer, initialModalValue);

  const showModal = (modalParams: ActionPayload) =>
    dispatch({ type: "show", payload: modalParams });

  const resetModal = () => dispatch({ type: "reset" });

  return (
    <ModalContext.Provider value={{ modalInfo, showModal, resetModal }}>
      {children}
    </ModalContext.Provider>
  );
}
