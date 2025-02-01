import { Body, Controller, Headers, Post, UseGuards } from "@nestjs/common";
import { WorkService } from "./work.service";
import { CreateWorkControllerDto } from "./dto/create-work-controller.dto";
import { ApiBearerAuth } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "../auth/roles.guard";

@Controller("work")
export class WorkController {
    constructor(
        private workService: WorkService
    ) {}


    @Post()
    @UseGuards(AuthGuard("jwt"), RolesGuard)
    @ApiBearerAuth("authorization")
    async post(@Body() body: CreateWorkControllerDto, @Headers("id_project") id_project: string) {
        const newWork = await this.workService.create(body);

        return newWork;
    }
}