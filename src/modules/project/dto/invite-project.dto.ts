import { GetUserDto } from "src/modules/user/dto/get-user.dto"

export class InviteProjectDto {
    userInviting: GetUserDto
    emailToInvite: string
    idProject: string
}