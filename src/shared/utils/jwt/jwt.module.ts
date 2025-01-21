import { Module, Global } from '@nestjs/common';
import { JwtService } from './jwt.service';

@Global() // Marca o módulo como global
@Module({
  providers: [JwtService],
  exports: [JwtService], // Exporta o JwtService para todo o projeto
})
export class JwtModule {}