import { ApiProperty } from "@nestjs/swagger";
import { ColaboratorRoles } from "@prisma/client";
import { IsEnum, IsNumber, IsUUID } from "class-validator";

export class CreateColaboratorDto {
    @ApiProperty()
    @IsUUID()
    id_project: string;

    @ApiProperty()
    @IsUUID()
    id_user: string;

    @ApiProperty()
    @IsEnum(ColaboratorRoles)
    role: ColaboratorRoles;

    @ApiProperty()
    @IsNumber()
    hour_value?: number;
}