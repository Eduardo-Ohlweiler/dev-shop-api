import { ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { CriarSuporteDTO } from "./criar-suporte.dto";
import { IsBoolean, IsOptional } from "class-validator";

export class AtuaizarSuporteDto extends PartialType(CriarSuporteDTO){
    @IsOptional()
    @IsBoolean({message: "O campo ativo deve ser um boolean"})
    @ApiPropertyOptional()
    ativo?: boolean;
}