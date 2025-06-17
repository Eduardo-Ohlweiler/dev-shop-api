import { Controller, Delete, Head, HttpStatus, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@Controller('/auth')
@ApiTags("Autenticação")
export class AuthController
{
    @Head('/')
    @ApiOperation({
        summary:     "Valida a autenticação",
        description: "Rota para ping"
    })
    auth(){
        return HttpStatus.OK;
    }

    @Post('/login')
    @ApiOperation({
        summary:"Realiza a autenticação.", 
        description: "Rota responsavel pela autenticação do sistema, retornaum token JWT."})
    async login(){}

    @Delete('/logout')
    @ApiOperation({
        summary: "Realiza o logout", 
        description: "Rota responsavel pelo logout do sistema"})
    async logout(){}
}