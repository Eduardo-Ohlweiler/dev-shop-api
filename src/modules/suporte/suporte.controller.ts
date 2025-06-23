import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Perfil } from "src/common/decorators/perfil.decorator";
import { ETipoAcesso } from "src/types/auth/tipo-acesso.enum";

@Controller("/suporte")
@ApiTags("Suporte")
@ApiBearerAuth()
export class SuporteController
{
    @Get('/id/:id')
    @ApiOperation({summary: 'Buscar usuario suporte pelo id'})
    async buscarPorId(){}

    @Get('/all')
    @Perfil(ETipoAcesso.USUARIO)
    @ApiOperation({summary: 'Buscar todos os usuario suporte'})
    async buscarTodos(){}

    @Post('/')
    @Perfil(ETipoAcesso.USUARIO)
    @ApiOperation({summary: 'Cria um novo usuario suporte'})
    async criar(){}
    
    @Patch('/:id')
    @Perfil(ETipoAcesso.USUARIO)
    @ApiOperation({summary: 'Atualiza o usuario suporte pelo id'})
    async atualizar(){}

    @Delete('/:id')
    @Perfil(ETipoAcesso.USUARIO)
    @ApiOperation({summary: 'Deleta o usuario suporte pelo id'})
    async deletar(){}
}