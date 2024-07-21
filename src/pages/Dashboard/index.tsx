import { useQuery } from "@tanstack/react-query";

import * as S from "./styles";
import Collumns from "./components/Columns";
import { SearchBar } from "./components/Searchbar";
import { getRegistrations } from "~/services";
import { useState } from "react";
import { LoadingSpinner } from "~/components";

const DashboardPage = () => {
  const [cpfSearchQuery, setCpfSearchQuery] = useState("");

  const { data, isError, isLoading } = useQuery({
    queryKey: ["registrations", cpfSearchQuery],
    queryFn: () => getRegistrations(cpfSearchQuery),
  });

  if (isError) {
    return (
      <h3>
        Ocorreu um erro ao buscar os registros. Favor, tente novamente mais
        tarde.
      </h3>
    );
  }

  return (
    <S.Container>
      {isLoading ? (
        <S.LoadingContainer>
          <LoadingSpinner />{" "}
        </S.LoadingContainer>
      ) : (
        <Collumns registrations={data} />
      )}
    </S.Container>
  );
};

export default DashboardPage;
