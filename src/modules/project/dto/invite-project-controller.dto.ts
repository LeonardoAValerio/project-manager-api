import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class InviteProjectControllerDto {
    @ApiProperty()
    @IsEmail()
    emailToInvite: string
}