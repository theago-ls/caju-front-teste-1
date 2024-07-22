import { useMutation, useQuery } from "@tanstack/react-query";

import * as S from "./styles";
import Collumns from "./components/Columns";
import { SearchBar } from "./components/Searchbar";
import {
  deleteRegistration,
  getRegistrations,
  updateRegistration,
} from "~/services";
import { useState } from "react";
import { LoadingSpinner } from "~/components";
import { debounce, STATUS } from "~/utils";
import toast from "react-hot-toast";
import { useModal } from "~/hooks";

const DashboardPage = () => {
  const [cpfSearchQuery, setCpfSearchQuery] = useState("");

  const {
    data: registrations,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["registrations", cpfSearchQuery],
    queryFn: () => getRegistrations(cpfSearchQuery),
  });

  const { showModal } = useModal();

  const { mutate: requestRegistrationUpdate } = useMutation({
    mutationFn: updateRegistration,
    onSuccess: () => {
      toast("Atualização finalizada com sucesso!", { icon: "✅" });
      refetch();
    },
    onError: () =>
      toast(
        "Ops, infelizmente ocorreu um erro ao atualizar registro. Tente novamente mais tarde.",
        { icon: "🙁" }
      ),
  });

  const { mutate: requestRegistrationDeletion } = useMutation({
    mutationFn: deleteRegistration,
    onSuccess: () => {
      toast("Exclusão finalizada com sucesso!", { icon: "🗑️" });
      refetch();
    },
    onError: () =>
      toast(
        "Ops, infelizmente ocorreu um erro ao excluir registro.  Tente novamente mais tarde."
      ),
  });

  if (isError) {
    return (
      <h3>
        Ocorreu um erro ao buscar os registros. Favor, tente novamente mais
        tarde.
      </h3>
    );
  }

  const handleCPFChange = debounce(
    (value: string) => setCpfSearchQuery(value),
    700
  );

  const handleUpdate = (registration: Registration, status: STATUS) => {
    let message = "Você tem certeza que deseja";

    if (status === STATUS.APPROVED) {
      message += " aprovar ";
    } else if (status === STATUS.REPROVED) {
      message += " reprovar ";
    } else {
      message += " revisar novamente ";
    }

    message += `o registro de ${registration.employeeName}?`;

    showModal({
      message,
      onConfirm: () =>
        requestRegistrationUpdate({
          ...registration,
          status,
        }),
    });
  };

  const handleDelete = (registrationID: string) => {
    const message = `Você tem certeza que deseja excluir o registro de ${
      registrations?.find((reg) => reg.id === registrationID)!.employeeName
    }?`;

    showModal({
      message,
      onConfirm: () => requestRegistrationDeletion(registrationID),
    });
  };

  const handleRefreshClick = () => {
    showModal({
      message: "Você tem certeza que deseja recarregar a lista de registros?",
      onConfirm: refetch,
    });
  };

  return (
    <S.Container>
      <SearchBar
        onChange={handleCPFChange}
        onRefreshClick={handleRefreshClick}
      />
      {isLoading ? (
        <S.LoadingContainer>
          <LoadingSpinner />{" "}
        </S.LoadingContainer>
      ) : (
        <Collumns
          registrations={registrations}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}
    </S.Container>
  );
};

export default DashboardPage;
