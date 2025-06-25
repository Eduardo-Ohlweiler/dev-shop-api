import { Logger, Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { ClienteModule } from "../cliente/cliente.modulo";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./auth.guard";
import { PerfilGuard } from "src/modules/auth/perfil.guard";
import { SuporteModule } from "../suporte/suporte.module";

@Module({
    imports:[
        ClienteModule,
        SuporteModule,
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
    providers:   [
        {
            provide: APP_GUARD,
            useClass: AuthGuard
        },

        {
        provide: APP_GUARD,
        useClass: PerfilGuard
        },
  
        AuthService
    ],
    exports:     [AuthService]
})
export class AuthModule 
{
    
}