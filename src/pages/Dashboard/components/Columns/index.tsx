import * as S from "./styles";
import RegistrationCard from "../RegistrationCard";

const allColumns = [
  { status: "REVIEW" as keyof typeof STATUS, title: "Pronto para revisar" },
  { status: "APPROVED" as keyof typeof STATUS, title: "Aprovado" },
  { status: "REPROVED" as keyof typeof STATUS, title: "Reprovado" },
];

type Props = {
  registrations?: Registration[];
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
