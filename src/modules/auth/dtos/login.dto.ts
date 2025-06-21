import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { ILogin } from "src/types/auth/auth.interface";
import { ETipoAcesso } from "src/types/auth/tipo-acesso.enum";

export class LoginDTO implements ILogin{

    @IsEnum({message: `O campo 'tipo' deve ser: ${Object.values(ETipoAcesso).join(',')}.`})
    @IsNotEmpty({message: "O campo 'tipo' é preenchimento obrigatório"})
    @ApiProperty({description: "Define qual sera o tipo de acesso utilizado"})
    tipo: ETipoAcesso;

    @IsString({message: "O campo 'identificador' deve ser uma string"})
    @IsNotEmpty({message: "O campo 'identificador' é preenchimento obrigatório"})
    @ApiProperty({description: "O identificador do usuario/cliente"})
    identificador: string;

    @IsString({message: "O campo 'senha' deve ser uma string"})
    @IsString({message: "O campo 'senha' é preenchimento obrigatório"})
    @ApiProperty({description: "Senha do usuario/cliente"})
    senha: string;
}