import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { VerifyTokenMiddleware } from 'src/middlewares/verify-token/verify-token.middleware';
import { GetRecodeMiddleware } from 'src/middlewares/get-recode/get-recode.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/User.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(VerifyTokenMiddleware).forRoutes('users');
    // consumer.apply(VerifyTokenMiddleware).forRoutes(UsersController);
    consumer
      .apply(VerifyTokenMiddleware)
      .forRoutes(
        { path: 'users', method: RequestMethod.GET },
        { path: 'users', method: RequestMethod.POST },
        { path: 'users/:id/:postId', method: RequestMethod.GET },
      )
      .apply(GetRecodeMiddleware)
      .forRoutes('users');
  }
}
