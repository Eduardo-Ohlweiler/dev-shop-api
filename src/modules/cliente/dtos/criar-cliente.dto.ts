import { ICriarCliente } from "src/types/cliente/cliente.interface";

export class CriarClienteDto implements ICriarCliente
{
    nome:   string;
    email : string;
    cpf   : string;
    senha : string;
}