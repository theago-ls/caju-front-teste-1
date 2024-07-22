import type { ChangeEvent } from "react";
import { useState } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import { z } from "zod";

import * as S from "./styles";
import { Button, IconButton, TextField } from "~/components";
import routes from "~/router/routes";
import { masks, STATUS, validator } from "~/utils";
import { useMutation } from "@tanstack/react-query";
import { createRegistration } from "~/services";
import toast from "react-hot-toast";

const newUserSchema = z.object({
  admissionDate: z
    .string()
    .min(1, { message: "Data de admissão é obrigatória!" })
    .date("Data inválida!"),
  email: z.string().min(1, { message: "E-mail é obrigatório!" }),
  employeeName: z
    .string()
    .min(1, { message: "Nome é obrigatório!" })
    .refine((val) => val.includes(" ") && val.length > 2 && /\D/.test(val[0]), {
      message:
        "Nome inválido! É necessário que o nome tenha ao menos duas letras separadas por espaço, e que a primeira letra não seja um número.",
    }),
  cpf: z
    .string()
    .min(1, { message: "CPF é obrigatório!" })
    .refine((val) => validator.cpf(val), { message: "CPF inválido!" }),
});

const NewUserPage = () => {
  const history = useHistory();
  const goToHome = () => {
    history.push(routes.dashboard);
  };

  const { mutate: createRegistrationRequest } = useMutation({
    mutationFn: createRegistration,
    onSuccess: () => {
      toast("Cadastro finalizado com sucesso!", { icon: "✅" });
      goToHome();
    },
    onError: () =>
      toast(
        "Ops, infelizmente ocorreu um erro ao excluir registro.  Tente novamente mais tarde."
      ),
  });

  const [cpf, setCPF] = useState("");
  const [errors, setErrors] = useState<{
    admissionDate?: string[];
    email?: string[];
    employeeName?: string[];
    cpf?: string[];
  }>({});

  const handleRegister = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const elements = new FormData(e.currentTarget);

    const newRegistration = {
      employeeName: elements.get("employeeName")?.toString() ?? "",
      email: elements.get("email")?.toString() ?? "",
      cpf: elements.get("cpf")?.toString() ?? "",
      admissionDate: elements.get("admissionDate")?.toString() ?? "",
    };

    const result = newUserSchema.safeParse(newRegistration);

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
    } else {
      setErrors({});
      createRegistrationRequest({
        ...newRegistration,
        admissionDate: new Date(
          newRegistration.admissionDate
        ).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          timeZone: "UTC",
        }),
        status: STATUS.REVIEW,
      });
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <S.Container>
        <S.Card>
          <IconButton onClick={() => goToHome()} aria-label="back">
            <HiOutlineArrowLeft size={24} />
          </IconButton>
          <TextField
            name="employeeName"
            placeholder="Nome"
            label="Nome"
            error={errors.employeeName && errors?.employeeName[0]}
          />
          <TextField
            name="email"
            placeholder="Email"
            label="Email"
            type="email"
            error={errors.email && errors?.email[0]}
          />
          <TextField
            name="cpf"
            placeholder="CPF"
            label="CPF"
            value={masks.cpf(cpf)}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCPF(e.target.value)
            }
            error={errors.cpf && errors?.cpf[0]}
          />
          <TextField
            name="admissionDate"
            label="Data de admissão"
            type="date"
            error={errors.admissionDate && errors?.admissionDate[0]}
          />
          <Button type="submit">Cadastrar</Button>
        </S.Card>
      </S.Container>
    </form>
  );
};

export default NewUserPage;
