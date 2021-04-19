import {Injectable} from '@nestjs/common';
import {InjectConnection, InjectRepository} from '@nestjs/typeorm';
import {Repository, Connection} from 'typeorm';

import {CreateDto, UpdateDto, DeleteDto} from './dto';
import {RulesEntity} from './rules.entity';

@Injectable()
export class RulesService {
    constructor(
        @InjectRepository(RulesEntity)
        private readonly rulesRepository: Repository<RulesEntity>,
        @InjectConnection()
        private readonly connection: Connection,
    ) {}

    requestAll() {
        return this.rulesRepository.find();
    }

    async create({name, rules}: CreateDto) {
        const item = new RulesEntity();
        item.name = name;
        item.rules = rules;
        await this.rulesRepository.save(item);
    }

    delete({id}: DeleteDto) {
        return this.rulesRepository.delete(id);
    }

    async update({id, rules}: UpdateDto) {
        await this.rulesRepository.update({id}, {
            rules,
        });
    }
}
