import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsUUID } from "class-validator";
import { Roles } from "src/shared/utils/types/roles.type";

export class CreateColaboratorDto {
    @ApiProperty()
    @IsUUID()
    id_project: string;

    @ApiProperty()
    @IsUUID()
    id_user: string;

    @ApiProperty()
    @IsEnum(Roles)
    role: Roles;

    @ApiProperty()
    @IsNumber()
    hour_value?: number;
}