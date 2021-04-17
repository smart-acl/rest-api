import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';
import {TypeOrmModule} from '@nestjs/typeorm';
import {config} from 'dotenv';
import {Indexed} from 'utils';

import {AuthMiddleware} from './auth.middleware';
import {JwtStrategy} from './strategies/jwt.strategy';
import {LocalStrategy} from './strategies/local.strategy';
import {UserController} from './user.controller';
import {UserEntity} from './user.entity';
import {UserService} from './user.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        PassportModule,
        JwtModule.register({
            secret: (function () {
                return (config({path: `.${process.env.NODE_ENV}.env`}).parsed as Indexed).JWT_SECRET;
            })(),
            signOptions: {
                expiresIn: '0.5y',
            },
        }),
    ],
    providers: [UserService, LocalStrategy, JwtStrategy],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule implements NestModule {
    public configure(consumer: MiddlewareConsumer): void {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(
                {path: 'user/:email', method: RequestMethod.GET},
                {path: 'me', method: RequestMethod.GET},
            );
    }
}
