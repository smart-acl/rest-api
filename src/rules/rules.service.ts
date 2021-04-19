import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectConnection, InjectRepository} from '@nestjs/typeorm';
import {Repository, Connection, getConnection, EntityManager} from 'typeorm';

import {CreateDto, UpdateDto, DeleteDto, CheckDto} from './dto';
import {RulesEntity} from './rules.entity';
import {PermissionsService} from "src/permissions/permissions.service";
import {UserService} from "src/user/user.service";
import { RulesCountException } from './exceptions/check';


async function rawQuery<T = any[]>(query: string, parameters: object = {}, manager?: EntityManager): Promise<T> {
    const conn = manager ? manager.connection : getConnection();
    const [ escapedQuery, escapedParams ] = conn.driver.escapeQueryWithParameters(query, parameters, {});
    return conn.query(escapedQuery, escapedParams);
}

@Injectable()
export class RulesService {
    constructor(
        @InjectRepository(RulesEntity)
        private readonly rulesRepository: Repository<RulesEntity>,
        private readonly permissionsService: PermissionsService,
        private readonly userService: UserService,
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

    async check({userLogin, route, method}: CheckDto) {
        const user = await this.userService.findByLogin(userLogin);
        if (!user) {
            throw new NotFoundException('user not found');
        }

        console.log(user, 'here');
        // const rules = await this.connection.manager
        //     .query(
        //         'SELECT * FROM "rules" WHERE (rules @> \'[{"method": $1, "path": $2}]\')', [`"${method}"`, `"${route}"`]
        //     );
        const rules = await rawQuery(
            'SELECT * FROM "rules" WHERE (rules @> \'[{"method": :method, "path": :route}]\')', {method, route}
        )
        console.log(rules);

        // if (rules.length > 1) {
        //     throw new RulesCountException(route);
        // }

        await this.permissionsService.requestAllByUser(user);
    }
}
