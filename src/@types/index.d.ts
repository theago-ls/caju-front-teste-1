enum STATUS {
  "APPROVED",
  "REVIEW",
  "REPROVED"
}

type Registration = {
  id: string;
  admissionDate: string;
  email: string;
  employeeName: string;
  status: keyof typeof STATUS;
  cpf: string;
}