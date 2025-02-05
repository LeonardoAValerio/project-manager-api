import { BadRequestException, Injectable } from "@nestjs/common";
import { ColaboratorRepositorie } from "./colaborator.repositore";
import { CreateColaboratorDto } from "./dto/create-colaborator.dto";
import { GetColaboratorDto } from "./dto/get-colaborator.dto";
import { User } from "@prisma/client";
import { UserUpdatingDto } from "./dto/user-updating.dto";
import { PutColaboratorDto } from "./dto/put-colaborator.dto";

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

    async deleteById(id: string) {
        const colaborator = await this.colaboratorRepositorie.findById(id);

        if(!colaborator) throw new BadRequestException("Colaborator doesn't exist!");
        if(colaborator.role === "MASTER") throw new BadRequestException("This actions it's not possible to a 'MASTER'");

        await this.colaboratorRepositorie.deleteById(id);
        return { message: "Deleted Succefully!"}
    }

    async putById(id: string, attributes:PutColaboratorDto, userUpdating: UserUpdatingDto){
        const colaborator = await this.colaboratorRepositorie.findById(id);
        if(!colaborator) throw new BadRequestException("Colaborator doesn't exist!");

        const userUpdatingColaborator = await this.colaboratorRepositorie.findByIdUserAndProject(userUpdating.id, userUpdating.id_project);
        if((colaborator.role === "MASTER" && userUpdatingColaborator.role !== "MASTER")) throw new BadRequestException("This actions it's only possible to a 'MASTER'");
        if((colaborator.role === "MASTER" && attributes.role)) throw new BadRequestException("Can't change the role of the 'Master''");

        const updateColaborator = await this.colaboratorRepositorie.updateById(id, attributes);
        return updateColaborator;
    }
}