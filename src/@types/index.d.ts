enum STATUS {
  "APROVED",
  "REVIEW",
  "REPROVED"
}

type Registration = {
  id: string;
  admissionDate: string;
  email: string;
  employeeName: string;
  status: STATUS;
  cpf: string;
}