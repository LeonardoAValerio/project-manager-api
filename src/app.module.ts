import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ProjectModule } from './modules/project/project.module';
import { ColaboratorModule } from './modules/colaborator/colaborator.module';

@Module({
  imports: [
    UserModule,
    ProjectModule,
    ColaboratorModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
