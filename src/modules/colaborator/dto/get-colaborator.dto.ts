import { ApiProperty } from "@nestjs/swagger";
import { ColaboratorRoles } from "@prisma/client";

export class GetColaboratorDto {
    @ApiProperty()
    id_colaborator: string

    @ApiProperty()
    id_project: string;

    @ApiProperty()
    id_user: string;

    @ApiProperty()
    role: ColaboratorRoles;

    @ApiProperty()
    hour_value: number;    
}