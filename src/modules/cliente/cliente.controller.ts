import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { CriarClienteDto } from "./dtos/criar-cliente.dto";
import { ClienteService } from "./cliente.service";
import { Publico } from "../auth/auth.guard";
import { IdDTO } from "src/common/decorators/id.dto";
import { Perfil } from "src/common/decorators/perfil.decorator";
import { ETipoAcesso } from "src/types/auth/tipo-acesso.enum";

@Controller("/cliente")
@ApiTags("Cliente")
export class ClienteController
{
    constructor(
        private readonly service: ClienteService
    ){}

    @Get("/:id")
    @ApiOperation({summary: "Busca um cliente pelo Id"})
    @ApiBearerAuth()
    @ApiParam({name: 'id', type: Number, required:true})
    async buscarPorId(@Param() param: IdDTO)
    {

    }

    @Get('/all')
    @ApiOperation({summary: "Busca todos os clientes"})
    @ApiBearerAuth()
    @Perfil(ETipoAcesso.USUARIO)
    async buscarTodos()
    {

    }

    @Post('/')
    @ApiOperation({summary: "Cria um novo cliente"})
    @Publico()
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
    @ApiBearerAuth()
    @ApiParam({name: 'id', type: Number, required:true})
    @Perfil(ETipoAcesso.CLIENTE)
    async atualizar(@Param() param: IdDTO)
    {

    }

    @Delete('/:id')
    @ApiOperation({summary: "Deleta um cliente pelo id"})
    @ApiBearerAuth()
    @ApiParam({name: 'id', type: Number, required:true})
    @Perfil(ETipoAcesso.CLIENTE)
    async deletar(@Param() param: IdDTO)
    {

    }
}