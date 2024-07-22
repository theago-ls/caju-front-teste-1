import { ButtonSmall } from "~/components";

import * as S from "./styles";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";
import { STATUS } from "~/utils";

type Props = {
  data: Registration;
  onUpdate: (registration: Registration, action: STATUS) => void;
  onDelete: (registrationID: string) => void;
};

const RegistrationCard = (props: Props) => {
  return (
    <S.Card>
      <S.IconAndText>
        <HiOutlineUser />
        <h3>{props.data.employeeName}</h3>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineMail />
        <p>{props.data.email}</p>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineCalendar />
        <span>{props.data.admissionDate}</span>
      </S.IconAndText>
      <S.Actions>
        {props.data.status === "REVIEW" && (
          <ButtonSmall
            bgcolor="rgb(255, 145, 154)"
            onClick={() => props.onUpdate(props.data, STATUS.REPROVED)}
          >
            Reprovar
          </ButtonSmall>
        )}

        {props.data.status === "REVIEW" && (
          <ButtonSmall
            bgcolor="rgb(155, 229, 155)"
            onClick={() => props.onUpdate(props.data, STATUS.APPROVED)}
          >
            Aprovar
          </ButtonSmall>
        )}

        {props.data.status !== "REVIEW" && (
          <ButtonSmall
            bgcolor="#ff8858"
            onClick={() => props.onUpdate(props.data, STATUS.REVIEW)}
          >
            Revisar novamente
          </ButtonSmall>
        )}

        <HiOutlineTrash onClick={() => props.onDelete(props.data.id)} />
      </S.Actions>
    </S.Card>
  );
};

export default RegistrationCard;
