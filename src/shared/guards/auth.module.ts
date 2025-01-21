import { Module, Global } from '@nestjs/common';
import { AuthUserGuard } from './auth-user.guard';

@Global()
@Module({
  providers: [AuthUserGuard],
  exports: [AuthUserGuard], 
})
export class AuthModule {}