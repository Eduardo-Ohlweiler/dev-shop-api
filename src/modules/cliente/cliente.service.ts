import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { CriarClienteDto } from "./dtos/criar-cliente.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Cliente } from "./cliente.entity";
import { Repository } from "typeorm";
import * as bcripty from "bcrypt";
import { AtuaizarClienteDto } from "./dtos/atualizar-cliente.dto";

@Injectable()
export class ClienteService
{
    constructor(
        @InjectRepository(Cliente)
        private readonly repository: Repository<Cliente>
    ){}

    private async hash(data: string){
        const salt = await bcripty.genSalt(13);
        return await bcripty.hash(data, salt);
    }

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

        const hash = await this.hash(dto.senha);

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
                email: email.toLowerCase()
            },
            select: {
                id: true,
                senha: true
            }
        })

        if(!cliente) throw new NotFoundException("Nenhum cliente encontrado");

        return cliente;
    }

    async buscarPorId(id: number){
        const cliente = await this.repository.findOne({where: {id}})

        if(!cliente) throw new NotFoundException("Cliente não encontrado")
        return cliente;
    }

    async atualizar(id: number,  dto: AtuaizarClienteDto){
        const cliente = await this.buscarPorId(id);

        if((dto.cpf_cnpj && dto.cpf_cnpj !== cliente.cpf_cnpj) || (dto.email && dto.email !== cliente.email)){
            const existente = await this.repository.findOne({
                where: [
                    { cpf_cnpj: dto.cpf_cnpj},
                    { email   : dto.email},
                ]
            })

            if(existente){
                if(existente.cpf_cnpj === dto.cpf_cnpj) throw new ConflictException("Ja existe um cadastro com esse cpf/cnpj");
                if(existente.email === dto.email) throw new ConflictException("Ja existe um cadastro com esse email");
            }
        }
        if(dto.senha){
            dto.senha = await this.hash(dto.senha);
        }

        await this.repository.update({id: cliente.id},{
            ...dto
        })

        return await this.buscarPorId(cliente.id);
    }

    async deletar(id:number){
        const cliente = await this.buscarPorId(id);
        await this.repository.delete(cliente.id);
    }

}