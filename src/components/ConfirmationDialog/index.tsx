import { ButtonSmall } from "~/components";

import * as S from "./styles";
import useModal from "~/hooks/useModal";

const ConfirmationDialog = () => {
  const { modalInfo, resetModal } = useModal();

  return (
    modalInfo.showModal && (
      <S.ModalContainer>
        <S.Modal>
          <S.IconAndText>
            <h3>Atenção!</h3>
          </S.IconAndText>

          <S.Text>{modalInfo.message}</S.Text>

          <S.Actions>
            <ButtonSmall
              bgcolor="rgb(255, 145, 154)"
              onClick={() => {
                if (modalInfo.onCancel) {
                  modalInfo.onCancel();
                }
                resetModal();
              }}
            >
              Cancelar
            </ButtonSmall>
            <ButtonSmall
              bgcolor="rgb(155, 229, 155)"
              onClick={() => {
                modalInfo.onConfirm();
                resetModal();
              }}
            >
              Confirmar
            </ButtonSmall>
          </S.Actions>
        </S.Modal>
      </S.ModalContainer>
    )
  );
};

export default ConfirmationDialog;
