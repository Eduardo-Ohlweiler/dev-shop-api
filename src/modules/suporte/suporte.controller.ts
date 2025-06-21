import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";

@Controller("/suporte")
@ApiTags("Suporte")
@ApiBearerAuth()
export class SuporteController
{
    @Get('/id/:id')
    @ApiOperation({summary: 'Buscar usuario suporte pelo id'})
    async buscarPorId(){}

    @Get('/all')
    @ApiOperation({summary: 'Buscar todos os usuario suporte'})
    async buscarTodos(){}

    @Post('/')
    @ApiOperation({summary: 'Cria um novo usuario suporte'})
    async criar(){}
    
    @Patch('/:id')
    @ApiOperation({summary: 'Atualiza o usuario suporte pelo id'})
    async atualizar(){}

    @Delete('/:id')
    @ApiOperation({summary: 'Deleta o usuario suporte pelo id'})
    async deletar(){}
}