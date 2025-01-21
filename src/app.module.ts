import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ProjectModule } from './modules/project/project.module';
import { ColaboratorModule } from './modules/colaborator/colaborator.module';
import { JwtModule } from './shared/utils/jwt/jwt.module';
import { AuthModule } from './shared/guards/auth.module';

@Module({
  imports: [
    UserModule,
    ProjectModule,
    ColaboratorModule,
    JwtModule,
    AuthModule
  ],
  controllers: [],
})
export class AppModule {}
