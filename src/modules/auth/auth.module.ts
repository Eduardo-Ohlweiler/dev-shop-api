import { Logger, Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { ClienteModule } from "../cliente/cliente.modulo";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
    imports:[
        ClienteModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject:  [ConfigService],
            useFactory:(config:ConfigService) => {
                const logger: Logger = new Logger(AuthModule.name);
                const secret = config.get<string>("JWT_SECRET");

                if(!secret){
                    logger.error('Variavel de ambiente nao configurada');
                    process.exit(1);
                }
                return {
                    global: true,
                    secret,
                    signOptions: {expiresIn: '24h'}
                }
            }
        })
    ],
    controllers: [AuthController],
    providers:   [AuthService],
    exports:     [AuthService]
})
export class AuthModule 
{
    
}