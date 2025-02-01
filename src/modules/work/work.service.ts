import { Injectable } from "@nestjs/common";
import { WorkRepositorie } from "./work.repositorie";
import { CreateWorkControllerDto } from "./dto/create-work-controller.dto";
import { Time } from "src/shared/utils/time";

@Injectable()
export class WorkService {
    constructor(
        private workRepositorie: WorkRepositorie
    ) {}

    async create(attributes: CreateWorkControllerDto) {
        const totalHoursWorked = this.calculateHoursWorked(attributes.started_at, attributes.ended_at);
        const totalValue = this.calculateTotalValue(attributes.hour_value, totalHoursWorked);

        const newWork = await this.workRepositorie.create({
            total_hours_worked: totalHoursWorked,
            total_value: totalValue,
            ...attributes
        });

        return newWork;
    }

    private calculateHoursWorked(started_at: string, ended_at: string) {
        const startedAt = new Date(started_at);
        const endedAt = new Date(ended_at);

        const timeStarted = new Time(startedAt.getMinutes(), startedAt.getHours());
        const timeEnded = new Time(endedAt.getMinutes(), endedAt.getHours());

        return timeEnded.fullTime - timeStarted.fullTime;
    }

    private calculateTotalValue(hour_value: number, hours_worked: number) {
        return hour_value * hours_worked;
    }
}