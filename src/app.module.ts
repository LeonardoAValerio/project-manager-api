import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ProjectModule } from './modules/project/project.module';
import { ColaboratorModule } from './modules/colaborator/colaborator.module';
import { AuthModule } from './modules/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { InvitationModule } from './modules/invitation/invitation.module';

@Module({
  imports: [
    PassportModule,
    UserModule,
    ProjectModule,
    ColaboratorModule,
    InvitationModule,
    AuthModule
  ],
  controllers: [],
})
export class AppModule {}
