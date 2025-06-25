import { ConflictException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Suporte } from "./suporte.entity";
import * as bcrypt from "bcrypt"
import { ConfigService } from "@nestjs/config";
import { CriarSuporteDTO } from "./dtos/criar-suporte.dto";
import { AtuaizarSuporteDto } from "./dtos/atualizar-suporte.dto";

@Injectable()
export class SuporteService{
    private readonly logger = new Logger(SuporteService.name);

    constructor(
        private readonly config:ConfigService,
        @InjectRepository(Suporte)
        private readonly repository: Repository<Suporte>
    ){}

    private async hash(data: string){
        const salt = await bcrypt.genSalt(14);        
        return await bcrypt.hash(data, salt)
    }

    async onModuleInit(){
        const email = this.config.get<string>("SUPORTE_EMAIL");
        const senha = this.config.get<string>("SUPORTE_SENHA");

        if(!email || !senha){
            this.logger.error("Verifique as variaveis de ambiente 'SUPORTE_EMAIL' e 'SUPORTE_SENHA'!")
            process.exit(1);
        }

        const qtd = await this.repository.count();

        if(qtd === 0){
            const suporte = this.repository.create({
                nome: "suporte",
                email,
                senha: await this.hash(senha)
            })

            await this.repository.save(suporte);
            this.logger.log("Usuario suporte criado com sucesso")
        }
    }

    async buscarPorEmail(email: string){
        const suporte = await this.repository.findOne({
            where: { email},
            select:{ id: true, senha: true, ativo: true }
        })

        if(!suporte) throw new NotFoundException('Usuario nao encontrado')
        
            return suporte
    }

    async buscarPorId(id: number){
        const suporte = await this.repository.findOne({
            where: { id }
        })

        if(!suporte) throw new NotFoundException('Usuario nao encontrado')
        
            return suporte
    }

    async criar(dto: CriarSuporteDTO)
    {
        const existente = await this.repository.findOne(
        {
            where: [
                {email:    dto.email}
            ]
        })

        if (existente)
        {
            if(dto.email === existente.email) 
                throw new ConflictException('Já existe um cadastro com esse email, verifique');
        }

        const hash = await this.hash(dto.senha);

        const cliente = this.repository.create({
            ...dto,
            senha: hash
        })
    
            const {senha: _, email: __, ...cliente_db} = await this.repository.save(cliente);
            return cliente_db;
    }

    async atualizar (id:number, dto: AtuaizarSuporteDto) {
        const cliente = await this.buscarPorId(id);

        if((dto.email && dto.email !== cliente.email)){
            const existente = await this.repository.findOne({
                where: [
                    { email   : dto.email},
                ]
            })

            if(existente) throw new ConflictException("Ja existe um cadastro com esse email");
        }
        if(dto.senha){
            dto.senha = await this.hash(dto.senha);
        }

        await this.repository.update({id: cliente.id},{
            ...dto
        })

        return await this.buscarPorId(cliente.id);
    }

    async deletar(id: number){}
}