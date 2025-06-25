import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class CriarSuporteDTO{
    @IsString({message: "O campo nome é obrigatório."})
    @ApiProperty()
    nome:      string;
    @IsEmail({}, {message: "O email informado deve ser valido"})
    @ApiProperty()
    email:     string;
    @IsStrongPassword({
        minLength:      8,
        minNumbers:     1,
        minLowercase:   1,
        minUppercase:   1
    }, {message: "A senha deve conter no minimo 8 caracteres, 1 letra e 1 número, minusculos e maiusculos"})
    @ApiProperty()
    senha:     string;
}