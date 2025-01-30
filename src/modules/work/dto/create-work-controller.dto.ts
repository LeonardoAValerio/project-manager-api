import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsString, MinDate } from "class-validator";

export class CreateWorkControllerDto {
    @ApiProperty()
    @IsString()
    id_colaborator: string

    @ApiProperty()
    @IsString()
    description: string

    @ApiProperty()
    @IsNumber()
    hour_value: number

    @ApiProperty()
    @IsDateString()
    started_at: string

    @ApiProperty()
    @IsDateString()
    ended_at: string
}