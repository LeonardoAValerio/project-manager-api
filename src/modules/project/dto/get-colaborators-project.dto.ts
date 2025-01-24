import { ApiProperty } from "@nestjs/swagger";

export class GetColaboratorProjectDto {
    @ApiProperty()
    id_colaborator: string

    @ApiProperty()
    id_user: string

    @ApiProperty()
    name: string

    @ApiProperty()
    role: string;
}