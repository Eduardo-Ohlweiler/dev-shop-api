
export interface ICliente
{
    nome:           string;
    email:          string;
    cpf  :          string;
    senha:          string;
    criado_em:      Date;
    atualizado_em:  Date;
}

export type ICriarCliente = Pick<ICliente, "nome" | "email" | "cpf" | "senha">