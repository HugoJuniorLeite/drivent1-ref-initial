export type ApplicationError = {
  name: string;
  message: string;
};

export type ViaCEPAddress = {
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
};

export type RequestError = {
  status: number;
  data: object | null;
  statusText: string;
  name: string;
  message: string;
};

export type Cep = {
  cep: string;
};

export type Body = {
  name?: string;
  cpf?: string;
  birthday?: string;
  phone?: string;

  cep?: string;
  street?: string;
  city?: string;
  number?: string;
  state?: string;
  neighborhood?: string;
  addressDetail?: string;
};
