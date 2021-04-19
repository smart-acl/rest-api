import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectConnection, InjectRepository} from '@nestjs/typeorm';
import isEmpty from 'lodash/isEmpty';
import {Repository, Connection} from 'typeorm';

import {PermissionsService} from 'src/permissions/permissions.service';
import {UserService} from 'src/user/user.service';

import {CreateDto, UpdateDto, DeleteDto, CheckDto} from './dto';
import {CheckPermissionException, RulesCountException} from './exceptions/check';
import {RulesEntity} from './rules.entity';
import {SELECT_RULE_BY_METHOD_PATH} from './sql';

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

        /**
         * Doesn't work with typeorm, because cannot parse <"method":> and <:method>
         * WHERE (rules @> '[{"method": :method, "path": :path}]')
         */
        const foundRules: RulesEntity[] = await this.rulesRepository
            .query(SELECT_RULE_BY_METHOD_PATH, [method, route]);

        if (foundRules.length > 1 || isEmpty(foundRules)) {
            throw new RulesCountException(route);
        }

        // Search by full route text
        const {all_of = [], one_of = []} = foundRules[0].rules
            .find(({path, method: ruleMethod}) => path === route && ruleMethod === method)
            .permissions;
        const permissions = await this.permissionsService.requestAllByUser(user);

        const hasAllRequired = !isEmpty(all_of)
            ? all_of.every(
                permission => permissions.find(({permission: {name}}) => name === permission),
            )
            : true;
        if (!hasAllRequired) {
            throw new CheckPermissionException(route, method);
        }

        const hasOneOf = !isEmpty(one_of)
            ? one_of.some(
                permission => permissions.find(({permission: {name}}) => name === permission),
            )
            : true;
        if (!hasOneOf) {
            throw new CheckPermissionException(route, method);
        }
    }
}
