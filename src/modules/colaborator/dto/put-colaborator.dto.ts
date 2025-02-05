import { ApiProperty } from "@nestjs/swagger";
import { ColaboratorRoles } from "@prisma/client";
import { IsEmpty, IsEnum, IsNumber, IsOptional, IsUUID } from "class-validator";

const ColaboratorRolesWithoutAdmin = {
    ADMIN: ColaboratorRoles.ADMIN,
    USER: ColaboratorRoles.USER
}

export class PutColaboratorDto {
    @ApiProperty({enum: Object.values(ColaboratorRolesWithoutAdmin)})
    @IsOptional()
    @IsEnum(ColaboratorRolesWithoutAdmin)
    role?: ColaboratorRoles;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    hour_value?: number;
}