import { Reflector } from '@nestjs/core';
import { ColaboratorRoles } from '@prisma/client';

export const Roles = Reflector.createDecorator<ColaboratorRoles[]>();