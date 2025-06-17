import { Module } from "@nestjs/common";
import { ClienteController } from "./cliente.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cliente } from "./cliente.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Cliente])
    ],
    controllers:[
        ClienteController
    ]
})
export class ClienteModule {}