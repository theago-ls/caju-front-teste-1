import { useContext } from "react";
import { ModalContext } from "~/contexts";

export default function useModal() {
  const modalContext = useContext(ModalContext)

  return modalContext
}
