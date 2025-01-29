import { BadRequestException, Injectable } from "@nestjs/common";
import { ColaboratorRepositorie } from "./colaborator.repositore";
import { CreateColaboratorDto } from "./dto/create-colaborator.dto";
import { GetColaboratorDto } from "./dto/get-colaborator.dto";

@Injectable()
export class ColaboratorService {
    constructor(
        private readonly colaboratorRepositorie: ColaboratorRepositorie,
    ) {}

    async create(attributes: CreateColaboratorDto): Promise<GetColaboratorDto> {
        const newColaborator = await this.colaboratorRepositorie.create(attributes);
        return newColaborator;
    }

    async findAll(): Promise<GetColaboratorDto[]> {
        const colaborators = await this.colaboratorRepositorie.findAll();
        return colaborators;
    }

    async findAllByProject(id_project: string) {
        const colaborators = await this.colaboratorRepositorie.findFiltered({id_project});

        return colaborators;
    }
}