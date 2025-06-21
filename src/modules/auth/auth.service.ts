import { BadGatewayException, BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { ClienteService } from "../cliente/cliente.service";
import { JwtService } from "@nestjs/jwt";
import { LoginDTO } from "./dtos/login.dto";
import { ETipoAcesso } from "src/types/auth/tipo-acesso.enum";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService
{
    constructor(
        private readonly clienteService: ClienteService     ,
        private readonly jwtService: JwtService 
    ){}

    async login(dto: LoginDTO)
    {
        let response: { id: number, senha: string } | undefined;

        switch(dto.tipo){
            case ETipoAcesso.USUARIO:
                break;
            case ETipoAcesso.CLIENTE:
            {
                const cliente = await this.clienteService.bucarPorEmail(dto.identificador);
                response = {
                    id:    cliente.id,
                    senha: cliente.senha
                }
                break;
            }
        }
        if(!response) throw new BadRequestException();

        const match = await bcrypt.compare(dto.senha,response?.senha)
        if(!match)
            throw new UnauthorizedException("Credenciais invalidas");

        const payload = {tipo: dto.tipo, id: response.id};
        const token   = this.jwtService.sign(payload);
        return token;
    }
    async logout(){}
}