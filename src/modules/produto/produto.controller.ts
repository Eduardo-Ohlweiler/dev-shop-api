import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Publico } from '../auth/auth.guard';

@Controller('/produto')
@ApiTags("Produto")
export class ProdutoController 
{
    @Get('/:id')
    @ApiOperation({summary: "Buscar um produto por id"})
    @Publico()
    async buscarPorId(){}

    @Get('/all')
    @ApiOperation({summary: "Buscar todos os produtos"})
    @Publico()
    async buscarTodos(){}

    @Post('/')
    @ApiOperation({summary: "Cria um novo produto"})
    @ApiBearerAuth()
    async criar(){}

    @Patch('/:id')
    @ApiOperation({summary: "Atualiza um produto pelo id"})
    @ApiBearerAuth()
    async atualizar(){}

    @Delete('/:id')
    @ApiOperation({summary: "Deleta um produto pelo id"})
    @ApiBearerAuth()
    async deletar(){}
}
