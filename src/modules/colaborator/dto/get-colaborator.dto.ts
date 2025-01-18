import { ApiProperty } from "@nestjs/swagger";

export class GetColaboratorDto {
    @ApiProperty()
    id_colaborator: string

    @ApiProperty()
    id_project: string;

    @ApiProperty()
    id_user: string;

    @ApiProperty()
    role: string;

    @ApiProperty()
    hour_value: number;    
}