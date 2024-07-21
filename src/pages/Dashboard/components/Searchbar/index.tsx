import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";

import { IconButton, Button, TextField } from "~/components";
import routes from "~/router/routes";
import * as S from "./styles";
import { useState } from "react";
import { masks } from "~/utils";

type SearchBarProps = {
  onChange: (value: string) => void;
};

export const SearchBar = ({ onChange }: SearchBarProps) => {
  const [value, setValue] = useState("");

  const history = useHistory();

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };

  const handleChange = (value: string) => {
    setValue(value);
    onChange(value);
  };

  return (
    <S.Container>
      <TextField
        placeholder="Digite um CPF válido"
        value={masks.cpf(value)}
        onChange={(e) => handleChange(e.target.value)}
      />
      <S.Actions>
        <IconButton aria-label="refetch">
          <HiRefresh />
        </IconButton>
        <Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};
