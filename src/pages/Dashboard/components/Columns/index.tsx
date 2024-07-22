import * as S from "./styles";
import RegistrationCard from "../RegistrationCard";
import { STATUS } from "~/utils";

const allColumns = [
  { status: "REVIEW", title: "Pronto para revisar" },
  { status: "APPROVED", title: "Aprovado" },
  { status: "REPROVED", title: "Reprovado" },
];

type Props = {
  registrations?: Registration[];
  onUpdate: (registration: Registration, status: STATUS) => void;
  onDelete: (registrationID: string) => void;
};

const Collumns = (props: Props) => {
  return (
    <S.Container>
      {allColumns.map((collumn) => {
        return (
          <S.Column status={collumn.status} key={collumn.title}>
            <>
              <S.TitleColumn status={collumn.status}>
                {collumn.title}
              </S.TitleColumn>
              <S.CollumContent>
                {props?.registrations
                  ?.filter(
                    (registration) => registration.status === collumn.status
                  )
                  .map((registration) => {
                    return (
                      <RegistrationCard
                        data={registration}
                        onUpdate={props.onUpdate}
                        onDelete={props.onDelete}
                        key={registration.id}
                      />
                    );
                  })}
              </S.CollumContent>
            </>
          </S.Column>
        );
      })}
    </S.Container>
  );
};

export default Collumns;
