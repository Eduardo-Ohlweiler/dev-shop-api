import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { CriarClienteDto } from "./dtos/criar-cliente.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Cliente } from "./cliente.entity";
import { Repository } from "typeorm";
import * as bcripty from "bcrypt";

@Injectable()
export class ClienteService
{
    constructor(
        @InjectRepository(Cliente)
        private readonly repository: Repository<Cliente>
    ){}

    async criar (dto: CriarClienteDto){
        const existente = await this.repository.findOne({
            where: [
                {cpf_cnpj: dto.cpf_cnpj},
                {email:    dto.email}
            ]
        })

        if (existente)
        {
            if(dto.cpf_cnpj === existente.cpf_cnpj) 
                throw new ConflictException('Já existe um cadastro com esse cpf/cnpj');
            if(dto.email === existente.email) 
                throw new ConflictException('Já existe um cadastro com esse email, verifique');
        }

        const salt = await bcripty.genSalt(13);
        const hash = await bcripty.hash(dto.senha, salt);

        const cliente = this.repository.create({
            ...dto,
            senha: hash
        })

        const {senha: _, email: __, cpf_cnpj: ___, ...cliente_db} = await this.repository.save(cliente);
        return cliente_db;
    }

    async bucarPorEmail(email: string){
        const cliente = await this.repository.findOne({
            where: {
                email
            },
            select: {
                id: true,
                senha: true
            }
        })

        if(!cliente) throw new NotFoundException("Nenhum cliente encontrado");

        return cliente;
    }
}