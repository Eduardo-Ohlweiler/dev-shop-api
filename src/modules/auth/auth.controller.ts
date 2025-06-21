import { Body, Controller, Delete, Head, HttpStatus, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { LoginDTO } from "./dtos/login.dto";
import { AuthService } from "./auth.service";
import { Publico } from "./auth.guard";

@Controller('/auth')
@ApiTags("Autenticação")
export class AuthController
{
    constructor(
        private readonly service: AuthService
    ){}

    @ApiBearerAuth()
    @Head('/')
    @ApiOperation({
        summary:     "Valida a autenticação",
        description: "Rota para ping"
    })
    auth(){
        return HttpStatus.OK;
    }

    @ApiBearerAuth()
    @Post('/login')
    @ApiOperation({
        summary:"Realiza a autenticação.", 
        description: "Rota responsavel pela autenticação do sistema, retornaum token JWT."
    })
    @Publico()
    async login(@Body() dto: LoginDTO){
        const token = await this.service.login(dto);
        return{
            mensagem: "Login realizado com sucesso",
            token
        }
    }

    @Delete('/logout')
    @ApiOperation({
        summary: "Realiza o logout", 
        description: "Rota responsavel pelo logout do sistema"})
    async logout(){}
}