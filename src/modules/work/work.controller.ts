import { Body, Controller, Post } from "@nestjs/common";
import { WorkService } from "./work.service";
import { CreateWorkControllerDto } from "./dto/create-work-controller.dto";

@Controller("work")
export class WorkController {
    constructor(
        private workService: WorkService
    ) {}


    @Post()
    async post(@Body() body: CreateWorkControllerDto) {
        const newWork = await this.workService.create(body);

        return newWork;
    }
}