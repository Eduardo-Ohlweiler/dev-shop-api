import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { CriarClienteDto } from "./dtos/criar-cliente.dto";
import { ClienteService } from "./cliente.service";
import { Publico } from "../auth/auth.guard";
import { IdDTO } from "src/common/dtos/id.dto";
import { Perfil } from "src/modules/auth/perfil.guard";
import { ETipoAcesso } from "src/types/auth/tipo-acesso.enum";
import { Auth } from "src/common/decorators/auth.decorator";
import { AtuaizarClienteDto } from "./dtos/atualizar-cliente.dto";
import { IAuth } from "src/types/auth/auth.interface";

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
        return await this.service.buscarPorId(param.id)
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
            data: cliente
        }
    }

    @Patch('/')
    @ApiOperation({summary: "Atualiza um cliente por id"})
    @ApiBearerAuth()
    @Perfil(ETipoAcesso.CLIENTE)
    async atualizar(@Auth() auth: IAuth,@Body() dto: AtuaizarClienteDto)
    {
        const cliente = await this.service.atualizar(auth.id, dto)
        return{
            mensagem: `Cliente '${cliente.id}' atualizado com sucesso`, data: cliente
        }
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