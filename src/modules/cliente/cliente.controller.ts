import { Body, Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CriarClienteDto } from "./dtos/criar-cliente.dto";
import { ClienteService } from "./cliente.service";

@Controller("/cliente")
@ApiTags("Cliente")
export class ClienteController
{
    constructor(
        private readonly service: ClienteService
    ){}

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
    async criar(@Body() dto: CriarClienteDto)
    {
        const cliente = await this.service.criar(dto);
        return {
            mensagem: 'Cliente cadastrado com sucesso',
            cliente
        }
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