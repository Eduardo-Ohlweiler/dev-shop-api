import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@Controller("/cliente")
@ApiTags("Cliente")
export class ClienteController
{
    @Get("/id/:id")
    @ApiOperation({summary: "Busca um cliente pelo Id"})
    async buscarPorId()
    {

    }

    @Get("/email/:email")
    @ApiOperation({summary: "Busca um cliente pelo email"})
    async buscarPorEmail()
    {

    }

    @Get('/all')
    @ApiOperation({summary: "Busca todos os clientes"})
    async buscarTodos()
    {

    }

    @Post('/')
    @ApiOperation({summary: "Cria um novo cliente"})
    async criar()
    {

    }

    @Patch('/:id')
    @ApiOperation({summary: "Atualiza um cliente por id"})
    async atualizar()
    {

    }

    @Delete('/:id')
    @ApiOperation({summary: "Deleta um cliente pelo id"})
    async deletar()
    {

    }
}