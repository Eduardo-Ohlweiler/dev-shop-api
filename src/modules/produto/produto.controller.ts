import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('/produto')
@ApiTags("Produto")
export class ProdutoController 
{
    @Get('/:id')
    @ApiOperation({summary: "Buscar um produto por id"})
    async buscarPorId(){}

    @Get('/all')
    @ApiOperation({summary: "Buscar todos os produtos"})
    async buscarTodos(){}

    @Post('/')
    @ApiOperation({summary: "Cria um novo produto"})
    async criar(){}

    @Patch('/:id')
    @ApiOperation({summary: "Atualiza um produto pelo id"})
    async atualizar(){}

    @Delete('/:id')
    @ApiOperation({summary: "Deleta um produto pelo id"})
    async deletar(){}
}
