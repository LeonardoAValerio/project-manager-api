import { ApiProperty } from "@nestjs/swagger"

export class GetProjectDto {
    @ApiProperty()
    id: string
    
    @ApiProperty()
    name: string

    @ApiProperty()
    description: string;
}