import { Injectable } from "@nestjs/common";
import { CriarClienteDto } from "./dtos/criar-cliente.dto";

@Injectable()
export class ClienteService
{
    async criar (dto: CriarClienteDto){}
}